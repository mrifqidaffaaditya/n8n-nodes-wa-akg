# WA-AKG n8n Community Node

![WA-AKG Logo](https://cdn.keidev.my.id/main-web/archive/1772213183992-AiKei%20Group.svg)

[![npm version](https://badge.fury.io/js/n8n-nodes-wa-akg.svg)](https://badge.fury.io/js/n8n-nodes-wa-akg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Official [n8n](https://n8n.io/) community node for **[WA-AKG WhatsApp Gateway](https://github.com/mrifqidaffaaditya/WA-AKG)**. Seamlessly integrate powerful WhatsApp API capabilities directly into your automated workflows.

## 🚀 Features

With this node, you can fully control your WA-AKG WhatsApp Gateway directly from n8n:

### Action Node
- **Messaging:** Send Text, Media (Image/Video/Audio/Document), Location, Contact Cards, Polls, Lists, and Stickers. Reply, React, Star, Delete, Forward, Broadcast, Search, Download Media.
- **Media Management:** List All Media, Get Specific File, Bulk Delete.
- **Session Management:** Create, Start, Stop, Logout, Check Status, Get QR Code, Update/Delete Settings, Grant/Revoke Shared Access.
- **Group Management:** Create Groups, Update Subjects/Descriptions/Settings, Add/Remove/Promote Members, Leave Groups, Manage Invites, Set Disappearing Messages.
- **Chats & Contacts:** Get Chats, Mark as Read, Archive, Mute, Pin, Send Typing Presence, Block/Unblock Contacts.
- **Labels, Auto-Replies, & Schedulers:** Manage Chat Labels, Get Label Chats, Automated Responses, and Scheduled Broadcasts.

### Trigger Node
- Supports real-time webhooks without needing Session IDs directly.
- **10 Dynamic Output Branches** depending on the precise web event:
  1. `Message Received` (Default)
  2. `Message Sent`
  3. `Message Status` (Delivered/Read)
  4. `Message Edited`
  5. `Message Deleted` (Revoked)
  6. `Connection Update` (Connect, Disconnect, QR Ready)
  7. `Group Update`
  8. `Group Participant`
  9. `Contact Update`
  10. `Status Update`

## 📦 Installation

Follow the installation steps in the [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/installation/).

1. Go to your n8n Dashboard.
2. Navigate to **Settings > Community Nodes**.
3. Click **Install**.
4. Type `n8n-nodes-wa-akg` and click Install.

## 🛠️ Configuration & Authentication

To interact with the WA-AKG Gateway, you must configure your API credentials.

1. Open a new or existing workflow in n8n.
2. Add the **WA-AKG** node.
3. In the Node settings, create new credentials for **WA-AKG API**.
4. **Base URL:** The URL where your WA-AKG is hosted (e.g., `https://wa-akg.yourdomain.com`).
5. **API Key:** Your global API key generated from the WA-AKG User Dashboard or Admin panel.

## 💡 Usage Example

**Sending a WhatsApp message when a new lead is captured:**
1. Use a Webhook or Form Trigger in n8n to capture lead data.
2. Add the **WA-AKG** node.
3. Select Resource: `Message`, Operation: `Send Text`.
4. Define your `Session ID`.
5. Define the recipient's `JID` (e.g., `628123456789@s.whatsapp.net`).
6. Set the `Text` Message to: `Hello {{ $json.Name }}, welcome to our community!`

**Handling Incoming Messages via Webhook:**
1. Drag the **WA-AKG Trigger** node onto your canvas.
2. Copy the generated Webhook URL.
3. Go to your WA-AKG Dashboard and create a new Webhook, pasting the n8n URL.
4. From the **Message Received** branch on the Trigger Node, connect your logic flow (e.g., Save to Google Sheets or Reply using ChatGPT).

## 🆘 Support

If you encounter any issues or have questions regarding this node, please reach out via the official [WA-AKG GitHub Repository](https://github.com/mrifqidaffaaditya/WA-AKG).

---

Built with ❤️ by [WA-AKG](https://github.com/mrifqidaffaaditya/WA-AKG).
