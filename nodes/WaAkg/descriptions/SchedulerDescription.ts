import { INodeProperties } from 'n8n-workflow';

export const schedulerOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['scheduler'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get scheduled messages' },
            { name: 'Create', value: 'create', action: 'Schedule message' },
            { name: 'Delete All', value: 'deleteAll', action: 'Delete all scheduled' },
            { name: 'Delete One', value: 'deleteOne', action: 'Delete scheduled message' },
        ],
        default: 'getAll',
    },
];

export const schedulerFields: INodeProperties[] = [
    { displayName: 'Schedule Config (JSON)', name: 'scheduleData', type: 'string', typeOptions: { rows: 4 }, required: true, default: '{}', description: 'JSON configuration for the scheduled task. E.g. {"to": "628...", "message": "hello", "time": "2024-01-01T10:00:00Z"}', displayOptions: { show: { resource: ['scheduler'], operation: ['create'] } } },
    { displayName: 'Schedule Task ID', name: 'scheduleId', type: 'string', required: true, default: '', description: 'The internal ID of the scheduled task to delete. E.g. "a1b2c3..."', displayOptions: { show: { resource: ['scheduler'], operation: ['deleteOne'] } } },
];
