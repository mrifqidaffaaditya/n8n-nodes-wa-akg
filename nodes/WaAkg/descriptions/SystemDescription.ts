import { INodeProperties } from 'n8n-workflow';

export const systemOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['system'] } },
        options: [
            { name: 'Get Settings', value: 'getSettings', action: 'Get system settings' },
            { name: 'Update Settings', value: 'updateSettings', action: 'Update system settings' },
            { name: 'Check Updates', value: 'checkUpdates', action: 'Check for updates' },
        ],
        default: 'getSettings',
    },
];

export const systemFields: INodeProperties[] = [
    {
        displayName: 'Settings Updates (Key-Value)',
        name: 'systemSettings',
        type: 'fixedCollection',
        default: {},
        typeOptions: { multipleValues: true },
        description: 'Key-Value pairs for system settings to override. E.g. name: theme, value: dark',
        displayOptions: { show: { resource: ['system'], operation: ['updateSettings'] } },
        options: [
            {
                name: 'propertyValues',
                displayName: 'Property',
                values: [
                    { displayName: 'Name', name: 'name', type: 'string', default: '', description: 'Setting Name. E.g. "theme"' },
                    { displayName: 'Value', name: 'value', type: 'string', default: '', description: 'Setting Value. E.g. "dark"' },
                ],
            },
        ],
    },
];
