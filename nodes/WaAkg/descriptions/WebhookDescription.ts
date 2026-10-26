import { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['webhook'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get webhooks' },
            { name: 'Create', value: 'create', action: 'Create webhook' },
            { name: 'Update', value: 'update', action: 'Update webhook' },
            { name: 'Delete', value: 'delete', action: 'Delete webhook' },
            { name: 'Get Delivery Logs', value: 'getLogs', action: 'Get webhook delivery logs' },
            { name: 'Test Webhook', value: 'test', action: 'Send test event to webhook' },
        ],
        default: 'getAll',
    },
];

export const webhookFields: INodeProperties[] = [
    { displayName: 'Webhook ID', name: 'webhookId', type: 'string', required: true, default: '', description: 'The internal ID of the webhook to manage', displayOptions: { show: { resource: ['webhook'], operation: ['update', 'delete', 'getLogs', 'test'] } } },
    { displayName: 'Webhook URL', name: 'webhookUrl', type: 'string', required: true, default: '', description: 'The endpoint URL that will receive HTTP POST events', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },
    { displayName: 'Subscribed Events (Comma-separated)', name: 'webhookEvents', type: 'string', required: true, default: 'message.received', description: 'Available: message.received, message.sent, message.status, message.edited, message.deleted, connection.update, group.update, group.participant, contact.update, status.update', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['create', 'update', 'getLogs'],
            },
        },
        options: [
            { displayName: 'Webhook Secret', name: 'webhookSecret', type: 'string', default: '', description: 'Secret string for HMAC signature verification', displayOptions: { show: { '/operation': ['create', 'update'] } } },
            { displayName: 'Limit', name: 'limit', type: 'number', default: 50, description: 'Max number of logs to return (max 200)', displayOptions: { show: { '/operation': ['getLogs'] } } },
            { displayName: 'Offset', name: 'offset', type: 'number', default: 0, description: 'Number of logs to skip', displayOptions: { show: { '/operation': ['getLogs'] } } },
        ],
    },
];
