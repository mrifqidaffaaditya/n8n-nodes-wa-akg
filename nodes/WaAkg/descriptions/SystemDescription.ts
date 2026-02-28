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
    { displayName: 'Settings Updates (JSON)', name: 'systemSettings', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{}', description: 'JSON payload of key-value system settings to override', displayOptions: { show: { resource: ['system'], operation: ['updateSettings'] } } },
];
