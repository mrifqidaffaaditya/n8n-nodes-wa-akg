import { INodeProperties } from 'n8n-workflow';

export const statusOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['status'] } },
        options: [
            { name: 'Post Status [Deprecated]', value: 'post', action: 'Post status update (Deprecated in WA-AKG)' },
        ],
        default: 'post',
    },
];

export const statusFields: INodeProperties[] = [
    {
        displayName: 'Notice',
        name: 'statusNotice',
        type: 'notice',
        default: '',
        description: 'Notice: The standalone /api/status/:sessionId/update route was deprecated and removed in WA-AKG. For profile About/Bio status, please use Resource "Profile" with operation "Update Status".',
        displayOptions: { show: { resource: ['status'], operation: ['post'] } },
    },
    {
        displayName: 'Status Payload (Key-Value)',
        name: 'statusContent',
        type: 'fixedCollection',
        default: {},
        typeOptions: { multipleValues: true },
        description: 'Deprecated. Profile status is now managed under Resource "Profile".',
        displayOptions: { show: { resource: ['status'], operation: ['post'] } },
        options: [
            {
                name: 'propertyValues',
                displayName: 'Property',
                values: [
                    { displayName: 'Name', name: 'name', type: 'string', default: 'text', description: 'Attribute Name. E.g. text, image, video' },
                    { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Attribute Value. E.g. "Hello", or https://url/file.jpg' },
                ],
            },
        ],
    },
];
