import { INodeProperties } from 'n8n-workflow';

export const schedulerOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['scheduler'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get scheduled messages' },
            { name: 'Create', value: 'create', action: 'Schedule message' },
            { name: 'Update', value: 'update', action: 'Update scheduled message' },
            { name: 'Delete One', value: 'deleteOne', action: 'Delete scheduled message' },
        ],
        default: 'getAll',
    },
];

export const schedulerFields: INodeProperties[] = [
    { displayName: 'Schedule Task ID', name: 'scheduleId', type: 'string', required: true, default: '', description: 'The internal ID of the scheduled task. E.g. "a1b2c3..."', displayOptions: { show: { resource: ['scheduler'], operation: ['update', 'deleteOne'] } } },
    { displayName: 'Schedule Config (JSON)', name: 'scheduleData', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{"jid": "628123456789@s.whatsapp.net", "content": "Scheduled reminder", "sendAt": "2026-12-01T10:00:00"}', description: 'JSON configuration for the scheduled task. E.g. {"jid": "628...", "content": "hello", "sendAt": "2026-10-26T10:00:00"}', displayOptions: { show: { resource: ['scheduler'], operation: ['create', 'update'] } } },
];
