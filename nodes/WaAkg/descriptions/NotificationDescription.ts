import { INodeProperties } from 'n8n-workflow';

export const notificationOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['notification'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get notifications' },
            { name: 'Create', value: 'create', action: 'Create notification' },
            { name: 'Mark Read', value: 'markRead', action: 'Mark as read' },
            { name: 'Delete', value: 'delete', action: 'Delete notifications' },
        ],
        default: 'getAll',
    },
];

export const notificationFields: INodeProperties[] = [
    { displayName: 'Notification Content (JSON)', name: 'notifData', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{}', description: 'JSON payload defining notification details', displayOptions: { show: { resource: ['notification'], operation: ['create'] } } },
];
