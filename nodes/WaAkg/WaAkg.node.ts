import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { waAkgApiRequest } from './GenericFunctions';
import * as descriptions from './descriptions';

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

            // ===== OPERATIONS =====
            ...descriptions.messageOperations,
            ...descriptions.sessionOperations,
            ...descriptions.chatOperations,
            ...descriptions.groupOperations,
            ...descriptions.contactOperations,
            ...descriptions.profileOperations,
            ...descriptions.autoreplyOperations,
            ...descriptions.schedulerOperations,
            ...descriptions.webhookOperations,
            ...descriptions.labelOperations,
            ...descriptions.userOperations,
            ...descriptions.notificationOperations,
            ...descriptions.statusOperations,
            ...descriptions.systemOperations,

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

            // ===== FIELDS =====
            ...descriptions.messageFields,
            ...descriptions.sessionFields,
            ...descriptions.chatFields,
            ...descriptions.groupFields,
            ...descriptions.contactFields,
            ...descriptions.profileFields,
            ...descriptions.autoreplyFields,
            ...descriptions.schedulerFields,
            ...descriptions.webhookFields,
            ...descriptions.labelFields,
            ...descriptions.userFields,
            ...descriptions.notificationFields,
            ...descriptions.statusFields,
            ...descriptions.systemFields,
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

                const additionalFields = this.getNodeParameter('additionalFields', i, {}) as any;

                // Utility mapper for comma separated values
                const toArray = (val: string) => val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];
                // Utility mapper for Key-Value dynamic arrays back to standard Objects
                const mapProps = (collection: any) => {
                    if (!collection || !collection.propertyValues) return {};
                    return collection.propertyValues.reduce((acc: any, curr: any) => {
                        try { acc[curr.name] = JSON.parse(curr.value); }
                        catch (_) { acc[curr.name] = curr.value; }
                        return acc;
                    }, {});
                };

                // ==================== MESSAGE ====================
                if (resource === 'message') {
                    const jid = ['sendText', 'sendMedia', 'sendLocation', 'sendContact', 'sendPoll', 'sendList', 'sendSticker', 'reply', 'react', 'star', 'delete', 'spam'].includes(operation)
                        ? this.getNodeParameter('jid', i) as string : '';

                    if (operation === 'sendText') {
                        const body: any = { message: { text: this.getNodeParameter('text', i) as string } };
                        if (additionalFields.mentions) body.mentions = toArray(additionalFields.mentions);
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/send`, body);
                    }
                    if (operation === 'sendMedia') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/send`, {
                            message: {
                                image: { url: this.getNodeParameter('mediaUrl', i) as string },
                                caption: additionalFields.caption || undefined
                            }
                        });
                    }
                    if (operation === 'sendLocation') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/location`, {
                            latitude: this.getNodeParameter('latitude', i) as number,
                            longitude: this.getNodeParameter('longitude', i) as number,
                            name: additionalFields.locationName || undefined,
                            address: additionalFields.address || undefined,
                        });
                    }
                    if (operation === 'sendContact') {
                        const contactsStr = this.getNodeParameter('contacts', i) as string;
                        let contacts = [];
                        try { contacts = JSON.parse(contactsStr); } catch (e) { throw new Error('Invalid JSON array for Contacts'); }
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/contact`, { contacts });
                    }
                    if (operation === 'sendPoll') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/poll`, {
                            question: this.getNodeParameter('question', i) as string,
                            options: toArray(this.getNodeParameter('pollOptions', i) as string),
                            selectableCount: additionalFields.selectableCount ?? 1,
                        });
                    }
                    if (operation === 'sendList') {
                        let sections = [];
                        try { sections = JSON.parse(this.getNodeParameter('listSections', i) as string); } catch (e) { throw new Error('Invalid JSON array for List Sections'); }

                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/list`, {
                            title: this.getNodeParameter('listTitle', i) as string,
                            description: additionalFields.listDescription || undefined,
                            buttonText: this.getNodeParameter('listButtonText', i) as string,
                            sections: sections
                        });
                    }
                    if (operation === 'sendSticker') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/sticker`, {
                            url: this.getNodeParameter('stickerUrl', i) as string,
                            pack: additionalFields.packName || undefined,
                            author: additionalFields.stickerAuthor || undefined,
                        });
                    }
                    if (operation === 'reply') {
                        const body: any = { message: { text: this.getNodeParameter('replyText', i) as string } };
                        if (additionalFields.mentions) body.mentions = toArray(additionalFields.mentions);
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${this.getNodeParameter('messageId', i) as string}/reply`, body);
                    }
                    if (operation === 'react') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${this.getNodeParameter('messageId', i) as string}/react`, {
                            emoji: this.getNodeParameter('emoji', i) as string
                        });
                    }
                    if (operation === 'star') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/${jid}/${this.getNodeParameter('messageId', i) as string}/star`, {
                            star: this.getNodeParameter('starValue', i) as boolean
                        });
                    }
                    if (operation === 'delete') {
                        responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/messages/${sessionId}/${jid}/${this.getNodeParameter('messageId', i) as string}`);
                    }
                    if (operation === 'forward') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/forward`, {
                            to: this.getNodeParameter('forwardToJid', i) as string,
                            messageId: this.getNodeParameter('forwardMessageId', i) as string,
                            jid: this.getNodeParameter('forwardFromJid', i) as string,
                        });
                    }
                    if (operation === 'broadcast') {
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/messages/${sessionId}/broadcast`, {
                            recipients: toArray(this.getNodeParameter('recipients', i) as string),
                            message: this.getNodeParameter('broadcastMsg', i) as string,
                        });
                    }
                    if (operation === 'search') {
                        const qs: any = {};
                        if (additionalFields.searchQuery) qs.q = additionalFields.searchQuery;
                        if (additionalFields.filterJid) qs.jid = additionalFields.filterJid;
                        responseData = await waAkgApiRequest.call(this, 'GET', `/api/messages/${sessionId}/search`, {}, qs);
                    }
                    if (operation === 'downloadMedia') {
                        responseData = await waAkgApiRequest.call(this, 'GET', `/api/messages/${sessionId}/download/${this.getNodeParameter('messageId', i) as string}/media`);
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
                        if (additionalFields.newSessionId) body.sessionId = additionalFields.newSessionId;
                        responseData = await waAkgApiRequest.call(this, 'POST', '/api/sessions', body);
                    }
                    if (operation === 'action') responseData = await waAkgApiRequest.call(this, 'POST', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/${this.getNodeParameter('sessionAction', i)}`);
                    if (operation === 'getQr') responseData = await waAkgApiRequest.call(this, 'GET', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/qr`);
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'PATCH', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/settings`, mapProps(this.getNodeParameter('sessionSettings', i) as any));
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/settings`);
                    if (operation === 'getBotConfig') responseData = await waAkgApiRequest.call(this, 'GET', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/bot-config`);
                    if (operation === 'updateBotConfig') responseData = await waAkgApiRequest.call(this, 'POST', `/api/sessions/${this.getNodeParameter('targetSessionId', i)}/bot-config`, mapProps(this.getNodeParameter('botConfig', i) as any));
                }

                // ==================== CHAT ====================
                if (resource === 'chat') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chat/${sessionId}`);
                    if (operation === 'getOne') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chat/${sessionId}/${this.getNodeParameter('jid', i)}`);
                    if (operation === 'check') responseData = await waAkgApiRequest.call(this, 'POST', `/api/chat/${sessionId}/check`, { numbers: toArray(this.getNodeParameter('numbers', i) as string) });
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
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/create`, { subject: this.getNodeParameter('groupSubject', i), participants: toArray(this.getNodeParameter('participants', i) as string) });
                    if (operation === 'updateSubject') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/subject`, { subject: this.getNodeParameter('groupSubject', i) });
                    if (operation === 'updateDescription') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/description`, { description: additionalFields.groupDescription || '' });
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/settings`, mapProps(this.getNodeParameter('groupSettings', i) as any));
                    if (operation === 'updateMembers') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/members`, { action: this.getNodeParameter('memberAction', i), participants: toArray(this.getNodeParameter('participants', i) as string) });
                    if (operation === 'leave') responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/leave`);
                    if (operation === 'getInvite') responseData = await waAkgApiRequest.call(this, 'GET', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/invite`);
                    if (operation === 'resetInvite') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/invite`);
                    if (operation === 'acceptInvite') responseData = await waAkgApiRequest.call(this, 'POST', `/api/groups/${sessionId}/invite/accept`, { code: this.getNodeParameter('inviteCode', i) });
                    if (operation === 'updatePicture') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/picture`, { url: this.getNodeParameter('pictureUrl', i) });
                    if (operation === 'deletePicture') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/picture`);
                    if (operation === 'setEphemeral') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/groups/${sessionId}/${this.getNodeParameter('jid', i)}/ephemeral`, { expiration: additionalFields.ephemeralExpiration ?? 86400 });
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
                        responseData = await waAkgApiRequest.call(this, 'POST', `/api/webhooks/${sessionId}`, { url: this.getNodeParameter('webhookUrl', i), events: toArray(this.getNodeParameter('webhookEvents', i) as string), secret: additionalFields.webhookSecret || '' });
                    }
                    if (operation === 'update') {
                        responseData = await waAkgApiRequest.call(this, 'PUT', `/api/webhooks/${sessionId}/${this.getNodeParameter('webhookId', i)}`, { url: this.getNodeParameter('webhookUrl', i), events: toArray(this.getNodeParameter('webhookEvents', i) as string), secret: additionalFields.webhookSecret || '' });
                    }
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/webhooks/${sessionId}/${this.getNodeParameter('webhookId', i)}`);
                }

                // ==================== LABEL ====================
                if (resource === 'label') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', `/api/labels/${sessionId}`);
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', `/api/labels/${sessionId}`, { name: this.getNodeParameter('labelName', i), color: additionalFields.labelColor || 0 });
                    if (operation === 'update') responseData = await waAkgApiRequest.call(this, 'PUT', `/api/labels/${sessionId}/${this.getNodeParameter('labelId', i)}`, { name: this.getNodeParameter('labelName', i), color: additionalFields.labelColor || 0 });
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/labels/${sessionId}/${this.getNodeParameter('labelId', i)}`);
                    if (operation === 'getChatLabels') responseData = await waAkgApiRequest.call(this, 'GET', `/api/labels/${sessionId}/chat/${this.getNodeParameter('chatJid', i)}/labels`);
                    if (operation === 'setChatLabels') {
                        let labelIds = [];
                        try { labelIds = JSON.parse((additionalFields.labelIds as string) || '[]'); } catch (e) { throw new Error('Invalid JSON array for Label IDs'); }
                        responseData = await waAkgApiRequest.call(this, 'PUT', `/api/labels/${sessionId}/chat/${this.getNodeParameter('chatJid', i)}/labels`, { labelIds: labelIds });
                    }
                    if (operation === 'getChatsByLabel') responseData = await waAkgApiRequest.call(this, 'GET', `/api/chats/${sessionId}/by-label/${this.getNodeParameter('labelId', i)}`);
                }

                // ==================== USER ====================
                if (resource === 'user') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', '/api/users');
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', '/api/users', mapProps(this.getNodeParameter('userData', i) as any));
                    if (operation === 'update') responseData = await waAkgApiRequest.call(this, 'PATCH', `/api/users/${this.getNodeParameter('userId', i)}`, mapProps(this.getNodeParameter('userData', i) as any));
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', `/api/users/${this.getNodeParameter('userId', i)}`);
                    if (operation === 'getApiKey') responseData = await waAkgApiRequest.call(this, 'GET', '/api/user/api-key');
                    if (operation === 'generateApiKey') responseData = await waAkgApiRequest.call(this, 'POST', '/api/user/api-key');
                    if (operation === 'deleteApiKey') responseData = await waAkgApiRequest.call(this, 'DELETE', '/api/user/api-key');
                }

                // ==================== NOTIFICATION ====================
                if (resource === 'notification') {
                    if (operation === 'getAll') responseData = await waAkgApiRequest.call(this, 'GET', '/api/notifications');
                    if (operation === 'create') responseData = await waAkgApiRequest.call(this, 'POST', '/api/notifications', mapProps(this.getNodeParameter('notifData', i) as any));
                    if (operation === 'markRead') responseData = await waAkgApiRequest.call(this, 'PATCH', '/api/notifications/read');
                    if (operation === 'delete') responseData = await waAkgApiRequest.call(this, 'DELETE', '/api/notifications/delete');
                }

                // ==================== STATUS ====================
                if (resource === 'status') {
                    if (operation === 'post') responseData = await waAkgApiRequest.call(this, 'POST', `/api/status/${sessionId}/update`, mapProps(this.getNodeParameter('statusContent', i) as any));
                }

                // ==================== SYSTEM ====================
                if (resource === 'system') {
                    if (operation === 'getSettings') responseData = await waAkgApiRequest.call(this, 'GET', '/api/settings/system');
                    if (operation === 'updateSettings') responseData = await waAkgApiRequest.call(this, 'POST', '/api/settings/system', mapProps(this.getNodeParameter('systemSettings', i) as any));
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
