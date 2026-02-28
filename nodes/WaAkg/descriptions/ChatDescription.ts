import { INodeProperties } from 'n8n-workflow';

export const chatOperations: INodeProperties[] = [
    {
        displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
        displayOptions: { show: { resource: ['chat'] } },
        options: [
            { name: 'Get All', value: 'getAll', action: 'Get all chats' },
            { name: 'Get One', value: 'getOne', action: 'Get chat messages' },
            { name: 'Check Number', value: 'check', action: 'Check if number on WA' },
            { name: 'Set Read', value: 'read', action: 'Mark chat as read' },
            { name: 'Archive', value: 'archive', action: 'Archive or unarchive' },
            { name: 'Mute', value: 'mute', action: 'Mute or unmute' },
            { name: 'Pin', value: 'pin', action: 'Pin or unpin' },
            { name: 'Send Presence', value: 'presence', action: 'Send typing indicator' },
            { name: 'Get Profile Picture', value: 'profilePic', action: 'Get profile picture' },
        ],
        default: 'getAll',
    },
];

export const chatFields: INodeProperties[] = [
    { displayName: 'Phone Numbers (Comma-separated)', name: 'numbers', type: 'string', required: true, default: '', description: 'Phone numbers to check separated by commas (e.g. 62812..., 62813...)', displayOptions: { show: { resource: ['chat'], operation: ['check'] } } },
    { displayName: 'Presence Type', name: 'presenceType', type: 'options', options: [{ name: 'Composing (Typing)', value: 'composing' }, { name: 'Recording (Audio)', value: 'recording' }, { name: 'Paused (Stop)', value: 'paused' }], default: 'composing', required: true, description: 'The status indicator to show in the target chat', displayOptions: { show: { resource: ['chat'], operation: ['presence'] } } },
];
