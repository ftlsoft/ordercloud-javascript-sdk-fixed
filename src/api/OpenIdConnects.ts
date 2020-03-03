import { ListPage } from '../models/ListPage';
import { OpenIdConnect } from '../models/OpenIdConnect';
import { PartialDeep } from '../models/PartialDeep';
import { RequiredDeep } from '../models/RequiredDeep';
import { Filters } from '../models/Filters';
import httpClient from '../utils/HttpClient';

class OpenIdConnects {
    private impersonating:boolean = false;

   /**
    * @param options.search Word or phrase to search for.
    * @param options.searchOn Comma-delimited list of fields to search on.
    * @param options.sortBy Comma-delimited list of fields to sort by.
    * @param options.page Page of results to return. Default: 1
    * @param options.pageSize Number of results to return per page. Default: 20, max: 100.
    * @param options.filters An object whose keys match the model, and the values are the values to filter by
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async List<TOpenIdConnect extends OpenIdConnect>( options: { search?: string, searchOn?: string[], sortBy?: string[], page?: number, pageSize?: number, filters?: Filters<Required<TOpenIdConnect>> } = {}, accessToken?: string ): Promise<RequiredDeep<ListPage<TOpenIdConnect>>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/openidconnects`, { params: { ...options, filters: options.filters, accessToken, impersonating } } );
    }

   /**
    * @param openIdConnect Required fields: OrderCloudApiClientID, ConnectClientID, ConnectClientSecret, AppStartUrl, AuthorizationEndpoint, TokenEndpoint
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async Create<TOpenIdConnect extends OpenIdConnect>(openIdConnect: OpenIdConnect, accessToken?: string ): Promise<RequiredDeep<TOpenIdConnect>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.post(`/openidconnects`, { data: openIdConnect, params: { accessToken, impersonating } }  );
    }

   /**
    * @param openidconnectID ID of the openidconnect.
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async Get<TOpenIdConnect extends OpenIdConnect>(openidconnectID: string,  accessToken?: string ): Promise<RequiredDeep<TOpenIdConnect>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.get(`/openidconnects/${openidconnectID}`, { params: { accessToken, impersonating } } );
    }

   /**
    * @param openidconnectID ID of the openidconnect.
    * @param openIdConnect Required fields: OrderCloudApiClientID, ConnectClientID, ConnectClientSecret, AppStartUrl, AuthorizationEndpoint, TokenEndpoint
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async Save<TOpenIdConnect extends OpenIdConnect>(openidconnectID: string, openIdConnect: OpenIdConnect, accessToken?: string ): Promise<RequiredDeep<TOpenIdConnect>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.put(`/openidconnects/${openidconnectID}`, { data: openIdConnect, params: { accessToken, impersonating } }  );
    }

   /**
    * @param openidconnectID ID of the openidconnect.
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async Delete(openidconnectID: string,  accessToken?: string ): Promise<void> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.delete(`/openidconnects/${openidconnectID}`, { params: { accessToken, impersonating } } );
    }

   /**
    * @param openidconnectID ID of the openidconnect.
    * @param openIdConnect 
    * @param accessToken Provide an alternative token to the one stored in the sdk instance (useful for impersonation).
    */
    public async Patch<TOpenIdConnect extends OpenIdConnect>(openidconnectID: string, openIdConnect: PartialDeep<OpenIdConnect>,  accessToken?: string ): Promise<RequiredDeep<TOpenIdConnect>> {
        const impersonating = this.impersonating;
        this.impersonating = false;
        return await httpClient.patch(`/openidconnects/${openidconnectID}`, { data: openIdConnect, params: { accessToken, impersonating } }  );
    }

    /**
     * @description 
     * enables impersonation by calling the subsequent method with the stored impersonation token
     * 
     * @example
     * OpenIdConnects.As().List() // lists OpenIdConnects using the impersonated users' token
     */
    public As(): this {
        this.impersonating = true;
        return this;
    }
}

export default new OpenIdConnects();