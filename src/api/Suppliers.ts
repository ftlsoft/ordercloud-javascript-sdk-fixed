import { ListPage } from '../models/ListPage';
import { Supplier } from '../models/Supplier';
import { PartialDeep } from '../models/PartialDeep';
import { RequiredDeep } from '../models/RequiredDeep';
import { Filters } from '../models/Filters';
import { RequestOptions } from '../models/RequestOptions';
import httpClient from '../utils/HttpClient';
import OrderCloudError from '../utils/OrderCloudError';

class Suppliers {
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
    }

   /**
    * Get a list of suppliers. 
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/list|api docs} for more info 
    * 
    * @param listOptions.search Word or phrase to search for.
    * @param listOptions.searchOn Comma-delimited list of fields to search on.
    * @param listOptions.sortBy Comma-delimited list of fields to sort by.
    * @param listOptions.page Page of results to return. Default: 1
    * @param listOptions.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param listOptions.filters An object whose keys match the model, and the values are the values to filter by
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async List<TSupplier extends Supplier>( options: { search?: string, searchOn?: ('Name' | 'ID')[], sortBy?: ('ID' | 'Name' | '!ID' | '!Name')[], page?: number, pageSize?: number, filters?: Filters<Required<TSupplier>> } = {}, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<ListPage<TSupplier>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/suppliers`, { params: { ...options,  filters: options.filters, ...requestOptions, impersonating } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Create a new supplier. If ID is provided and an object with that ID already exists, a 409 (conflict) error is returned.
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/create|api docs} for more info 
    * 
    * @param supplier Required fields: Name
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Create<TSupplier extends Supplier>(supplier: Supplier, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TSupplier>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/suppliers`, supplier, { params: {  ...requestOptions, impersonating } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Get a single supplier. 
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/get|api docs} for more info 
    * 
    * @param supplierID ID of the supplier.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Get<TSupplier extends Supplier>(supplierID: string,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TSupplier>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/suppliers/${supplierID}`, { params: {  ...requestOptions, impersonating } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Create or update a supplier. If an object with the same ID already exists, it will be overwritten.
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/save|api docs} for more info 
    * 
    * @param supplierID ID of the supplier.
    * @param supplier Required fields: Name
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Save<TSupplier extends Supplier>(supplierID: string, supplier: Supplier, requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TSupplier>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.put(`/suppliers/${supplierID}`, supplier, { params: {  ...requestOptions, impersonating } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Delete a supplier. 
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/delete|api docs} for more info 
    * 
    * @param supplierID ID of the supplier.
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Delete(supplierID: string,  requestOptions: RequestOptions = {} ): Promise<void> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.delete(`/suppliers/${supplierID}`, { params: {  ...requestOptions, impersonating } } )
        .catch(ex => {
            if(ex.response) {
                throw new OrderCloudError(ex)
            }
            throw ex;
        })
    }

   /**
    * Partially update a supplier. 
    * Check out the {@link https://ordercloud.io/api-reference/suppliers/suppliers/patch|api docs} for more info 
    * 
    * @param supplierID ID of the supplier.
    * @param supplier 
    * @param requestOptions.accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    * @param requestOptions.cancelToken Provide an [axios cancelToken](https://github.com/axios/axios#cancellation) that can be used to cancel the request.
    */
    public async Patch<TSupplier extends Supplier>(supplierID: string, supplier: PartialDeep<Supplier>,  requestOptions: RequestOptions = {} ): Promise<RequiredDeep<TSupplier>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/suppliers/${supplierID}`, supplier, { params: {  ...requestOptions, impersonating } } )
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
     * Suppliers.As().List() // lists Suppliers using the impersonated users' token
     */
    public As(): this {
        this.impersonating = true;
        return this;
    }
}

export default new Suppliers();