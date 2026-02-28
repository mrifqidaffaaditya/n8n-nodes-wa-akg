import { INodeProperties } from 'n8n-workflow';

export const labelOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['label'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get all labels' },
            { name: 'Create', value: 'create', action: 'Create label' },
            { name: 'Update', value: 'update', action: 'Update label' },
            { name: 'Delete', value: 'delete', action: 'Delete label' },
            { name: 'Get Chat Labels', value: 'getChatLabels', action: 'Get labels of a chat' },
            { name: 'Set Chat Labels', value: 'setChatLabels', action: 'Set labels on a chat' },
            { name: 'Get Chats By Label', value: 'getChatsByLabel', action: 'Get chats by label' },
        ],
        default: 'getAll',
    },
];

export const labelFields: INodeProperties[] = [
    { displayName: 'Label ID', name: 'labelId', type: 'string', required: true, default: '', description: 'The internal ID of the label', displayOptions: { show: { resource: ['label'], operation: ['update', 'delete', 'getChatsByLabel'] } } },
    { displayName: 'Label Name', name: 'labelName', type: 'string', required: true, default: '', description: 'Display name color of the label', displayOptions: { show: { resource: ['label'], operation: ['create', 'update'] } } },
    { displayName: 'Chat JID', name: 'chatJid', type: 'string', required: true, default: '', description: 'JID of the chat to add/remove labels', displayOptions: { show: { resource: ['label'], operation: ['getChatLabels', 'setChatLabels'] } } },

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['label'],
                operation: ['create', 'update', 'setChatLabels']
            },
        },
        options: [
            { displayName: 'Color Integer', name: 'labelColor', type: 'number', default: 0, description: 'Color representation integer', displayOptions: { show: { '/operation': ['create', 'update'] } } },
            { displayName: 'Label IDs Array (JSON)', name: 'labelIds', type: 'string', default: '[]', description: 'JSON array of Label IDs to enforce. Example: ["1", "3"]', displayOptions: { show: { '/operation': ['setChatLabels'] } } },
        ],
    },
];
