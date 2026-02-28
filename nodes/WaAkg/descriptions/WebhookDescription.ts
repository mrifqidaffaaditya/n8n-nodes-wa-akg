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
        ],
        default: 'getAll',
    },
];

export const webhookFields: INodeProperties[] = [
    { displayName: 'Webhook ID', name: 'webhookId', type: 'string', required: true, default: '', description: 'The internal ID of the webhook to manage', displayOptions: { show: { resource: ['webhook'], operation: ['update', 'delete'] } } },
    { displayName: 'Webhook URL', name: 'webhookUrl', type: 'string', required: true, default: '', description: 'The endpoint URL that will receive HTTP POST events', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },
    { displayName: 'Subscribed Events (Comma-separated)', name: 'webhookEvents', type: 'string', required: true, default: 'messages.upsert', description: 'Available: messages.upsert, messages.update, message.receipt, group-participants.update, groups.upsert, groups.update, connection.update', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['create', 'update']
            },
        },
        options: [
            { displayName: 'Webhook Secret', name: 'webhookSecret', type: 'string', default: '', description: 'Secret string for HMAC signature verification', displayOptions: { show: { '/operation': ['create', 'update'] } } },
        ],
    },
];
