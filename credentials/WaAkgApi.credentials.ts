import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class WaAkgApi implements ICredentialType {
    name = 'waAkgApi';
    displayName = 'WA-AKG API';
    documentationUrl = 'https://github.com';
    properties: INodeProperties[] = [
        {
            displayName: 'Base URL',
            name: 'baseUrl',
            type: 'string',
            default: 'http://localhost:3000',
            description: 'The base URL of your WA-AKG instance',
        },
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            description: 'The API Key for authentication (X-API-Key)',
        },
    ];

    authenticate = {
        type: 'generic',
        properties: {
            headers: {
                'X-API-Key': '={{$credentials.apiKey}}',
            },
        },
    } as IAuthenticateGeneric;

    test: ICredentialTestRequest = {
        request: {
            baseURL: '={{$credentials.baseUrl}}',
            url: '/api/settings/system', // Using an endpoint to verify connection
        },
    };
}
