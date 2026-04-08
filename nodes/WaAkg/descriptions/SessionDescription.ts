import { INodeProperties } from 'n8n-workflow';

export const sessionOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['session'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get all sessions' },
            { name: 'Get One', value: 'getOne', action: 'Get session details' },
            { name: 'Create', value: 'create', action: 'Create session' },
            { name: 'Action', value: 'action', action: 'Start stop restart logout' },
            { name: 'Get QR', value: 'getQr', action: 'Get QR code' },
            { name: 'Update Settings', value: 'updateSettings', action: 'Update settings' },
            { name: 'Delete Settings', value: 'deleteSettings', action: 'Delete session settings' },
            { name: 'Get Bot Config', value: 'getBotConfig', action: 'Get bot config' },
            { name: 'Update Bot Config', value: 'updateBotConfig', action: 'Update bot config' },
            { name: 'Get Access List', value: 'getAccessList', action: 'List shared access users' },
            { name: 'Grant Access', value: 'grantAccess', action: 'Grant session access by email' },
            { name: 'Revoke Access', value: 'revokeAccess', action: 'Revoke session access' },
        ],
        default: 'getAll',
    },
];

export const sessionFields: INodeProperties[] = [
    { displayName: 'Target Session ID', name: 'targetSessionId', type: 'string', required: true, default: '', description: 'The ID of the session you want to manage. E.g. "my_session_1"', displayOptions: { show: { resource: ['session'], operation: ['getOne', 'action', 'getQr', 'updateSettings', 'deleteSettings', 'getBotConfig', 'updateBotConfig', 'getAccessList', 'grantAccess', 'revokeAccess'] } } },
    { displayName: 'Session Name', name: 'sessionName', type: 'string', required: true, default: '', description: 'A readable name for the new session. E.g. "Customer Service Bot"', displayOptions: { show: { resource: ['session'], operation: ['create'] } } },
    { displayName: 'Session Action', name: 'sessionAction', type: 'options', required: true, options: [{ name: 'Start', value: 'start' }, { name: 'Stop', value: 'stop' }, { name: 'Restart', value: 'restart' }, { name: 'Logout', value: 'logout' }], default: 'start', description: 'The power action to perform on the session', displayOptions: { show: { resource: ['session'], operation: ['action'] } } },
    { displayName: 'User Email', name: 'accessEmail', type: 'string', required: true, default: '', description: 'Email of the user to grant access to. E.g. "user@example.com"', displayOptions: { show: { resource: ['session'], operation: ['grantAccess'] } } },
    { displayName: 'User ID', name: 'accessUserId', type: 'string', required: true, default: '', description: 'The internal user ID to revoke access from. E.g. "usr_abc123"', displayOptions: { show: { resource: ['session'], operation: ['revokeAccess'] } } },
    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['session'],
            },
        },
        options: [
            { displayName: 'Custom Session ID', name: 'newSessionId', type: 'string', default: '', description: 'Manually override the generated Session ID. E.g. "custom_id_123"', displayOptions: { show: { '/operation': ['create'] } } },
            {
                displayName: 'Bot Config (Key-Value)',
                name: 'botConfig',
                type: 'fixedCollection',
                default: {},
                typeOptions: { multipleValues: true },
                description: 'Key-Value pairs for bot configuration',
                displayOptions: { show: { '/operation': ['updateBotConfig'] } },
                options: [
                    {
                        name: 'propertyValues',
                        displayName: 'Property',
                        values: [
                            { displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Property Name. E.g. "prefix"' },
                            { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Property Value. E.g. "!"' },
                        ],
                    },
                ],
            },
            {
                displayName: 'Settings (Key-Value)',
                name: 'sessionSettings',
                type: 'fixedCollection',
                default: {},
                typeOptions: { multipleValues: true },
                description: 'Key-Value pairs for session settings',
                displayOptions: { show: { '/operation': ['updateSettings'] } },
                options: [
                    {
                        name: 'propertyValues',
                        displayName: 'Property',
                        values: [
                            { displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Setting Name. E.g. "rejectCall"' },
                            { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Setting Value. E.g. "true"' },
                        ],
                    },
                ],
            },
        ],
    },
];
