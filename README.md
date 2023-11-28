<!! SHFY !!>

#Build and publish ordercloud client SDK npm package

npm install

-- Bump build version in package.json

npm run build
npm pack

-- .npmrc file must point to ours artifacts repository

npm publish

#in frontend project:
npm update ordercloud-javascript-sdk-fixed




<!-- omit in toc -->
# OrderCloud

The OrderCloud SDK for Javascript is a modern client library for building solutions targeting the [Ordercloud eCommerce API](https://ordercloud.io/learn/ordercloud-basics/architecture). The SDK aims to greatly improve developer productivity and reduce errors.

- [✨ Features](#-features)
- [Requirements](#requirements)
- [⚙️ Installation](#️-installation)
- [➕ Adding it to your project](#-adding-it-to-your-project)
  - [Using named imports](#using-named-imports)
  - [Using wildcard import](#using-wildcard-import)
  - [Using require](#using-require)
- [🔐 Authentication](#-authentication)
- [🔍 Filtering](#-filtering)
- [👬 Impersonation](#-impersonation)
- [Configuration](#configuration)
- [Handling Errors 🐛](#handling-errors-)
- [Interceptors](#interceptors)
- [Cancelling Requests](#cancelling-requests)
- [Async/Await](#asyncawait)
- [Typescript Support](#typescript-support)
  - [Understanding OrderCloud's models](#understanding-orderclouds-models)
  - [Strongly Typed xp](#strongly-typed-xp)
  - [Typescript utilities](#typescript-utilities)
- [📄 License](#-license)
- [🤝 Contributing](#-contributing)
- [🆘 Getting Help](#-getting-help)

## ✨ Features

- Works both on the **browser** and **node.js**
- ESM module available for bundlers that support it. This enables tree shaking - use only what you import.
- Built-in Typescript support, no additional types package necessary
- Full feature parity with API
- Auto-generated [API reference](https://ordercloud-api.github.io/ordercloud-javascript-sdk)

> Coming from an older version? Check out the [migration guide](./MIGRATION_GUIDE.md) so you can upgrade to the latest and greatest.

## Requirements

[Axios](https://www.npmjs.com/package/axios) is a peer dependency of the OrderCloudSDK.

> Note: Peer dependencies are not installed automatically. They must be installed separately.

Why isn't axios a dependency of OrderCloud SDK? Since axios is a fairly popular http library and may already exist as a dependency in your project it is considered best practice to have it defined as a peer dependency. This way, there isn't a potential for two versions of axios to be installed which could result in weird bugs, not to mention a bloated javascript bundle.

## ⚙️ Installation

with npm:

```shell
npm install ordercloud-javascript-sdk --save
```

or

with yarn:

```shell
yarn add ordercloud-javascript-sdk
```

## ➕ Adding it to your project

### Using named imports

This is the preferred method of importing the sdk for browser projects as it allows modern bundlers like webpack to tree shake the parts of the SDK that you aren't using, making your project more lean.

```javascript
import { Products } from 'ordercloud-javascript-sdk';
```

### Using wildcard import

```javascript
import * as OrderCloudSDK from 'ordercloud-javascript-sdk';
```

### Using require

```javascript
const OrderCloudSDK = require('ordercloud-javascript-sdk');
```

## 🔐 Authentication

We'll need to get a token before we can make any API calls. The SDK offers five different ways of getting a token as part of the [Auth Resource](https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/Resources.Auth.html).

We'll use the login method for this example.

```javascript
import { Auth, Tokens } from 'ordercloud-javascript-sdk';

const username = 'YOUR_USERNAME'; //username of the user logging in
const password = 'YOUR_PASSWORD'; //password of the user logging in
const clientID = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'; //clientID of the application the user is logging in to ([sign up for free](https://portal.ordercloud.io/register)
const scope = ['FullAccess']; //string array of [roles](https://ordercloud.io/knowledge-base/security-profiles) the application has access to

Auth.Login(username, password, clientID, scope)
  .then(response => {
      //store token, now any subsequent calls will automatically set this token in the headers for you
      const token = response.access_token;
      Tokens.SetAccessToken(token)
  })
  .catch(err => console.log(err));
```

## 🔍 Filtering

All of the [filtering options](https://ordercloud.io/knowledge-base/advanced-querying#filtering)  you love from the API are available through the SDK as well. Simply build an object that matches the model of the item you're filtering on where the `value` is the value you'd like to filter on.

Let's run through a couple scenarios and what the call will look like with the SDK:

My products where `xp.Featured` is `true`

```javascript
Me.ListProducts({ filters: { 'xp.Featured': true } })
  .then(productList => console.log(productList));
```

My orders submitted after April 20th, 2018

```javascript
Me.ListOrders({ filters: { DateSubmitted: '>2020-04-20' } })
  .then(orderList => console.log(orderList))
```

Users with the last name starting with Smith:

```javascript
Users.List('my-mock-buyerid', { filters: { LastName: 'Smith*' } })
  .then(userList => console.log(userList));
```

Users with the last name starting with Smith *or* users with the last name *ending* with Jones

```javascript
Users.List('my-mock-buyerid', { filters: { LastName: 'Smith*|*Jones' } })
  .then(userList => console.log(userList));
```

Products where xp.Color is not red *and* not blue

```javascript
Products.List({ filters: { 'xp.Color': ['!red', '!blue'] } })
    .then(productList => console.log(productList));
```

And of course you can mix and match filters to your heart's content.

## 👬 Impersonation

Impersonation allows a seller user to make an API call on behalf of another user. The SDK enables this in two ways, each tackling different use cases.

The first method we'll talk about is best suited when you need to toggle between just two users during a session. You'll simply get an impersonation token, set it and then use the `As()` method available on every service to flag the SDK that you want to use the the stored token for that call.

```javascript
import { Tokens, Me } from 'ordercloud-javascript-sdk';

// set regular token
const myToken = 'YOUR_TOKEN';
Tokens.SetAccessToken(myToken);

// set impersonation token
const myImpersonationToken = 'YOUR_IMPERSONATED_TOKEN'
Tokens.SetImpersonationToken(myImpersonationToken);

// Get products for regular user
Me.ListProducts()
  .then(productList => console.log(productList))

// Get products for the impersonated user
Me.As().ListProducts()
  .then(impersonatedProductList => console.log(impersonatedProductList))
```

As you can see this method makes it very easy to toggle between impersonated calls and non-impersonated calls. But what if you have more than two tokens to toggle between? To address that scenario we recommend using the optional `requestOptions.accessToken` parameter. `requestOptions` is available as the last parameter on all sdk methods.

```javascript
import { Me } from 'ordercloud-javascript-sdk';

var token1 = 'USER1_TOKEN';
var token2 = 'USER2_TOKEN';
var token3 = 'USER3_TOKEN';

// Get products for user 1
Me.ListProducts(null, { accessToken: token1 })
  .then(user1ProductList => console.log(user1ProductList))

// Get products for user 2
Me.ListProducts(null, { accessToken: token2 })
  .then(user2ProductList => console.log(user2ProductList))

// Get products for user 3
Me.ListProducts(null, { accessToken: token3 })
  .then(user3ProductList => console.log(user3ProductList))
```

## Configuration

The [`Configuration`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/Resources.Configuration.html) service can be used to set sdk level [options](https://ordercloud-api.github.io/ordercloud-javascript-sdk/interfaces/sdkconfiguration).

Simply set the options you need to override and the SDK will merge it with the default options object.

```javascript
import { Configuration } from 'ordercloud-javascript-sdk';

Configuration.Set({
  baseApiUrl: 'https://sandboxapi.ordercloud.io',
  timeoutInMilliseconds: 20 * 1000
})
```

Similarly, you can see what the current options are by using the getter.

```javascript
import { Configuration } from 'ordercloud-javascript-sdk';

const configuration = Configuration.Get();
console.log(configuration); // the current sdk configuration
```

## Handling Errors 🐛

The SDK uses a custom error ([`OrderCloudError`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror)) to provide rich and useful information in the case of an error.

```javascript
Products.Get('my-product')
  .catch(error => {
    if(error.isOrderCloudError) {
      // the request was made and the API responded with a status code
      // that falls outside of the range of 2xx, the error will be of type OrderCloudError
      // https://ordercloud-api.github.io/ordercloud-javascript-sdk/classes/orderclouderror
      console.log(error.message);
      console.log(JSON.stringify(error.errors, null, 4));
    } else if (error.request) {
      // the request was made but no response received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }
  })
```

## Interceptors

You can use [axios interceptors](https://github.com/axios/axios#interceptors) to intercept a request before it goes out to the API or to intercept a response before it gets handled by the SDK. This enables you to log, rewrite, or even retry calls.

The SDK does not use a custom axios instance, so you can set up your interceptors right off of axios.

```javascript
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

## Cancelling Requests

In addition to `requestOptions.accessToken` the sdk provides `requestOptions.cancelToken` which enables [axios request cancellation](https://github.com/axios/axios#cancellation). This option is useful for cleaning up outstanding requests when changes in your user experience no longer require the data requested. For instance, you could use the cancel token to clean up outstanding requests [when your react component unmounts](https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup).

```javascript
import axios from 'axios';
import { Products } from 'ordercloud-javascript-sdk';

const signal = axios.CancelToken.source();

Products.List({search: 'Tennis balls'}, {cancelToken: signal.token})
  .catch(ex => {
    if (axios.isCancel(ex)) {
      console.log(ex) // 'This request was cancelled!'
    } else {
      console.log(ex) // Normal ordercloud exception
    }
  })

// Oops! I don't want to resolve this request anymore
signal.cancel('This request was cancelled!')
```

## Async/Await
Async/Await is a special syntax to work with promises in a more comfortable fashion. Because the SDK is built with promises the syntax works right out of the box - simply add the `async` keyword to your outer function method.

```javascript
// with normal promises
(() => {
  Auth.Login('myusername', 'mypassword', 'myclientID', ['FullAccess'])
    .then(authResponse => {
      Tokens.SetAccessToken(authResponse.access_token)
      Me.ListOrders().then(orderList => {
        const firstOrder = orderList.Items[0]
        console.log(firstOrder.Total)
      })
    })
    .catch(err => {
      console.log(err)
    })
})()
```

```javascript
// with async/await
(async () => {
  try {
    const authResponse = await Auth.Login('myusername', 'mypassword', 'myclientID', ['FullAccess'])
    Tokens.SetAccessToken(authResponse.access_token)
    const myOrders = await Me.ListOrders()
    const firstOrder = myOrders.Items[0]
  } catch (err) {
    console.error(err)
  }
})()
```

> NOTE: async/await is part of ECMAScript 2017 and is not supported in Internet Explorer and older browsers without first transpiling to ES5 so use with caution.

## Typescript Support

While Typescript is not required to use this project (we compile it down to ES5 javascript for you), it does mean there are some added benefits for our Typescript users. You will need a minimum of typescript version 3.5 for all features to work correctly.

### Understanding OrderCloud's models

By default, properties of ordercloud models are required if their Create or Save operation requires them. For example the [`LineItem` model](https://ordercloud-api.github.io/ordercloud-javascript-sdk/interfaces/lineitem) has the properties `ProductID` and `Quantity` required. This is important to know if you need to define an object by type before using it.

```typescript
import { LineItems, LineItem } from 'ordercloud-javascript-sdk';

const lineItem: LineItem = {
  ProductID: 'my-awesome-product', // if this field is missing you get a type error!
  Quantity: 2 // if this field is missing you get a type error!
}
LineItems.Create('Outgoing', 'my-order-id', lineItem)
```

This works as expected and ensures a create or save always has the correct required parameters. However, if for example you need to perform a Patch operation (partial update), then you want all of the fields to be optional. To accomplish this you should use Typescript's built-in utility type [`Partial<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialt)

```typescript
import { LineItems, LineItem } from 'ordercloud-javascript-sdk';

const lineItem: Partial<LineItem> = {
  // no type errors even though Quantity and ProductID are missing
  ShippingAddressID: 'my-shipping-address-id'
}
LineItems.Patch('Outgoing', 'my-order-id', 'my-lineitem-id', lineItem)
```

### Strongly Typed xp

Extended properties, or xp, is a [platform feature](https://ordercloud.io/knowledge-base/extended-properties) that allows you to extend the OrderCloud data model. This is modeled in the SDK using (by default) a Typescript [`any`](https://www.typescriptlang.org/docs/handbook/basic-types.html#any) type:

```typescript
const category: Category = {};
category.xp.Featured = true;
```

Even though `Featured` does not exist on the native model, the above code will compile and work just fine with the API. But you don't get any compile-time type-checking.

Alternatively, the SDK provides generic versions of all models that allow you to provide a custom xp type:

```typescript
interface MyCategoryXp {
  Featured?: boolean;
}

const category: Category<MyCategoryXp> = {};
category.xp.Featured = true; // strongly typed!
```

These custom models can then be used when calling any method in the SDK

```typescript
Categories.List<Category<MyCategoryXp>>('mock-catalog-id')
  .then(categoryList => {
    const firstCategory = categoryList.Items[0];
    const isFeatured = firstCategory.xp.Featured; // strongly typed!
  })
```

A common alternative to the above example is to first define a custom interface that extends `Category<MyCategoryXp>`

```typescript
interface MyCategoryXp {
  Featured?: boolean;
}

interface MyCategory extends Category<MyCategoryXp> {

}

Categories.List<MyCategory>('mock-catalog-id')
  .then(categoryList => {
    const firstCategory = categoryList.Items[0];
    const isFeatured = firstCategory.xp.Featured; // strongly typed!
  })
```

This is nicer and especially preferable for models like `Order` which have many nested models each with their own `xp` fields that must be defined at the top level. For example: `Order<OrderXp, FromUserXp, BillingAddressXp>`. Declaring those 3 xp types once on a custom `MyOrder` interface is far cleaner than declaring them on every call to `Orders.Get` or `Orders.List`.

### Typescript utilities

The sdk ships with various helpers and utilities that you may find useful. We also recommend using [Typescript's built-in utilities](https://www.typescriptlang.org/docs/handbook/utility-types.html) when possible.

| Utility                                                                                                               | Description                                                                                                                                                                                                                          |
|-----------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [`ListPage<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/interfaces/listpage)                       | Takes in a type for the item in the list. For example `ListPage<Order>` will be the type for an order list page.                                                                                                                     |
| [`ListPageWithFacets<T>`]( https://ordercloud-api.github.io/ordercloud-javascript-sdk/interfaces/listpagewithfacets ) | Similar to `ListPage` but for [premium search](https://ordercloud.io/knowledge-base/introducing-premium-search) models. For example `ListPageWithFacets<Product>` will be the type for a product list page.                          |
| [`Searchable<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/Searchable.html)                              | Takes in a [`SearchableEndpoint`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/Searchable.html) and returns the type for a valid `searchOn` field on list calls. For example `Searchable<'Orders.List'>`.           |
| [`Sortable<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/Sortable.html)                                  | Takes in a [`SortableEndpoint`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/Resources.SortableEndpoint.html) and returns the type for a valid `sortBy` field on list calls. For example `Sortable<'Orders.List'>`.                   |
| [`Filters<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/Filters.html)                                    | Takes in an ordercloud model and returns the type for a valid `filter` field on list calls. For example `Filters<Product>`. This also works for any custom models that extend an OrderCloud model, for example `Filters<MyProduct>`. |
| [`PartialDeep<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/PartialDeep.html)                            | Similar to Typescript's [`Partial<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#partialt) except works on nested properties as well.                                                                          |
| [`RequiredDeep<T>`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/RequiredDeep.html)                        | Similar to Typescript's [`Required<T>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#requiredt) except works on nested properties as well.                                                                        |
| [`DecodedToken`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/interfaces/decodedtoken)                  | A type representing a decoded OrderCloud token                                                                                                                                                                                       |                                                                                                                                                                         |
| [`MessageSenderPayloads`](https://ordercloud-api.github.io/ordercloud-javascript-sdk/types/MessageSenderPayloads.html)           | Takes in a type argument for the message type and resolves to the type for the message sender payload                                                                                                                                |
## 📄 License

OrderCloud's Javascript SDK is an open-sourced software licensed under the [MIT license](./LICENSE).

## 🤝 Contributing

Check out our [Contributing](./CONTRIBUTING.md) guide.

## 🆘 Getting Help

If you're new to OrderCloud, exploring the [documentation](https://ordercloud.io/) is recommended, especially the [Welcome to OrderCloud tutorial](https://ordercloud.io/learn/getting-started/welcome-to-ordercloud).

For programming questions, please [ask](https://stackoverflow.com/questions/ask?tags=ordercloud) on Stack Overflow.

To report a bug or request a feature specific to the SDK, please open an [issue](https://github.com/ordercloud-api/ordercloud-javascript-sdk/issues/new).
