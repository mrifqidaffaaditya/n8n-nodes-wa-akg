import { INodeProperties } from 'n8n-workflow';

export const statusOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['status'] } },
        options: [
            { name: 'Post Status', value: 'post', action: 'Post status update' },
        ],
        default: 'post',
    },
];

export const statusFields: INodeProperties[] = [
    { displayName: 'Status Payload (JSON)', name: 'statusContent', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{}', description: 'JSON object defining text, media, or contact status to post', displayOptions: { show: { resource: ['status'], operation: ['post'] } } },
];
