# Changelog

All notable changes to the `n8n-nodes-wa-akg` package will be documented in this file.

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
