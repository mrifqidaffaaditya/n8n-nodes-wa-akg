import { INodeProperties } from 'n8n-workflow';

export const mediaOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['media'] } },
        options: [
            { name: 'List All', value: 'list', action: 'List stored media files' },
            { name: 'Get File', value: 'getFile', action: 'Get a specific media file' },
            { name: 'Bulk Delete', value: 'bulkDelete', action: 'Delete multiple media files' },
        ],
        default: 'list',
    },
];

export const mediaFields: INodeProperties[] = [
    { displayName: 'Filename', name: 'mediaFilename', type: 'string', required: true, default: '', description: 'The stored media filename to retrieve (e.g. "session1-ABCDEF123.jpg")', displayOptions: { show: { resource: ['media'], operation: ['getFile'] } } },
    { displayName: 'Filenames (Comma-separated)', name: 'mediaFilenames', type: 'string', required: true, default: '', description: 'Comma-separated list of filenames to delete. E.g. "file1.jpg, file2.mp4"', displayOptions: { show: { resource: ['media'], operation: ['bulkDelete'] } } },
];
