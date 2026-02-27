import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { waAkgApiRequest } from './GenericFunctions';

export class WaAkg implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'WA-AKG',
        name: 'waAkg',
        icon: 'file:WaAkg.svg',
        group: ['transform'],
        version: 1,
        subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
        description: 'Interact with WA-AKG WhatsApp Gateway API',
        defaults: { name: 'WA-AKG' },
        inputs: ['main'],
        outputs: ['main'],
        credentials: [{ name: 'waAkgApi', required: true }],
        properties: [
            // ===== RESOURCE =====
            {
                displayName: 'Resource',
                name: 'resource',
                type: 'options',
                noDataExpression: true,
                options: [
                    { name: 'Auto Reply', value: 'autoreply' },
                    { name: 'Chat', value: 'chat' },
                    { name: 'Contact', value: 'contact' },
                    { name: 'Group', value: 'group' },
                    { name: 'Label', value: 'label' },
                    { name: 'Message', value: 'message' },
                    { name: 'Notification', value: 'notification' },
                    { name: 'Profile', value: 'profile' },
                    { name: 'Scheduler', value: 'scheduler' },
                    { name: 'Session', value: 'session' },
                    { name: 'Status Update', value: 'status' },
                    { name: 'System', value: 'system' },
                    { name: 'User', value: 'user' },
                    { name: 'Webhook', value: 'webhook' },
                ],
                default: 'message',
            },
            // ===== MESSAGE OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['message'] } },
                options: [
                    { name: 'Send Text', value: 'sendText', action: 'Send text message' },
                    { name: 'Send Media URL', value: 'sendMedia', action: 'Send media from URL' },
                    { name: 'Send Location', value: 'sendLocation', action: 'Send location' },
                    { name: 'Send Contact', value: 'sendContact', action: 'Send contact card' },
                    { name: 'Send Poll', value: 'sendPoll', action: 'Send poll' },
                    { name: 'Send List', value: 'sendList', action: 'Send list message' },
                    { name: 'Send Sticker', value: 'sendSticker', action: 'Send sticker' },
                    { name: 'Reply', value: 'reply', action: 'Reply to message' },
                    { name: 'React', value: 'react', action: 'React to message' },
                    { name: 'Star', value: 'star', action: 'Star or unstar message' },
                    { name: 'Delete', value: 'delete', action: 'Delete message' },
                    { name: 'Forward', value: 'forward', action: 'Forward message' },
                    { name: 'Broadcast', value: 'broadcast', action: 'Broadcast message' },
                    { name: 'Search', value: 'search', action: 'Search messages' },
                    { name: 'Download Media', value: 'downloadMedia', action: 'Download media' },
                    { name: 'Report Spam', value: 'spam', action: 'Report spam' },
                ],
                default: 'sendText',
            },
            // ===== SESSION OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['session'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get all sessions' },
                    { name: 'Get One', value: 'getOne', action: 'Get session details' },
                    { name: 'Create', value: 'create', action: 'Create session' },
                    { name: 'Action', value: 'action', action: 'Start stop restart logout' },
                    { name: 'Get QR', value: 'getQr', action: 'Get QR code' },
                    { name: 'Update Settings', value: 'updateSettings', action: 'Update settings' },
                    { name: 'Delete', value: 'delete', action: 'Delete session' },
                    { name: 'Get Bot Config', value: 'getBotConfig', action: 'Get bot config' },
                    { name: 'Update Bot Config', value: 'updateBotConfig', action: 'Update bot config' },
                ],
                default: 'getAll',
            },
            // ===== CHAT OPERATIONS =====
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
            // ===== GROUP OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['group'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get all groups' },
                    { name: 'Get One', value: 'getOne', action: 'Get group details' },
                    { name: 'Create', value: 'create', action: 'Create group' },
                    { name: 'Update Subject', value: 'updateSubject', action: 'Update group subject' },
                    { name: 'Update Description', value: 'updateDescription', action: 'Update description' },
                    { name: 'Update Settings', value: 'updateSettings', action: 'Update group settings' },
                    { name: 'Update Members', value: 'updateMembers', action: 'Add or remove members' },
                    { name: 'Leave', value: 'leave', action: 'Leave group' },
                    { name: 'Get Invite', value: 'getInvite', action: 'Get invite link' },
                    { name: 'Reset Invite', value: 'resetInvite', action: 'Reset invite link' },
                    { name: 'Accept Invite', value: 'acceptInvite', action: 'Accept invite' },
                    { name: 'Update Picture', value: 'updatePicture', action: 'Update group picture' },
                    { name: 'Delete Picture', value: 'deletePicture', action: 'Delete group picture' },
                    { name: 'Set Ephemeral', value: 'setEphemeral', action: 'Set disappearing msgs' },
                ],
                default: 'getAll',
            },
            // ===== CONTACT OPERATIONS =====
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
            // ===== PROFILE OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['profile'] } },
                options: [
                    { name: 'Get', value: 'get', action: 'Get profile' },
                    { name: 'Update Name', value: 'updateName', action: 'Update display name' },
                    { name: 'Update Status', value: 'updateStatus', action: 'Update status text' },
                    { name: 'Update Picture', value: 'updatePicture', action: 'Update profile picture' },
                    { name: 'Delete Picture', value: 'deletePicture', action: 'Delete profile picture' },
                ],
                default: 'get',
            },
            // ===== AUTOREPLY OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['autoreply'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get auto replies' },
                    { name: 'Create', value: 'create', action: 'Create auto reply' },
                    { name: 'Delete All', value: 'deleteAll', action: 'Delete all auto replies' },
                    { name: 'Delete One', value: 'deleteOne', action: 'Delete auto reply' },
                ],
                default: 'getAll',
            },
            // ===== SCHEDULER OPERATIONS =====
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
            // ===== WEBHOOK OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['webhook'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get webhooks' },
                    { name: 'Create', value: 'create', action: 'Create webhook' },
                    { name: 'Update', value: 'update', action: 'Update webhook' },
                    { name: 'Delete', value: 'delete', action: 'Delete webhook' },
                ],
                default: 'getAll',
            },
            // ===== LABEL OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['label'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get all labels' },
                    { name: 'Create', value: 'create', action: 'Create label' },
                    { name: 'Update', value: 'update', action: 'Update label' },
                    { name: 'Delete', value: 'delete', action: 'Delete label' },
                    { name: 'Get Chat Labels', value: 'getChatLabels', action: 'Get labels of a chat' },
                    { name: 'Set Chat Labels', value: 'setChatLabels', action: 'Set labels on a chat' },
                    { name: 'Get Chats By Label', value: 'getChatsByLabel', action: 'Get chats by label' },
                ],
                default: 'getAll',
            },
            // ===== USER OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['user'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get all users' },
                    { name: 'Create', value: 'create', action: 'Create user' },
                    { name: 'Update', value: 'update', action: 'Update user' },
                    { name: 'Delete', value: 'delete', action: 'Delete user' },
                    { name: 'Get API Key', value: 'getApiKey', action: 'Get API key' },
                    { name: 'Generate API Key', value: 'generateApiKey', action: 'Generate API key' },
                    { name: 'Delete API Key', value: 'deleteApiKey', action: 'Delete API key' },
                ],
                default: 'getAll',
            },
            // ===== NOTIFICATION OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['notification'] } },
                options: [
                    { name: 'Get All', value: 'getAll', action: 'Get notifications' },
                    { name: 'Create', value: 'create', action: 'Create notification' },
                    { name: 'Mark Read', value: 'markRead', action: 'Mark as read' },
                    { name: 'Delete', value: 'delete', action: 'Delete notifications' },
                ],
                default: 'getAll',
            },
            // ===== STATUS UPDATE OPERATIONS =====
            {
                displayName: 'Operation', name: 'operation', type: 'options', noDataExpression: true,
                displayOptions: { show: { resource: ['status'] } },
                options: [
                    { name: 'Post Status', value: 'post', action: 'Post status update' },
                ],
                default: 'post',
            },
            // ===== SYSTEM OPERATIONS =====
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

            // ==================== COMMON PARAMETERS ====================
            {
                displayName: 'Session ID', name: 'sessionId', type: 'string', required: true, default: '',
                description: 'The Session ID to use for this request',
                displayOptions: { show: { resource: ['message', 'chat', 'group', 'contact', 'profile', 'autoreply', 'scheduler', 'webhook', 'label', 'status'] } },
            },
            {
                displayName: 'Recipient JID', name: 'jid', type: 'string', required: true, default: '',
                description: 'WhatsApp JID of the recipient (e.g., 628xxx@s.whatsapp.net for a user, xxxxx@g.us for a group)',
                displayOptions: { show: { resource: ['message'], operation: ['sendText', 'sendMedia', 'sendLocation', 'sendContact', 'sendPoll', 'sendList', 'sendSticker', 'reply', 'react', 'star', 'delete', 'spam'] } },
            },
            {
                displayName: 'Chat JID', name: 'jid', type: 'string', required: true, default: '',
                description: 'WhatsApp JID of the chat or contact',
                displayOptions: { show: { resource: ['chat'], operation: ['getOne', 'read', 'archive', 'mute', 'pin', 'presence', 'profilePic'] } },
            },
            {
                displayName: 'Group JID', name: 'jid', type: 'string', required: true, default: '',
                description: 'WhatsApp JID of the group (e.g., xxxxx@g.us)',
                displayOptions: { show: { resource: ['group'], operation: ['getOne', 'updateSubject', 'updateDescription', 'updateSettings', 'updateMembers', 'leave', 'getInvite', 'resetInvite', 'updatePicture', 'deletePicture', 'setEphemeral'] } },
            },
            {
                displayName: 'Contact JID', name: 'jid', type: 'string', required: true, default: '',
                description: 'WhatsApp JID of the contact to block/unblock',
                displayOptions: { show: { resource: ['contact'], operation: ['block', 'unblock'] } },
            },

            // ===== MESSAGE-SPECIFIC PARAMS =====
            { displayName: 'Text Message', name: 'text', type: 'string', typeOptions: { rows: 4 }, required: true, default: '', description: 'The text message payload to send', displayOptions: { show: { resource: ['message'], operation: ['sendText'] } } },
            {
                displayName: 'Mentions',
                name: 'mentions',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add JIDs to mention in the message',
                displayOptions: { show: { resource: ['message'], operation: ['sendText', 'reply'] } },
                options: [
                    {
                        name: 'mentionValues',
                        displayName: 'Mention',
                        values: [
                            {
                                displayName: 'JID',
                                name: 'jid',
                                type: 'string',
                                default: '',
                                description: 'JID to mention (e.g., 62812xxx@s.whatsapp.net)',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Media URL', name: 'mediaUrl', type: 'string', required: true, default: '', description: 'Direct URL to the image, video, audio, or document', displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } } },
            { displayName: 'Caption (Optional)', name: 'caption', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'Text caption to accompany the media', displayOptions: { show: { resource: ['message'], operation: ['sendMedia'] } } },
            { displayName: 'Latitude', name: 'latitude', type: 'number', required: true, default: 0, description: 'Latitude coordinate (e.g. -6.2088)', displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } } },
            { displayName: 'Longitude', name: 'longitude', type: 'number', required: true, default: 0, description: 'Longitude coordinate (e.g. 106.8456)', displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } } },
            { displayName: 'Location Name (Optional)', name: 'locationName', type: 'string', default: '', description: 'Display name of the place', displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } } },
            { displayName: 'Address (Optional)', name: 'address', type: 'string', default: '', description: 'Address string of the place', displayOptions: { show: { resource: ['message'], operation: ['sendLocation'] } } },
            {
                displayName: 'Contacts',
                name: 'contacts',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add contacts to send',
                displayOptions: { show: { resource: ['message'], operation: ['sendContact'] } },
                options: [
                    {
                        name: 'contactValues',
                        displayName: 'Contact',
                        values: [
                            {
                                displayName: 'Display Name',
                                name: 'displayName',
                                type: 'string',
                                default: '',
                                description: 'Name of the contact',
                            },
                            {
                                displayName: 'vCard',
                                name: 'vcard',
                                type: 'string',
                                typeOptions: { rows: 4 },
                                default: 'BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nTEL;type=CELL;type=VOICE;waid=1234567890:+1 234 567 890\nEND:VCARD',
                                description: 'The vCard string format',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Poll Question', name: 'question', type: 'string', typeOptions: { rows: 2 }, required: true, default: '', description: 'The question to ask in the poll', displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } } },
            {
                displayName: 'Poll Options',
                name: 'pollOptions',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add options for the poll',
                displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } },
                options: [
                    {
                        name: 'optionValues',
                        displayName: 'Option',
                        values: [
                            {
                                displayName: 'Option Text',
                                name: 'text',
                                type: 'string',
                                default: '',
                                description: 'Text for the poll option',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Selectable Count (Optional)', name: 'selectableCount', type: 'number', default: 1, description: 'Number of options a user is allowed to select', displayOptions: { show: { resource: ['message'], operation: ['sendPoll'] } } },
            {
                displayName: 'List Title',
                name: 'listTitle',
                type: 'string',
                required: true,
                default: '',
                description: 'Main title of the list message',
                displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
            },
            {
                displayName: 'List Description (Optional)',
                name: 'listDescription',
                type: 'string',
                typeOptions: { rows: 4 },
                default: '',
                displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
            },
            {
                displayName: 'Button Text',
                name: 'listButtonText',
                type: 'string',
                required: true,
                default: 'Click Here',
                displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
            },
            {
                displayName: 'List Sections',
                name: 'listSections',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add sections and their rows',
                displayOptions: { show: { resource: ['message'], operation: ['sendList'] } },
                options: [
                    {
                        name: 'sectionValues',
                        displayName: 'Section',
                        values: [
                            {
                                displayName: 'Section Title',
                                name: 'title',
                                type: 'string',
                                default: '',
                            },
                            {
                                displayName: 'Rows (JSON)',
                                name: 'rows',
                                type: 'string',
                                default: '[{"title": "Row Title", "rowId": "row1", "description": "Row desc"}]',
                                description: 'JSON array of rows for this section',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Sticker URL', name: 'stickerUrl', type: 'string', required: true, default: '', description: 'Direct URL to a WebP or compatible image to turn into a sticker', displayOptions: { show: { resource: ['message'], operation: ['sendSticker'] } } },
            { displayName: 'Sticker Pack Name (Optional)', name: 'packName', type: 'string', default: 'WA-AKG', description: 'Name of the sticker pack metadata', displayOptions: { show: { resource: ['message'], operation: ['sendSticker'] } } },
            { displayName: 'Sticker Author (Optional)', name: 'stickerAuthor', type: 'string', default: '', description: 'Author metadata on the sticker', displayOptions: { show: { resource: ['message'], operation: ['sendSticker'] } } },
            { displayName: 'Target Message ID', name: 'messageId', type: 'string', required: true, default: '', description: 'The ID of the message to target', displayOptions: { show: { resource: ['message'], operation: ['reply', 'react', 'star', 'delete', 'downloadMedia'] } } },
            { displayName: 'Reply Text', name: 'replyText', type: 'string', typeOptions: { rows: 4 }, required: true, default: '', description: 'The text content of your reply', displayOptions: { show: { resource: ['message'], operation: ['reply'] } } },
            { displayName: 'Emoji Reaction', name: 'emoji', type: 'string', required: true, default: '', description: 'Emoji character to react with. Leave empty to remove an existing reaction.', displayOptions: { show: { resource: ['message'], operation: ['react'] } } },
            { displayName: 'Star Status', name: 'starValue', type: 'boolean', default: true, description: 'True to star, False to unstar', displayOptions: { show: { resource: ['message'], operation: ['star'] } } },
            { displayName: 'Target JID (To)', name: 'forwardToJid', type: 'string', required: true, default: '', description: 'JID of the recipient you are forwarding to', displayOptions: { show: { resource: ['message'], operation: ['forward'] } } },
            { displayName: 'Message ID to Forward', name: 'forwardMessageId', type: 'string', required: true, default: '', description: 'The ID of the message to forward', displayOptions: { show: { resource: ['message'], operation: ['forward'] } } },
            { displayName: 'Source JID (From)', name: 'forwardFromJid', type: 'string', required: true, default: '', description: 'JID of the chat containing the original message', displayOptions: { show: { resource: ['message'], operation: ['forward'] } } },
            {
                displayName: 'Recipients',
                name: 'recipients',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add recipient JIDs for the broadcast',
                displayOptions: { show: { resource: ['message'], operation: ['broadcast'] } },
                options: [
                    {
                        name: 'recipientValues',
                        displayName: 'Recipient',
                        values: [
                            {
                                displayName: 'JID',
                                name: 'jid',
                                type: 'string',
                                default: '',
                                description: 'JID to send to',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Broadcast Message', name: 'broadcastMsg', type: 'string', typeOptions: { rows: 4 }, required: true, default: '', description: 'The text message to broadcast to all recipients', displayOptions: { show: { resource: ['message'], operation: ['broadcast'] } } },
            { displayName: 'Search Query (Optional)', name: 'searchQuery', type: 'string', default: '', description: 'Text string to search for in messages', displayOptions: { show: { resource: ['message'], operation: ['search'] } } },
            { displayName: 'Filter by JID (Optional)', name: 'filterJid', type: 'string', default: '', description: 'JID to restrict the search to a specific chat', displayOptions: { show: { resource: ['message'], operation: ['search'] } } },

            // ===== SESSION PARAMS =====
            { displayName: 'Target Session ID', name: 'targetSessionId', type: 'string', required: true, default: '', description: 'The ID of the session you want to manage', displayOptions: { show: { resource: ['session'], operation: ['getOne', 'action', 'getQr', 'updateSettings', 'delete', 'getBotConfig', 'updateBotConfig'] } } },
            { displayName: 'Session Name', name: 'sessionName', type: 'string', required: true, default: '', description: 'A readable name for the new session', displayOptions: { show: { resource: ['session'], operation: ['create'] } } },
            { displayName: 'Custom Session ID (Optional)', name: 'newSessionId', type: 'string', default: '', description: 'Manually override the generated Session ID', displayOptions: { show: { resource: ['session'], operation: ['create'] } } },
            { displayName: 'Session Action', name: 'sessionAction', type: 'options', required: true, options: [{ name: 'Start', value: 'start' }, { name: 'Stop', value: 'stop' }, { name: 'Restart', value: 'restart' }, { name: 'Logout', value: 'logout' }], default: 'start', description: 'The power action to perform on the session', displayOptions: { show: { resource: ['session'], operation: ['action'] } } },
            { displayName: 'Bot Config (JSON) (Optional)', name: 'botConfig', type: 'string', default: '', description: 'JSON object containing bot configuration parameters', displayOptions: { show: { resource: ['session'], operation: ['updateBotConfig'] } } },
            { displayName: 'Settings (JSON) (Optional)', name: 'sessionSettings', type: 'string', default: '', description: 'JSON object containing session settings updates', displayOptions: { show: { resource: ['session'], operation: ['updateSettings'] } } },

            // ===== CHAT PARAMS =====
            {
                displayName: 'Phone Numbers',
                name: 'numbers',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add phone numbers to check',
                displayOptions: { show: { resource: ['chat'], operation: ['check'] } },
                options: [
                    {
                        name: 'numberValues',
                        displayName: 'Number',
                        values: [
                            {
                                displayName: 'Phone Number',
                                name: 'number',
                                type: 'string',
                                default: '',
                                description: 'Number to check (e.g., 628123456789)',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Presence Type', name: 'presenceType', type: 'options', options: [{ name: 'Composing (Typing)', value: 'composing' }, { name: 'Recording (Audio)', value: 'recording' }, { name: 'Paused (Stop)', value: 'paused' }], default: 'composing', description: 'The status indicator to show in the target chat', displayOptions: { show: { resource: ['chat'], operation: ['presence'] } } },

            // ===== GROUP PARAMS =====
            { displayName: 'Group Subject (Name)', name: 'groupSubject', type: 'string', required: true, default: '', description: 'The display name/title for the group', displayOptions: { show: { resource: ['group'], operation: ['create', 'updateSubject'] } } },
            {
                displayName: 'Participants',
                name: 'participants',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add participant JIDs',
                displayOptions: { show: { resource: ['group'], operation: ['create', 'updateMembers'] } },
                options: [
                    {
                        name: 'participantValues',
                        displayName: 'Participant',
                        values: [
                            {
                                displayName: 'JID',
                                name: 'jid',
                                type: 'string',
                                default: '',
                                description: 'Participant JID',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Group Description (Optional)', name: 'groupDescription', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'The text description for the group', displayOptions: { show: { resource: ['group'], operation: ['updateDescription'] } } },
            { displayName: 'Member Action', name: 'memberAction', type: 'options', options: [{ name: 'Add Members', value: 'add' }, { name: 'Remove Members', value: 'remove' }, { name: 'Promote to Admin', value: 'promote' }, { name: 'Demote to Member', value: 'demote' }], default: 'add', description: 'The action to perform on the target participants', displayOptions: { show: { resource: ['group'], operation: ['updateMembers'] } } },
            { displayName: 'Invite Code', name: 'inviteCode', type: 'string', required: true, default: '', description: 'The WhatsApp group invite string, usually found at the end of chat.whatsapp.com/...', displayOptions: { show: { resource: ['group'], operation: ['acceptInvite'] } } },
            { displayName: 'Picture URL', name: 'pictureUrl', type: 'string', required: true, default: '', description: 'Direct URL to an image file to set as the group profile picture', displayOptions: { show: { resource: ['group'], operation: ['updatePicture'] } } },
            { displayName: 'Disappearing Expiration (Seconds)', name: 'ephemeralExpiration', type: 'number', default: 86400, description: 'Seconds until messages disappear (e.g. 86400 for 24 hours)', displayOptions: { show: { resource: ['group'], operation: ['setEphemeral'] } } },

            // ===== PROFILE PARAMS =====
            { displayName: 'Display Name', name: 'displayName', type: 'string', required: true, default: '', description: 'The new display name for your profile', displayOptions: { show: { resource: ['profile'], operation: ['updateName'] } } },
            { displayName: 'Status Text', name: 'statusText', type: 'string', typeOptions: { rows: 2 }, required: true, default: '', description: 'The new "About" status text payload', displayOptions: { show: { resource: ['profile'], operation: ['updateStatus'] } } },
            { displayName: 'Picture URL', name: 'profilePicUrl', type: 'string', required: true, default: '', description: 'Direct URL to an image file to set as your profile picture', displayOptions: { show: { resource: ['profile'], operation: ['updatePicture'] } } },

            // ===== WEBHOOK PARAMS =====
            { displayName: 'Webhook ID', name: 'webhookId', type: 'string', required: true, default: '', description: 'The internal ID of the webhook to manage', displayOptions: { show: { resource: ['webhook'], operation: ['update', 'delete'] } } },
            { displayName: 'Webhook URL', name: 'webhookUrl', type: 'string', required: true, default: '', description: 'The endpoint URL that will receive HTTP POST events', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },
            {
                displayName: 'Subscribed Events',
                name: 'webhookEvents',
                type: 'fixedCollection',
                typeOptions: { multipleValues: true },
                default: {},
                description: 'Add events to subscribe to',
                displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } },
                options: [
                    {
                        name: 'eventValues',
                        displayName: 'Event',
                        values: [
                            {
                                displayName: 'Event Name',
                                name: 'event',
                                type: 'options',
                                options: [
                                    { name: 'messages.upsert', value: 'messages.upsert' },
                                    { name: 'messages.update', value: 'messages.update' },
                                    { name: 'message.receipt', value: 'message.receipt' },
                                    { name: 'group-participants.update', value: 'group-participants.update' },
                                    { name: 'groups.upsert', value: 'groups.upsert' },
                                    { name: 'groups.update', value: 'groups.update' },
                                    { name: 'connection.update', value: 'connection.update' },
                                ],
                                default: 'messages.upsert',
                                description: 'The WA-AKG event to subscribe to',
                            },
                        ],
                    },
                ],
            },
            { displayName: 'Webhook Secret (Optional)', name: 'webhookSecret', type: 'string', default: '', description: 'Secret string for HMAC signature verification', displayOptions: { show: { resource: ['webhook'], operation: ['create', 'update'] } } },

            // ===== LABEL PARAMS =====
            { displayName: 'Label ID', name: 'labelId', type: 'string', required: true, default: '', description: 'The internal ID of the label', displayOptions: { show: { resource: ['label'], operation: ['update', 'delete', 'getChatsByLabel'] } } },
            { displayName: 'Label Name', name: 'labelName', type: 'string', required: true, default: '', description: 'Display name color of the label', displayOptions: { show: { resource: ['label'], operation: ['create', 'update'] } } },
            { displayName: 'Color Integer (Optional)', name: 'labelColor', type: 'number', default: 0, description: 'Color representation integer', displayOptions: { show: { resource: ['label'], operation: ['create', 'update'] } } },
            { displayName: 'Chat JID', name: 'chatJid', type: 'string', required: true, default: '', description: 'JID of the chat to add/remove labels', displayOptions: { show: { resource: ['label'], operation: ['getChatLabels', 'setChatLabels'] } } },
            { displayName: 'Label IDs Array (JSON) (Optional)', name: 'labelIds', type: 'string', default: '', description: 'JSON array of Label IDs to enforce. Example: ["1", "3"]', displayOptions: { show: { resource: ['label'], operation: ['setChatLabels'] } } },

            // ===== AUTOREPLY PARAMS =====
            { displayName: 'Auto Reply Config (JSON) (Optional)', name: 'autoReplyData', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'JSON configuration for the auto-reply rule', displayOptions: { show: { resource: ['autoreply'], operation: ['create'] } } },
            { displayName: 'Auto Reply ID', name: 'replyId', type: 'string', required: true, default: '', description: 'The internal ID of the auto reply to delete', displayOptions: { show: { resource: ['autoreply'], operation: ['deleteOne'] } } },

            // ===== SCHEDULER PARAMS =====
            { displayName: 'Schedule Config (JSON) (Optional)', name: 'scheduleData', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'JSON configuration for the scheduled task', displayOptions: { show: { resource: ['scheduler'], operation: ['create'] } } },
            { displayName: 'Schedule Task ID', name: 'scheduleId', type: 'string', required: true, default: '', description: 'The internal ID of the scheduled task to delete', displayOptions: { show: { resource: ['scheduler'], operation: ['deleteOne'] } } },

            // ===== USER PARAMS =====
            { displayName: 'User ID', name: 'userId', type: 'string', required: true, default: '', description: 'The internal ID of the WA-AKG user', displayOptions: { show: { resource: ['user'], operation: ['update', 'delete'] } } },
            { displayName: 'User Metadata (JSON) (Optional)', name: 'userData', type: 'string', default: '', description: 'JSON configuration containing user data attributes', displayOptions: { show: { resource: ['user'], operation: ['create', 'update'] } } },

            // ===== NOTIFICATION PARAMS =====
            { displayName: 'Notification Content (JSON) (Optional)', name: 'notifData', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'JSON payload defining notification details', displayOptions: { show: { resource: ['notification'], operation: ['create'] } } },

            // ===== STATUS PARAMS =====
            { displayName: 'Status Payload (JSON)', name: 'statusContent', type: 'string', typeOptions: { rows: 4 }, required: true, default: '', description: 'JSON object defining text, media, or contact status to post', displayOptions: { show: { resource: ['status'], operation: ['post'] } } },

            // ===== SYSTEM PARAMS =====
            { displayName: 'Settings Updates (JSON) (Optional)', name: 'systemSettings', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'JSON payload of key-value system settings to override', displayOptions: { show: { resource: ['system'], operation: ['updateSettings'] } } },

        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];
        const resource = this.getNodeParameter('resource', 0) as string;
        const operation = this.getNodeParameter('operation', 0) as string;

        for (let i = 0; i < items.length; i++) {
            try {
                let responseData;
                const sessionId = (['message', 'chat', 'group', 'contact', 'profile', 'autoreply', 'scheduler', 'webhook', 'label', 'status'].includes(resource))
                    ? this.getNodeParameter('sessionId', i) as string : '';

                // ==================== MESSAGE ====================
                if (resource === 'message') {
                    const jid = ['sendText', 'sendMedia', 'sendLocation', 'sendContact', 'sendPoll', 'sendList', 'sendSticker', 'reply', 'react', 'star', 'delete', 'spam'].includes(operation)
                        ? this.getNodeParameter('jid', i) as string : '';

                    if (operation === 'sendText') {
                        const text = this.getNodeParameter('text', i) as string;
                        const mentionsData = this.getNodeParameter('mentions', i) as any;
                        const mentions = mentionsData?.mentionValues ? mentionsData.mentionValues.map((m: any) => m.jid) : [];

                        const body: any = { message: { text } };
                        if (mentions.length > 0) body.mentions = mentions;

                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/send`, body);
                    }
                    if (operation === 'sendMedia') {
                        const mediaUrl = this.getNodeParameter('mediaUrl', i) as string;
                        const caption = this.getNodeParameter('caption', i, '') as string;
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/send`, { message: { image: { url: mediaUrl }, caption: caption || undefined } });
                    }
                    if (operation === 'sendLocation') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/location`, {
                            latitude: this.getNodeParameter('latitude', i) as number,
                            longitude: this.getNodeParameter('longitude', i) as number,
                            name: this.getNodeParameter('locationName', i, '') as string || undefined,
                            address: this.getNodeParameter('address', i, '') as string || undefined,
                        });
                    }
                    if (operation === 'sendContact') {
                        const contactsData = this.getNodeParameter('contacts', i) as any;
                        const contacts = contactsData?.contactValues ? contactsData.contactValues : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/contact`, { contacts });
                    }
                    if (operation === 'sendPoll') {
                        const pollOptionsData = this.getNodeParameter('pollOptions', i) as any;
                        const options = pollOptionsData?.optionValues ? pollOptionsData.optionValues.map((o: any) => o.text) : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/poll`, {
                            question: this.getNodeParameter('question', i) as string,
                            options: options,
                            selectableCount: this.getNodeParameter('selectableCount', i, 1) as number,
                        });
                    }
                    if (operation === 'sendList') {
                        const sectionsData = this.getNodeParameter('listSections', i) as any;

                        const sections = sectionsData?.sectionValues ? sectionsData.sectionValues.map((s: any) => {
                            let rows = [];
                            try { rows = JSON.parse(s.rows); } catch (e) { }
                            return { title: s.title, rows: rows };
                        }) : [];

                        const listMsg = {
                            title: this.getNodeParameter('listTitle', i) as string,
                            description: this.getNodeParameter('listDescription', i, '') as string,
                            buttonText: this.getNodeParameter('listButtonText', i) as string,
                            sections: sections
                        };
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/list`, listMsg);
                    }
                    if (operation === 'sendSticker') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/sticker`, {
                            url: this.getNodeParameter('stickerUrl', i) as string,
                            pack: this.getNodeParameter('packName', i, '') as string,
                            author: this.getNodeParameter('stickerAuthor', i, '') as string,
                        });
                    }
                    if (operation === 'reply') {
                        const msgId = this.getNodeParameter('messageId', i) as string;
                        const replyText = this.getNodeParameter('replyText', i) as string;
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${msgId}/reply`, { message: { text: replyText } });
                    }
                    if (operation === 'react') {
                        const msgId = this.getNodeParameter('messageId', i) as string;
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${msgId}/react`, { emoji: this.getNodeParameter('emoji', i) as string });
                    }
                    if (operation === 'star') {
                        const msgId = this.getNodeParameter('messageId', i) as string;
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${msgId}/star`, { star: this.getNodeParameter('starValue', i) as boolean });
                    }
                    if (operation === 'delete') {
                        const msgId = this.getNodeParameter('messageId', i) as string;
                        responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/messages/${sessionId}/${jid}/${msgId}`);
                    }
                    if (operation === 'forward') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/forward`, {
                            to: this.getNodeParameter('forwardToJid', i) as string,
                            messageId: this.getNodeParameter('forwardMessageId', i) as string,
                            jid: this.getNodeParameter('forwardFromJid', i) as string,
                        });
                    }
                    if (operation === 'broadcast') {
                        const recipientsData = this.getNodeParameter('recipients', i) as any;
                        const recipients = recipientsData?.recipientValues ? recipientsData.recipientValues.map((r: any) => r.jid) : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/broadcast`, {
                            recipients: recipients,
                            message: this.getNodeParameter('broadcastMsg', i) as string,
                        });
                    }
                    if (operation === 'search') {
                        const qs: any = {};
                        const q = this.getNodeParameter('searchQuery', i, '') as string;
                        const fJid = this.getNodeParameter('filterJid', i, '') as string;
                        if (q) qs.q = q;
                        if (fJid) qs.jid = fJid;
                        responseData = await waAkgApiRequest.call(this, 'GET', `/api/messages/${sessionId}/search`, {}, qs);
                    }
                    if (operation === 'downloadMedia') {
                        const msgId = this.getNodeParameter('messageId', i) as string;
                        responseData = await waAkgApiRequest.call(this, 'GET', `/api/messages/${sessionId}/download/${msgId}/media`);
                    }
                    if (operation === 'spam') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/spam`);
                    }
                }

                // ==================== SESSION ====================
                if (resource === 'session') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', '/api/sessions');
                    if (operation === 'getOne') responseData = await waAkgApiRequest.call(this, 'GET', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}`);
                    if (operation === 'create') {
                        const body: any = { name: this.getNodeParameter('sessionName', i) as string };
                        const sid = this.getNodeParameter('newSessionId', i, '') as string;
                        if (sid) body.sessionId = sid;
                        responseData = await waAkgApiRequest.call(this, 'POST', '/api/sessions', body);
                    }
                    if (operation === 'action') responseData = await waAkgApiRequest.call(this, 'POST', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/${this.getNodeParameter('sessionAction', i)}`);
                    if (operation === 'getQr') responseData = await waAkgApiRequest.call(this, 'GET', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/qr`);
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'PATCH', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/settings`, JSON.parse(this.getNodeParameter('sessionSettings', i, '{}') as string));
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/settings`);
                    if (operation === 'getBotConfig') responseData = await waAkgApiRequest.call(this, 'GET', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/bot-config`);
                    if (operation === 'updateBotConfig') responseData = await waAkgApiRequest.call(this, 'POST', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/bot-config`, JSON.parse(this.getNodeParameter('botConfig', i, '{}') as string));
                }

                // ==================== CHAT ====================
                if (resource === 'chat') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chat/${sessionId}`);
                    if (operation === 'getOne') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}`);
                    if (operation === 'check') {
                        const numbersData = this.getNodeParameter('numbers', i) as any;
                        const numbers = numbersData?.numberValues ? numbersData.numberValues.map((n: any) => n.number) : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/chat/${sessionId}/check`, { numbers: numbers });
                    }
                    if (operation === 'read') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/read`);
                    if (operation === 'archive') responseData = await waAkgApiRequest.call(this, 'POST', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/archive`);
                    if (operation === 'mute') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/mute`);
                    if (operation === 'pin') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/pin`);
                    if (operation === 'presence') responseData = await waAkgApiRequest.call(this, 'POST', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/presence`, { type: this.getNodeParameter('presenceType', i) as string });
                    if (operation === 'profilePic') responseData = await waAkgApiRequest.call(this, 'POST', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}/profile-picture`);
                }

                // ==================== GROUP ====================
                if (resource === 'group') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/groups/${sessionId}`);
                    if (operation === 'getOne') responseData = await waAkgApiRequest.call(this, 'GET', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}`);
                    if (operation === 'create') {
                        const participantsData = this.getNodeParameter('participants', i) as any;
                        const participants = participantsData?.participantValues ? participantsData.participantValues.map((p: any) => p.jid) : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/create`, { subject: this.getNodeParameter('groupSubject', i), participants: participants });
                    }
                    if (operation === 'updateSubject') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/subject`, { subject: this.getNodeParameter('groupSubject', i) });
                    if (operation === 'updateDescription') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/description`, { description: this.getNodeParameter('groupDescription', i) });
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/settings`);
                    if (operation === 'updateMembers') {
                        const participantsData = this.getNodeParameter('participants', i) as any;
                        const participants = participantsData?.participantValues ? participantsData.participantValues.map((p: any) => p.jid) : [];
                        responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/members`, { action: this.getNodeParameter('memberAction', i), participants: participants });
                    }
                    if (operation === 'leave') responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/leave`);
                    if (operation === 'getInvite') responseData = await waAkgApiRequest.call(this, 'GET', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/invite`);
                    if (operation === 'resetInvite') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/invite`);
                    if (operation === 'acceptInvite') responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/invite/accept`, { code: this.getNodeParameter('inviteCode', i) });
                    if (operation === 'updatePicture') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/picture`, { url: this.getNodeParameter('pictureUrl', i) });
                    if (operation === 'deletePicture') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/picture`);
                    if (operation === 'setEphemeral') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/ephemeral`, { expiration: this.getNodeParameter('ephemeralExpiration', i) });
                }

                // ==================== CONTACT ====================
                if (resource === 'contact') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/contacts/${sessionId}`);
                    if (operation === 'block') responseData = await waAkgApiRequest.call(this, 'POST', `/api/contacts/${sessionId}/${this.getNodeParameter('jid', i)}/block`);
                    if (operation === 'unblock') responseData = await waAkgApiRequest.call(this, 'POST', `/api/contacts/${sessionId}/${this.getNodeParameter('jid', i)}/unblock`);
                }

                // ==================== PROFILE ====================
                if (resource === 'profile') {
                    if (operation === 'get') responseData = await waAkgApiRequest.call(this, 'GET', `/api/profile/${sessionId}`);
                    if (operation === 'updateName') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/profile/${sessionId}/name`, { name: this.getNodeParameter('displayName', i) });
                    if (operation === 'updateStatus') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/profile/${sessionId}/status`, { status: this.getNodeParameter('statusText', i) });
                    if (operation === 'updatePicture') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/profile/${sessionId}/picture`, { url: this.getNodeParameter('profilePicUrl', i) });
                    if (operation === 'deletePicture') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/profile/${sessionId}/picture`);
                }

                // ==================== AUTOREPLY ====================
                if (resource === 'autoreply') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/autoreplies/${sessionId}`);
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', `/api/autoreplies/${sessionId}`, JSON.parse(this.getNodeParameter('autoReplyData', i, '{}') as string));
                    if (operation === 'deleteAll') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/autoreplies/${sessionId}`);
                    if (operation === 'deleteOne') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/autoreplies/${sessionId}/${this.getNodeParameter('replyId', i)}`);
                }

                // ==================== SCHEDULER ====================
                if (resource === 'scheduler') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/scheduler/${sessionId}`);
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', `/api/scheduler/${sessionId}`, JSON.parse(this.getNodeParameter('scheduleData', i, '{}') as string));
                    if (operation === 'deleteAll') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/scheduler/${sessionId}`);
                    if (operation === 'deleteOne') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/scheduler/${sessionId}/${this.getNodeParameter('scheduleId', i)}`);
                }

                // ==================== WEBHOOK ====================
                if (resource === 'webhook') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/webhooks/${sessionId}`);
                    if (operation === 'create') {
                        const eventsData = this.getNodeParameter('webhookEvents', i) as any;
                        const events = eventsData?.eventValues ? eventsData.eventValues.map((e: any) => e.event) : [];
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/webhooks/${sessionId}`, { url: this.getNodeParameter('webhookUrl', i), events: events, secret: this.getNodeParameter('webhookSecret', i, '') });
                    }
                    if (operation === 'update') {
                        const eventsData = this.getNodeParameter('webhookEvents', i) as any;
                        const events = eventsData?.eventValues ? eventsData.eventValues.map((e: any) => e.event) : [];
                        responseData = await waAkgApiRequest.call(this, 'PUT', `/api/webhooks/${sessionId}/${this.getNodeParameter('webhookId', i)}`, { url: this.getNodeParameter('webhookUrl', i), events: events, secret: this.getNodeParameter('webhookSecret', i, '') });
                    }
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/webhooks/${sessionId}/${this.getNodeParameter('webhookId', i)}`);
                }

                // ==================== LABEL ====================
                if (resource === 'label') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/labels/${sessionId}`);
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', `/api/labels/${sessionId}`, { name: this.getNodeParameter('labelName', i), color: this.getNodeParameter('labelColor', i) });
                    if (operation === 'update') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/labels/${sessionId}/${this.getNodeParameter('labelId', i)}`, { name: this.getNodeParameter('labelName', i), color: this.getNodeParameter('labelColor', i) });
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/labels/${sessionId}/${this.getNodeParameter('labelId', i)}`);
                    if (operation === 'getChatLabels') responseData = await waAkgApiRequest.call(this, 'GET', `/api/labels/${sessionId}/chat/${this.getNodeParameter('chatJid', i)}/labels`);
                    if (operation === 'setChatLabels') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/labels/${sessionId}/chat/${this.getNodeParameter('chatJid', i)}/labels`, { labelIds: JSON.parse(this.getNodeParameter('labelIds', i, '[]') as string) });
                    if (operation === 'getChatsByLabel') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chats/${sessionId}/by-label/${this.getNodeParameter('labelId', i)}`);
                }

                // ==================== USER ====================
                if (resource === 'user') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', '/api/users');
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', '/api/users', JSON.parse(this.getNodeParameter('userData', i, '{}') as string));
                    if (operation === 'update') responseData = await waAkgApiRequest.call(this, 'PATCH', `/api/users/${this.getNodeParameter('userId', i)}`, JSON.parse(this.getNodeParameter('userData', i, '{}') as string));
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/users/${this.getNodeParameter('userId', i)}`);
                    if (operation === 'getApiKey') responseData = await waAkgApiRequest.call(this, 'GET', '/api/user/api-key');
                    if (operation === 'generateApiKey') responseData = await waAkgApiRequest.call(this, 'POST', '/api/user/api-key');
                    if (operation === 'deleteApiKey') responseData = await waAkgApiRequest.call(this, 'DELETE', '/api/user/api-key');
                }

                // ==================== NOTIFICATION ====================
                if (resource === 'notification') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', '/api/notifications');
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', '/api/notifications', JSON.parse(this.getNodeParameter('notifData', i, '{}') as string));
                    if (operation === 'markRead') responseData = await waAkgApiRequest.call(this, 'PATCH', '/api/notifications/read');
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', '/api/notifications/delete');
                }

                // ==================== STATUS ====================
                if (resource === 'status') {
                    if (operation === 'post') responseData = await waAkgApiRequest.call(this, 'POST', `/api/status/${sessionId}/update`, JSON.parse(this.getNodeParameter('statusContent', i) as string));
                }

                // ==================== SYSTEM ====================
                if (resource === 'system') {
                    if (operation === 'getSettings') responseData = await waAkgApiRequest.call(this, 'GET', '/api/settings/system');
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'POST', '/api/settings/system', JSON.parse(this.getNodeParameter('systemSettings', i, '{}') as string));
                    if (operation === 'checkUpdates') responseData = await waAkgApiRequest.call(this, 'POST', '/api/system/check-updates');
                }

                const executionData = this.helpers.constructExecutionMetaData(
                    this.helpers.returnJsonArray(responseData ?? { success: true }),
                    { itemData: { item: i } },
                );
                returnData.push(...executionData);

            } catch (error: any) {
                if (this.continueOnFail()) {
                    returnData.push(...this.helpers.constructExecutionMetaData(
                        this.helpers.returnJsonArray({ error: error.message }),
                        { itemData: { item: i } },
                    ));
                    continue;
                }
                throw error;
            }
        }
        return [returnData];
    }
}
