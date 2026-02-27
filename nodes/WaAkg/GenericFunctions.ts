import {
    IExecuteFunctions,
    IHookFunctions,
    ILoadOptionsFunctions,
    IHttpRequestOptions,
    IHttpRequestMethods,
} from 'n8n-workflow';

export async function waAkgApiRequest(
    this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
    method: IHttpRequestMethods,
    resource: string,
    body: any = {},
    qs: any = {},
    uri?: string,
): Promise<any> {
    const credentials = await this.getCredentials('waAkgApi');
    const baseUrl = credentials.baseUrl as string;

    const options: IHttpRequestOptions = {
        method,
        body,
        qs,
        url: uri || `${baseUrl}${resource}`,
        json: true,
    };
    if (Object.keys(options.body).length === 0) {
        delete options.body;
    }

    try {
        return await this.helpers.httpRequestWithAuthentication.call(this, 'waAkgApi', options);
    } catch (error: any) {
        throw error;
    }
}
