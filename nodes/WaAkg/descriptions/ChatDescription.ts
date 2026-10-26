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
            { name: 'Archive', value: 'archive', action: 'Archive or unarchive chat' },
            { name: 'Mute', value: 'mute', action: 'Mute or unmute chat' },
            { name: 'Pin', value: 'pin', action: 'Pin or unpin chat' },
            { name: 'Send Presence', value: 'presence', action: 'Send typing indicator' },
            { name: 'Get Profile Picture', value: 'profilePic', action: 'Get profile picture' },
        ],
        default: 'getAll',
    },
];

export const chatFields: INodeProperties[] = [
    { displayName: 'Phone Numbers (Comma-separated)', name: 'numbers', type: 'string', required: true, default: '', description: 'Phone numbers to check separated by commas. E.g. "6281234567, 6289876543"', displayOptions: { show: { resource: ['chat'], operation: ['check'] } } },
    { displayName: 'Presence Type', name: 'presenceType', type: 'options', options: [{ name: 'Composing (Typing)', value: 'composing' }, { name: 'Recording (Audio)', value: 'recording' }, { name: 'Paused (Stop)', value: 'paused' }], default: 'composing', required: true, description: 'The status indicator to show in the target chat. E.g. "typing..."', displayOptions: { show: { resource: ['chat'], operation: ['presence'] } } },
    { displayName: 'Archive', name: 'archiveChat', type: 'boolean', default: true, description: 'Whether to archive (true) or unarchive (false) the chat', displayOptions: { show: { resource: ['chat'], operation: ['archive'] } } },
    { displayName: 'Mute', name: 'muteChat', type: 'boolean', default: true, description: 'Whether to mute (true) or unmute (false) the chat', displayOptions: { show: { resource: ['chat'], operation: ['mute'] } } },
    { displayName: 'Pin', name: 'pinChat', type: 'boolean', default: true, description: 'Whether to pin (true) or unpin (false) the chat', displayOptions: { show: { resource: ['chat'], operation: ['pin'] } } },

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['chat'],
                operation: ['mute', 'read'],
            },
        },
        options: [
            { displayName: 'Mute Duration (Seconds)', name: 'muteDuration', type: 'number', default: 28800, description: 'Duration to mute the chat in seconds (e.g. 28800 for 8 hours). Set to -1 or leave empty for permanent mute.', displayOptions: { show: { '/operation': ['mute'] } } },
            { displayName: 'Message IDs (Comma-separated)', name: 'readMessageIds', type: 'string', default: '', description: 'Optional: comma-separated list of specific message IDs to mark as read. If empty, marks the entire chat as read.', displayOptions: { show: { '/operation': ['read'] } } },
        ],
    },
];
