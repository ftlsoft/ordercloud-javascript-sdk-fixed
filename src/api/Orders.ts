import { ListPage } from '../models/ListPage';
import { Order } from '../models/Order';
import { OrderDirection } from '../models/OrderDirection';
import { OrderApproval } from '../models/OrderApproval';
import { OrderApprovalInfo } from '../models/OrderApprovalInfo';
import { Address } from '../models/Address';
import { User } from '../models/User';
import { OrderSplitResult } from '../models/OrderSplitResult';
import { OrderPromotion } from '../models/OrderPromotion';
import { Shipment } from '../models/Shipment';
import { PartialDeep } from '../models/PartialDeep';
import { RequiredDeep } from '../models/RequiredDeep';
import { Filters } from '../models/Filters';
import { RequestOptions } from '../models/RequestOptions';
import httpClient from '../utils/HttpClient';
import OrderCloudError from '../utils/OrderCloudError';

class Orders {
    private impersonating:boolean = false;

    /**
    * @ignore
    * not part of public api, don't include in generated docs
    */
    constructor() {
        this.List = this.List.bind(this);
        this.Create = this.Create.bind(this);
        this.Get = this.Get.bind(this);
        this.Save = this.Save.bind(this);
        this.Delete = this.Delete.bind(this);
        this.Patch = this.Patch.bind(this);
        this.ListApprovals = this.ListApprovals.bind(this);
        this.Approve = this.Approve.bind(this);
        this.SetBillingAddress = this.SetBillingAddress.bind(this);
        this.PatchBillingAddress = this.PatchBillingAddress.bind(this);
        this.Cancel = this.Cancel.bind(this);
        this.Complete = this.Complete.bind(this);
        this.Decline = this.Decline.bind(this);
        this.ListEligibleApprovers = this.ListEligibleApprovers.bind(this);
        this.Forward = this.Forward.bind(this);
        this.PatchFromUser = this.PatchFromUser.bind(this);
        this.ListPromotions = this.ListPromotions.bind(this);
        this.AddPromotion = this.AddPromotion.bind(this);
        this.RemovePromotion = this.RemovePromotion.bind(this);
        this.Ship = this.Ship.bind(this);
        this.ListShipments = this.ListShipments.bind(this);
        this.SetShippingAddress = this.SetShippingAddress.bind(this);
        this.PatchShippingAddress = this.PatchShippingAddress.bind(this);
        this.Split = this.Split.bind(this);
        this.Submit = this.Submit.bind(this);
        this.Validate = this.Validate.bind(this);
    }

   /**
    * Get a list of orders. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/list|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param listOptions.buyerID ID of the buyer.
    * @param listOptions.supplierID ID of the supplier.
    * @param listOptions.from Lower bound of date range that the order was created.
    * @param listOptions.to Upper bound of date range that the order was created.
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async List<TOrder extends Order>(direction: OrderDirection,  listOptions: { buyerID?: string, supplierID?: string, from?: string, to?: string, search?: string, searchOn?: ('ID' | 'FromCompanyID' | 'ToCompanyID' | 'Comments')[], sortBy?: ('DateSubmitted' | 'DateCreated' | 'ID' | 'FromUser' | 'FromCompanyID' | 'ToCompanyID' | 'FromUserID' | 'Status' | 'DateApproved' | 'DateDeclined' | 'DateCanceled' | 'DateCompleted' | 'Subtotal' | 'ShippingCost' | 'TaxCost' | 'PromotionDiscount' | 'Total' | 'IsSubmitted' | '!DateSubmitted' | '!DateCreated' | '!ID' | '!FromUser' | '!FromCompanyID' | '!ToCompanyID' | '!FromUserID' | '!Status' | '!DateApproved' | '!DateDeclined' | '!DateCanceled' | '!DateCompleted' | '!Subtotal' | '!ShippingCost' | '!TaxCost' | '!PromotionDiscount' | '!Total' | '!IsSubmitted')[], page?: number, pageSize?: number, filters?: Filters<Required<TOrder>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TOrder>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}`, { ...requestOptions, impersonating, params: { ...listOptions,  filters: listOptions.filters,  } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Create a new order. If ID is provided and an object with that ID already exists, a 409 (conflict) error is returned.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/create|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param order 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Create<TOrder extends Order>(direction: OrderDirection, order: Order, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}`, order, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Get a single order. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/get|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Get<TOrder extends Order>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}/${orderID}`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Create or update an order. If an object with the same ID already exists, it will be overwritten.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/save|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param order 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Save<TOrder extends Order>(direction: OrderDirection, orderID: string, order: Order, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.put(`/orders/${direction}/${orderID}`, order, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Delete an order. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/delete|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Delete(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<void> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.delete(`/orders/${direction}/${orderID}`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Partially update an order. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/patch|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param order 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Patch<TOrder extends Order>(direction: OrderDirection, orderID: string, order: PartialDeep<Order>,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/orders/${direction}/${orderID}`, order, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Get a list of order approvals. Returns all Approvals associated with the Order.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/list-approvals|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async ListApprovals<TOrderApproval extends OrderApproval>(direction: OrderDirection, orderID: string,  listOptions: { search?: string, searchOn?: ('ID' | 'FromCompanyID' | 'ToCompanyID' | 'Comments')[], sortBy?: ('DateSubmitted' | 'DateCreated' | 'ID' | 'FromUser' | 'FromCompanyID' | 'ToCompanyID' | 'FromUserID' | 'Status' | 'DateApproved' | 'DateDeclined' | 'DateCanceled' | 'DateCompleted' | 'Subtotal' | 'ShippingCost' | 'TaxCost' | 'PromotionDiscount' | 'Total' | 'IsSubmitted' | '!DateSubmitted' | '!DateCreated' | '!ID' | '!FromUser' | '!FromCompanyID' | '!ToCompanyID' | '!FromUserID' | '!Status' | '!DateApproved' | '!DateDeclined' | '!DateCanceled' | '!DateCompleted' | '!Subtotal' | '!ShippingCost' | '!TaxCost' | '!PromotionDiscount' | '!Total' | '!IsSubmitted')[], page?: number, pageSize?: number, filters?: Filters<Required<TOrderApproval>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TOrderApproval>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}/${orderID}/approvals`, { ...requestOptions, impersonating, params: { ...listOptions,  filters: listOptions.filters,  } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Approve an order approve. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/approve|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param orderApprovalInfo 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Approve<TOrder extends Order>(direction: OrderDirection, orderID: string, orderApprovalInfo: OrderApprovalInfo, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/approve`, orderApprovalInfo, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Set a billing address. Use only when the address is not to be saved/reused.<br/></br>To use a saved address (i.e. from the Addresses resource), PATCH the order's BillingAddressID property instead.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/set-billing-address|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param address Required fields: Street1, City, State, Zip, Country
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async SetBillingAddress<TOrder extends Order>(direction: OrderDirection, orderID: string, address: Address, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.put(`/orders/${direction}/${orderID}/billto`, address, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Partially update an order billing address. Not allowed on unsubmitted orders where BillingAddressID has been set. In that case, use the Addresses resource to update the saved address.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/patch-billing-address|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param address 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async PatchBillingAddress<TOrder extends Order>(direction: OrderDirection, orderID: string, address: Address, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/orders/${direction}/${orderID}/billto`, address, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Cancel an order cancel. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/cancel|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Cancel<TOrder extends Order>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/cancel`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Complete an order Use only when an order doesn't need a shipment. You will not be able to ship or reopen an order after completing it.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/complete|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Complete<TOrder extends Order>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/complete`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Decline an order decline. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/decline|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param orderApprovalInfo 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Decline<TOrder extends Order>(direction: OrderDirection, orderID: string, orderApprovalInfo: OrderApprovalInfo, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/decline`, orderApprovalInfo, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Get a list of order eligible approvers. Returns all Users who can approve or decline this order (but have not done so).
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/list-eligible-approvers|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async ListEligibleApprovers<TUser extends User>(direction: OrderDirection, orderID: string,  listOptions: { search?: string, searchOn?: ('ID' | 'FromCompanyID' | 'ToCompanyID' | 'Comments')[], sortBy?: ('DateSubmitted' | 'DateCreated' | 'ID' | 'FromUser' | 'FromCompanyID' | 'ToCompanyID' | 'FromUserID' | 'Status' | 'DateApproved' | 'DateDeclined' | 'DateCanceled' | 'DateCompleted' | 'Subtotal' | 'ShippingCost' | 'TaxCost' | 'PromotionDiscount' | 'Total' | 'IsSubmitted' | '!DateSubmitted' | '!DateCreated' | '!ID' | '!FromUser' | '!FromCompanyID' | '!ToCompanyID' | '!FromUserID' | '!Status' | '!DateApproved' | '!DateDeclined' | '!DateCanceled' | '!DateCompleted' | '!Subtotal' | '!ShippingCost' | '!TaxCost' | '!PromotionDiscount' | '!Total' | '!IsSubmitted')[], page?: number, pageSize?: number, filters?: Filters<Required<TUser>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TUser>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}/${orderID}/eligibleapprovers`, { ...requestOptions, impersonating, params: { ...listOptions,  filters: listOptions.filters,  } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Forward an order forward. Creates and submits 0 or more outgoing Orders to Suppliers, one for each unique Product.DefaultSupplierID on this Order.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/forward|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Forward<TOrderSplitResult extends OrderSplitResult>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrderSplitResult>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/forward`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Override order creator details. Only FirstName, LastName, and Email can be updated.<br/></br>Primarily used to facilitate guest checkout scenarios.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/patch-from-user|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param user 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async PatchFromUser<TOrder extends Order>(direction: OrderDirection, orderID: string, user: User, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/orders/${direction}/${orderID}/fromuser`, user, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Get a list of order promotions. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/list-promotions|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async ListPromotions<TOrderPromotion extends OrderPromotion>(direction: OrderDirection, orderID: string,  listOptions: { search?: string, searchOn?: ('ID' | 'FromCompanyID' | 'ToCompanyID' | 'Comments')[], sortBy?: ('DateSubmitted' | 'DateCreated' | 'ID' | 'FromUser' | 'FromCompanyID' | 'ToCompanyID' | 'FromUserID' | 'Status' | 'DateApproved' | 'DateDeclined' | 'DateCanceled' | 'DateCompleted' | 'Subtotal' | 'ShippingCost' | 'TaxCost' | 'PromotionDiscount' | 'Total' | 'IsSubmitted' | '!DateSubmitted' | '!DateCreated' | '!ID' | '!FromUser' | '!FromCompanyID' | '!ToCompanyID' | '!FromUserID' | '!Status' | '!DateApproved' | '!DateDeclined' | '!DateCanceled' | '!DateCompleted' | '!Subtotal' | '!ShippingCost' | '!TaxCost' | '!PromotionDiscount' | '!Total' | '!IsSubmitted')[], page?: number, pageSize?: number, filters?: Filters<Required<TOrderPromotion>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TOrderPromotion>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}/${orderID}/promotions`, { ...requestOptions, impersonating, params: { ...listOptions,  filters: listOptions.filters,  } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Add a promotion to an order 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/add-promotion|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param promoCode Promo code of the order promotion.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async AddPromotion<TOrderPromotion extends OrderPromotion>(direction: OrderDirection, orderID: string, promoCode: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrderPromotion>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/promotions/${promoCode}`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Remove a promotion from an order 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/remove-promotion|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param promoCode Promo code of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async RemovePromotion<TOrder extends Order>(direction: OrderDirection, orderID: string, promoCode: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.delete(`/orders/${direction}/${orderID}/promotions/${promoCode}`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Create a new shipment containing all items on an order. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/ship|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param shipment 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Ship<TOrder extends Order>(direction: OrderDirection, orderID: string, shipment: Shipment, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/ship`, shipment, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * List shipments for an order 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/list-shipments|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async ListShipments<TShipment extends Shipment>(direction: OrderDirection, orderID: string,  listOptions: { search?: string, searchOn?: ('ID' | 'FromCompanyID' | 'ToCompanyID' | 'Comments')[], sortBy?: ('DateSubmitted' | 'DateCreated' | 'ID' | 'FromUser' | 'FromCompanyID' | 'ToCompanyID' | 'FromUserID' | 'Status' | 'DateApproved' | 'DateDeclined' | 'DateCanceled' | 'DateCompleted' | 'Subtotal' | 'ShippingCost' | 'TaxCost' | 'PromotionDiscount' | 'Total' | 'IsSubmitted' | '!DateSubmitted' | '!DateCreated' | '!ID' | '!FromUser' | '!FromCompanyID' | '!ToCompanyID' | '!FromUserID' | '!Status' | '!DateApproved' | '!DateDeclined' | '!DateCanceled' | '!DateCompleted' | '!Subtotal' | '!ShippingCost' | '!TaxCost' | '!PromotionDiscount' | '!Total' | '!IsSubmitted')[], page?: number, pageSize?: number, filters?: Filters<Required<TShipment>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TShipment>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/orders/${direction}/${orderID}/shipments`, { ...requestOptions, impersonating, params: { ...listOptions,  filters: listOptions.filters,  } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Set a shipping address. Use only when the address is not to be saved/reused. To use a saved address (i.e. from the Addresses resource), PATCH the order's ShippingAddressID property instead.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/set-shipping-address|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param address Required fields: Street1, City, State, Zip, Country
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async SetShippingAddress<TOrder extends Order>(direction: OrderDirection, orderID: string, address: Address, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.put(`/orders/${direction}/${orderID}/shipto`, address, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Partially update an order shipping address. Not allowed on unsubmitted orders where ShippingAddressID has been set. In that case, use the Addresses resource to update the saved address.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/patch-shipping-address|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param address 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async PatchShippingAddress<TOrder extends Order>(direction: OrderDirection, orderID: string, address: Address, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/orders/${direction}/${orderID}/shipto`, address, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Split an order split. Creates, but does not submit, 0 or more outgoing Orders to Suppliers, one for each unique Product.DefaultSupplierID on this Order.
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/split|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Split<TOrderSplitResult extends OrderSplitResult>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrderSplitResult>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/split`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Submit an order submit. 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/submit|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Submit<TOrder extends Order>(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TOrder>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/submit`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Validate an order in its current state 
    * Check out the {@link https://ordercloud.io/api-reference/orders-and-fulfillment/orders/validate|api docs} for more info 
    * 
    * @param direction Direction of the order, from the current user's perspective. Possible values: incoming, outgoing.
    * @param orderID ID of the order.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Validate(direction: OrderDirection, orderID: string,  requestOptions: RequestOptions = {} ): Promise<void> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/orders/${direction}/${orderID}/validate`, { ...requestOptions, impersonating, params: {   } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

    /**
     * @description 
     * enables impersonation by calling the subsequent method with the stored impersonation token
     * 
     * @example
     * Orders.As().List() // lists Orders using the impersonated users' token
     */
    public As(): this {
        this.impersonating = true;
        return this;
    }
}

export default new Orders();