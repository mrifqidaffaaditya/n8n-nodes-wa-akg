import { INodeProperties } from 'n8n-workflow';

export const profileOperations: INodeProperties[] = [
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
];

export const profileFields: INodeProperties[] = [
    { displayName: 'Display Name', name: 'displayName', type: 'string', required: true, default: '', description: 'The new display name for your profile', displayOptions: { show: { resource: ['profile'], operation: ['updateName'] } } },
    { displayName: 'Status Text', name: 'statusText', type: 'string', typeOptions: { rows: 2 }, required: true, default: '', description: 'The new "About" status text payload', displayOptions: { show: { resource: ['profile'], operation: ['updateStatus'] } } },
    { displayName: 'Picture URL', name: 'profilePicUrl', type: 'string', required: true, default: '', description: 'Direct URL to an image file to set as your profile picture', displayOptions: { show: { resource: ['profile'], operation: ['updatePicture'] } } },
];
