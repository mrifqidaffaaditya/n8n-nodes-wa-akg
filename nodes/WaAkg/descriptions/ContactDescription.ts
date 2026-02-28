import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['contact'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get all contacts' },
            { name: 'Block', value: 'block', action: 'Block contact' },
            { name: 'Unblock', value: 'unblock', action: 'Unblock contact' },
        ],
        default: 'getAll',
    },
];

export const contactFields: INodeProperties[] = [];
