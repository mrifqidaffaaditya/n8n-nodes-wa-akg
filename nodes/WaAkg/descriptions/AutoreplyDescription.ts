import { INodeProperties } from 'n8n-workflow';

export const autoreplyOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['autoreply'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get auto replies' },
            { name: 'Create', value: 'create', action: 'Create auto reply' },
            { name: 'Update', value: 'update', action: 'Update auto reply' },
            { name: 'Delete One', value: 'deleteOne', action: 'Delete auto reply' },
        ],
        default: 'getAll',
    },
];

export const autoreplyFields: INodeProperties[] = [
    { displayName: 'Auto Reply ID', name: 'replyId', type: 'string', required: true, default: '', description: 'The internal ID of the auto reply. E.g. "5f8a2b..."', displayOptions: { show: { resource: ['autoreply'], operation: ['update', 'deleteOne'] } } },
    { displayName: 'Auto Reply Config (JSON)', name: 'autoReplyData', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{"keyword": "help", "response": "Hello! How can I help you?"}', description: 'JSON configuration for the auto-reply rule. E.g. {"keyword": "help", "response": "Hi!"}', displayOptions: { show: { resource: ['autoreply'], operation: ['create', 'update'] } } },
];
