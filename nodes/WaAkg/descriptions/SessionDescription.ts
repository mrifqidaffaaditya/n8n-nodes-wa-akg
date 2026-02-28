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
    { displayName: 'Target Session ID', name: 'targetSessionId', type: 'string', required: true, default: '', description: 'The ID of the session you want to manage', displayOptions: { show: { resource: ['session'], operation: ['getOne', 'action', 'getQr', 'updateSettings', 'delete', 'getBotConfig', 'updateBotConfig'] } } },
    { displayName: 'Session Name', name: 'sessionName', type: 'string', required: true, default: '', description: 'A readable name for the new session', displayOptions: { show: { resource: ['session'], operation: ['create'] } } },
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
            { displayName: 'Custom Session ID', name: 'newSessionId', type: 'string', default: '', description: 'Manually override the generated Session ID', displayOptions: { show: { '/operation': ['create'] } } },
            { displayName: 'Bot Config (JSON)', name: 'botConfig', type: 'string', default: '', description: 'JSON object containing bot configuration parameters', displayOptions: { show: { '/operation': ['updateBotConfig'] } } },
            { displayName: 'Settings (JSON)', name: 'sessionSettings', type: 'string', default: '', description: 'JSON object containing session settings updates', displayOptions: { show: { '/operation': ['updateSettings'] } } },
        ],
    },
];
