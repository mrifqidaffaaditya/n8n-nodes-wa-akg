# Changelog

All notable changes to the `n8n-nodes-wa-akg` package will be documented in this file.

## [1.2.0] - 2026-10-26

### Added
- **Message Resource**:
  - `Edit Message`: Edit already sent WhatsApp text messages via `PATCH /api/messages/:sessionId/:jid/:messageId`.
  - `Send Interactive`: Send rich native flow buttons, interactive lists, and header/footer cards via `POST /api/messages/:sessionId/:jid/interactive`.
  - `Send Album`: Send multiple images/videos bundled as an album via `POST /api/messages/:sessionId/:jid/album`.
  - `Upload Media (Binary)`: Upload binary files directly from n8n node streams via `POST /api/messages/:sessionId/:jid/media`.
  - `Get Broadcast History`: Fetch paginated list of broadcast logs via `GET /api/messages/:sessionId/broadcast/history`.
  - `Get Broadcast Log Detail`: Retrieve detailed broadcast recipients and stats by log ID via `GET /api/messages/:sessionId/broadcast/history/:logId`.
- **System Monitoring**:
  - `Monitor System Metrics`: Global system performance metrics (CPU, RAM, Disks, Network, Node process) via `GET /api/system/monitor`.
  - `Monitor Session Metrics`: Live session status, memory usage, uptime, and database counts via `GET /api/system/monitor/:sessionId`.
- **Webhook Operations**:
  - `Get Delivery Logs`: Retrieve paginated webhook event delivery logs via `GET /api/webhooks/:sessionId/:id/logs`.
  - `Test Webhook`: Trigger test webhook ping to verify target endpoint via `POST /api/webhooks/:sessionId/:id/test`.
- **Session Settings**:
  - `Get Settings`: Retrieve session configuration via `GET /api/sessions/:sessionId/settings`.
- **Autoreply & Scheduler**:
  - `Update`: Edit existing auto-reply rules and scheduled message tasks via `PUT /api/autoreplies/:sessionId/:replyId` and `PUT /api/scheduler/:sessionId/:scheduleId`.
- **User Management**:
  - `Register`: Public user registration via `POST /api/auth/register`.

### Fixed & Changed
- **Chat Resource HTTP Methods & Payloads**:
  - Fixed `Archive`: Method changed from `POST` to `PUT` with required `{ archive: boolean }` payload.
  - Fixed `Mute`: Added `{ mute: boolean, duration?: number }` payload.
  - Fixed `Pin`: Added `{ pin: boolean }` payload.
  - Enhanced `Read`: Added optional `readMessageIds` comma-separated list.
- **Removed Broken Bulk Deletes**:
  - Removed `deleteAll` from `Autoreply` and `Scheduler` as WA-AKG API only supports individual item deletion (`/api/autoreplies/:sessionId/:replyId` and `/api/scheduler/:sessionId/:scheduleId`).
- **Status Resource Deprecation Notice**:
  - Added clear notification that standalone `/api/status/:sessionId/update` was deprecated in WA-AKG; profile status is maintained under `Profile > Update Status`, and stories can be targeted via `status@broadcast`.

## [1.1.0] - 2026-04-08

### Added
- **Media Resource**: 
  - `List All`: Retrieve all stored media files scoped to user sessions.
  - `Get File`: Download a specific stored media file via its filename.
  - `Bulk Delete`: Safely delete multiple media files at once.
- **Session Access Management**:
  - `Get Access List`: Retrieve all users who have shared access to a session.
  - `Grant Access`: Grant session access to another user by email.
  - `Revoke Access`: Remove a user's access from a session.
- **Label Management**:
  - `Get Label Chats`: Retrieve all chats assigned to a specific label.
- **Extended Trigger Events**:
  - Added new webhook trigger branches: `Message Edited`, `Message Deleted`, and `Group Updated` to mirror the latest WA-AKG Webhook capabilities.
  - Mapped `Group Participant` accurately to the `group.participant` webhook event.

### Changed
- **Send Media Types**: The `Send Media` operation now features a dynamic **Media Type** dropdown natively supporting `Image`, `Video`, `Audio`, and `Document` with correct internal WhatsApp Baileys formatting.
- **Webhook Subscriptions**: Updated the `Webhook` resource to precisely list and subscribe to the 10 core events supported by the web dashboard limit.
- **Session Settings**: Renamed the ambiguous `Delete` operation to `Delete Settings` to properly reflect the `DELETE /api/sessions/{id}/settings` API action.

### Fixed
- **Codebase Line Endings**: Normalized all `.ts` files from CRLF to LF to prevent Git diff noise and multi-os build inconsistencies.
