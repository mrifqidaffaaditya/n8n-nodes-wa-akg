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
    {
        displayName: 'Notification Content (Key-Value)',
        name: 'notifData',
        type: 'fixedCollection',
        default: {},
        typeOptions: { multipleValues: true },
        description: 'Key-Value pairs defining notification details',
        displayOptions: { show: { resource: ['notification'], operation: ['create'] } },
        options: [
            {
                name: 'propertyValues',
                displayName: 'Property',
                values: [
                    { displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Detail Name' },
                    { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Detail Value' },
                ],
            },
        ],
    },
];
