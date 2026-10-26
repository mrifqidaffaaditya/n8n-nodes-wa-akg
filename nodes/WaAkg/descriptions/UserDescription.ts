import { INodeProperties } from 'n8n-workflow';

export const userOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['user'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get all users' },
            { name: 'Create', value: 'create', action: 'Create user (Superadmin)' },
            { name: 'Register', value: 'register', action: 'Register new user account' },
            { name: 'Update', value: 'update', action: 'Update user' },
            { name: 'Delete', value: 'delete', action: 'Delete user' },
            { name: 'Get API Key', value: 'getApiKey', action: 'Get API key' },
            { name: 'Generate API Key', value: 'generateApiKey', action: 'Generate API key' },
            { name: 'Delete API Key', value: 'deleteApiKey', action: 'Delete API key' },
        ],
        default: 'getAll',
    },
];

export const userFields: INodeProperties[] = [
    { displayName: 'User ID', name: 'userId', type: 'string', required: true, default: '', description: 'The internal ID of the WA-AKG user. E.g. "usr_123xyz"', displayOptions: { show: { resource: ['user'], operation: ['update', 'delete'] } } },
    { displayName: 'Name', name: 'registerName', type: 'string', required: true, default: '', description: 'Full name for the new user account', displayOptions: { show: { resource: ['user'], operation: ['register'] } } },
    { displayName: 'Email', name: 'registerEmail', type: 'string', required: true, default: '', description: 'Email address for the new user account', displayOptions: { show: { resource: ['user'], operation: ['register'] } } },
    { displayName: 'Password', name: 'registerPassword', type: 'string', typeOptions: { password: true }, required: true, default: '', description: 'Password (min. 6 characters)', displayOptions: { show: { resource: ['user'], operation: ['register'] } } },
    {
        displayName: 'User Metadata (Key-Value)',
        name: 'userData',
        type: 'fixedCollection',
        default: {},
        typeOptions: { multipleValues: true },
        description: 'Key-Value pairs containing user data attributes. E.g. name: role, value: "admin"',
        displayOptions: { show: { resource: ['user'], operation: ['create', 'update'] } },
        options: [
            {
                name: 'propertyValues',
                displayName: 'Property',
                values: [
                    { displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Metadata Name. E.g. "role"' },
                    { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Metadata Value. E.g. "admin"' },
                ],
            },
        ],
    },
];
