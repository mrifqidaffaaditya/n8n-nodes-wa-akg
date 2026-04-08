import {
    IWebhookFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookResponseData,
    INodeExecutionData,
    INodeOutputConfiguration,
} from 'n8n-workflow';

export class WaAkgTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'WA-AKG Trigger',
        name: 'waAkgTrigger',
        icon: 'file:WaAkgTrigger.svg',
        group: ['trigger'],
        version: 1,
        description: 'Starts the workflow when WA-AKG Webhook is triggered',
        defaults: {
            name: 'WA-AKG Trigger',
        },
        inputs: [],
        outputs: [
            { type: 'main', displayName: 'Message Received' },
            { type: 'main', displayName: 'Message Sent' },
            { type: 'main', displayName: 'Message Status' },
            { type: 'main', displayName: 'Message Edited' },
            { type: 'main', displayName: 'Message Deleted' },
            { type: 'main', displayName: 'Connection Update' },
            { type: 'main', displayName: 'Group Update' },
            { type: 'main', displayName: 'Group Participant' },
            { type: 'main', displayName: 'Contact Update' },
            { type: 'main', displayName: 'Status Update' },
        ] as INodeOutputConfiguration[],
        webhooks: [
            {
                name: 'default',
                httpMethod: 'POST',
                responseMode: 'onReceived',
                path: 'webhook',
            },
        ],
        properties: [
            {
                displayName: 'Notice',
                name: 'notice',
                type: 'notice',
                default: '',
                description: 'Copy the Webhook URL above and configure it globally in your WA-AKG dashboard or API.',
            },
        ],
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const req = this.getRequestObject();
        const body = req.body;

        const eventTypes = [
            'message.received',
            'message.sent',
            'message.status',
            'message.edited',
            'message.deleted',
            'connection.update',
            'group.update',
            'group.participant',
            'contact.update',
            'status.update',
        ];

        const event = body.event;
        const index = eventTypes.indexOf(event);

        // Initialize an array of empty arrays for each of the 10 outputs
        const returnData: INodeExecutionData[][] = Array(10).fill(null).map(() => []);

        if (index !== -1) {
            returnData[index] = [{ json: body }];
        } else {
            // Fallback: If event is unknown, send to the first output (Message Received)
            returnData[0] = [{ json: body }];
        }

        return {
            workflowData: returnData,
        };
    }
}
