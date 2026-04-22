import {
    IWebhookFunctions,
    INodeType,
    INodeTypeDescription,
    IWebhookResponseData,
    INodeExecutionData,
    INodeOutputConfiguration,
    IDataObject,
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
        // ✅ FIX 1: Tambahkan triggerPanel agar n8n tahu ini trigger node yang bisa di-pin
        triggerPanel: {
            header: 'Waiting for WA-AKG webhook...',
            executionsHelp: {
                inactive:
                    'Webhooks have two modes: test and production. <br /><br /><b>Use test mode while you build your workflow</b>. Click the \'listen\' button, then make a request to the test URL. The executions will show up in the editor.<br /><br /><b>Use production mode to run your workflow automatically</b>. <a data-key="activate">Activate your workflow</a>, then make requests to the production URL. These executions will show in the executions list, but not in the editor.',
                active:
                    'Webhooks have two modes: test and production. <br /><br /><b>Use test mode while you build your workflow</b>. Click the \'listen\' button, then make a request to the test URL. The executions will show up in the editor.<br /><br /><b>Use production mode to run your workflow automatically</b>. Requests to the production URL will trigger executions automatically.',
            },
        },
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
                description:
                    'Copy the Webhook URL above and configure it globally in your WA-AKG dashboard or API.',
            },
        ],
    };

    async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
        const req = this.getRequestObject();
        const body = req.body as IDataObject;

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

        const event = body.event as string;
        const index = eventTypes.indexOf(event);

        // ✅ FIX 2: Gunakan null (bukan []) untuk output yang tidak aktif
        // n8n membedakan "tidak ada data" (null) vs "array kosong" ([])
        const returnData: Array<INodeExecutionData[] | null> = Array(10).fill(null);

        // ✅ FIX 3: Tambahkan metadata lengkap pada execution data
        const executionData: INodeExecutionData = {
            json: body,
            // Tambahkan binary jika ada attachment (opsional, tapi direkomendasikan)
        };

        if (index !== -1) {
            returnData[index] = [executionData];
        } else {
            // Fallback ke output pertama jika event tidak dikenal
            returnData[0] = [executionData];
        }

        return {
            workflowData: returnData as INodeExecutionData[][],
        };
    }
}