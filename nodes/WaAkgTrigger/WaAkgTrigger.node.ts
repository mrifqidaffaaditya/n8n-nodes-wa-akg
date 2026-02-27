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
        // Branching outputs for each event type
        outputs: [
            { type: 'main', displayName: 'Message Received' },
            { type: 'main', displayName: 'Message Sent' },
            { type: 'main', displayName: 'Message Updated' },
            { type: 'main', displayName: 'Message Read' },
            { type: 'main', displayName: 'Group Joined' },
            { type: 'main', displayName: 'Group Left' },
            { type: 'main', displayName: 'Group Participants Changed' },
            { type: 'main', displayName: 'Session Connection' },
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
            'message.updated',
            'message.read',
            'group.joined',
            'group.left',
            'group.participants_changed',
            'session.connection', // Connected, Disconnected, QR
        ];

        const event = body.event;
        const index = eventTypes.indexOf(event);

        // Initialize an array of empty arrays for each output
        const returnData: INodeExecutionData[][] = Array(8).fill(null).map(() => []);

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
