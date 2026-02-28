import { INodeProperties } from 'n8n-workflow';

export const groupOperations: INodeProperties[] = [
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
];

export const groupFields: INodeProperties[] = [
    { displayName: 'Group Subject (Name)', name: 'groupSubject', type: 'string', required: true, default: '', description: 'The display name/title for the group', displayOptions: { show: { resource: ['group'], operation: ['create', 'updateSubject'] } } },
    { displayName: 'Participants (Comma-separated JIDs)', name: 'participants', type: 'string', required: true, default: '', description: 'Provide participant JIDs separated by commas', displayOptions: { show: { resource: ['group'], operation: ['create', 'updateMembers'] } } },
    { displayName: 'Member Action', name: 'memberAction', type: 'options', options: [{ name: 'Add Members', value: 'add' }, { name: 'Remove Members', value: 'remove' }, { name: 'Promote to Admin', value: 'promote' }, { name: 'Demote to Member', value: 'demote' }], required: true, default: 'add', description: 'The action to perform on the target participants', displayOptions: { show: { resource: ['group'], operation: ['updateMembers'] } } },
    { displayName: 'Invite Code', name: 'inviteCode', type: 'string', required: true, default: '', description: 'The WhatsApp group invite string', displayOptions: { show: { resource: ['group'], operation: ['acceptInvite'] } } },
    { displayName: 'Picture URL', name: 'pictureUrl', type: 'string', required: true, default: '', description: 'Direct URL to an image file', displayOptions: { show: { resource: ['group'], operation: ['updatePicture'] } } },

    {
        displayName: 'Additional Fields',
        name: 'additionalFields',
        type: 'collection',
        placeholder: 'Add Field',
        default: {},
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['updateDescription', 'setEphemeral']
            },
        },
        options: [
            { displayName: 'Group Description', name: 'groupDescription', type: 'string', typeOptions: { rows: 4 }, default: '', description: 'The text description for the group', displayOptions: { show: { '/operation': ['updateDescription'] } } },
            { displayName: 'Disappearing Expiration (Seconds)', name: 'ephemeralExpiration', type: 'number', default: 86400, description: 'Seconds until messages disappear (e.g. 86400)', displayOptions: { show: { '/operation': ['setEphemeral'] } } },
        ],
    },
];
