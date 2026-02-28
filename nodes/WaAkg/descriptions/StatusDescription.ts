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
    {
        displayName: 'Status Payload (Key-Value)',
        name: 'statusContent',
        type: 'fixedCollection',
        default: {},
        typeOptions: { multipleValues: true },
        description: 'Key-Value pairs defining text, media, or contact status to post',
        displayOptions: { show: { resource: ['status'], operation: ['post'] } },
        options: [
            {
                name: 'propertyValues',
                displayName: 'Property',
                values: [
                    { displayName: 'Name', name: 'name', type: 'string', default: 'text', description: 'Attribute Name (e.g. text/image)' },
                    { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Attribute Value' },
                ],
            },
        ],
    },
];
