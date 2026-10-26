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
    formData?: any,
): Promise<any> {
    const credentials = await this.getCredentials('waAkgApi');
    const baseUrl = credentials.baseUrl as string;

    const options: IHttpRequestOptions = {
        method,
        body: formData || body,
        qs,
        url: uri || `${baseUrl}${resource}`,
        json: !formData,
        headers: formData ? { 'Content-Type': 'multipart/form-data' } : {},
    };
    if (!formData && options.body && Object.keys(options.body).length === 0) {
        delete options.body;
    }

    try {
        return await this.helpers.httpRequestWithAuthentication.call(this, 'waAkgApi', options);
    } catch (error: any) {
        throw error;
    }
}
