import { INodeProperties } from 'n8n-workflow';

export const autoreplyOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['autoreply'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get auto replies' },
            { name: 'Create', value: 'create', action: 'Create auto reply' },
            { name: 'Delete All', value: 'deleteAll', action: 'Delete all auto replies' },
            { name: 'Delete One', value: 'deleteOne', action: 'Delete auto reply' },
        ],
        default: 'getAll',
    },
];

export const autoreplyFields: INodeProperties[] = [
    { displayName: 'Auto Reply Config (JSON)', name: 'autoReplyData', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{}', description: 'JSON configuration for the auto-reply rule', displayOptions: { show: { resource: ['autoreply'], operation: ['create'] } } },
    { displayName: 'Auto Reply ID', name: 'replyId', type: 'string', required: true, default: '', description: 'The internal ID of the auto reply to delete', displayOptions: { show: { resource: ['autoreply'], operation: ['deleteOne'] } } },
];
