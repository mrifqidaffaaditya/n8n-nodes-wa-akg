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
            { name: 'Delete', value: 'delete', action: 'Delete session' },
            { name: 'Get Bot Config', value: 'getBotConfig', action: 'Get bot config' },
            { name: 'Update Bot Config', value: 'updateBotConfig', action: 'Update bot config' },
        ],
        default: 'getAll',
    },
];

export const sessionFields: INodeProperties[] = [
    { displayName: 'Target Session ID', name: 'targetSessionId', type: 'string', required: true, default: '', description: 'The ID of the session you want to manage. E.g. "my_session_1"', displayOptions: { show: { resource: ['session'], operation: ['getOne', 'action', 'getQr', 'updateSettings', 'delete', 'getBotConfig', 'updateBotConfig'] } } },
    { displayName: 'Session Name', name: 'sessionName', type: 'string', required: true, default: '', description: 'A readable name for the new session. E.g. "Customer Service Bot"', displayOptions: { show: { resource: ['session'], operation: ['create'] } } },
    { displayName: 'Session Action', name: 'sessionAction', type: 'options', required: true, options: [{ name: 'Start', value: 'start' }, { name: 'Stop', value: 'stop' }, { name: 'Restart', value: 'restart' }, { name: 'Logout', value: 'logout' }], default: 'start', description: 'The power action to perform on the session', displayOptions: { show: { resource: ['session'], operation: ['action'] } } },
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
