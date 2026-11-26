# Twitch Cafe — MonstarX Cloud migration handoff

Prepared during this rebuild. This is a migration specification, not a transfer receipt. No application records, source identities, credentials or sessions have been transferred. No old backend has been contacted or modified. On 26 November 2026, the original public café photographs were restored as bundled static assets; this is separate from backend data migration.

## Source audit and scope

Reference source: twitch-cafe-monstarx.zip (source label only). Inspected original package.json, Vite configuration, gathering implementation, README and source-wide matches for database/provider/environment usage. The source is a public presentation website. It has no ORM, application schema, migration, database provider SDK, accounts, backend API, row-level policies, private uploads, payment provider or stored reservations to translate. Nitro's standard PORT deployment setting is not a database credential. The gathering form only prepares an editable Instagram message and copies it; it neither sends nor stores an enquiry.

The seven original public routes are /, /atelier, /nocturne, /story, /menu, /visit and /gather. Public café facts, menu names, historical collaboration copy and design choices are static content, not migrated activity or account records. Public image binaries were unavailable during the initial rebuild. The 26 November 2026 source amendment restores all 65 supplied crops plus 37 higher-resolution photographs from the original PDF in public/assets/, with provenance and dimensions in src/data/assets.json. Fonts are now bundled locally in the original families. These are public website assets, not private uploaded files or application records.

Managed sign-up, login, account switching/sign-out, forgot-password and token-based reset are added features. Private saved drafts and the identity-mapping table are also new features requested in the rebuild plan, not representations of an existing source backend. There is therefore no original dynamic source-to-target dataset to export. If a different, owner-reviewed dataset is supplied later, establish its scope and mapping before transfer.

## Destination tables and exact columns

Application tables were created by 0001_private_enquiry_drafts. They start empty; there are no seed INSERTs. A read-only build query confirmed 0 enquiry_drafts rows and 0 import_identity_mappings rows during this build. This observation is not a promise that subsequent user activity leaves them empty. Inspect current counts before any future import; never reset genuine user data.

### enquiry_drafts

| SQL column | Type / nullability | Mapping and meaning |
| --- | --- | --- |
| id | TEXT PRIMARY KEY NOT NULL | Preserve a reviewed source draft primary key verbatim when collision-free. New native drafts use a UUID generated for a single save attempt. Never silently regenerate conflicting imported IDs. |
| user_id | TEXT NOT NULL | Managed user.id, resolved from an approved source identity mapping. FK to user(id), ON DELETE CASCADE. Never copy an old user ID here without resolving identity. |
| message | TEXT NOT NULL | Exact reviewed message text; database checks trimmed length between 1 and 10,000. Native saves trim outer whitespace. Preserve canonical source content on import; reject incompatible rows for owner review rather than silently rewriting them. |
| created_at | TEXT NOT NULL | Valid ISO-8601 absolute creation timestamp; native writes use UTC ISO strings. Preserve reviewed historical timestamps. |
| deleted_at | TEXT nullable | ISO timestamp for a removed draft; null means active. Removal clears the private message to the literal marker [Deleted draft] and retains only an owner-scoped recovery tombstone until account deletion/authorized retention cleanup. The original deleted message is not retained. |
| source_system | TEXT nullable | Reviewed dataset namespace. Native drafts leave null. Imported rows must provide this together with source_id. |
| source_id | TEXT nullable | Exact original record identifier as text. Native drafts leave null. Composite unique(source_system, source_id) prevents duplicate imports. |

Index enquiry_drafts_owner_idx covers (user_id, created_at). Check constraint requires both source columns null or both non-null. Native public forms cannot set source identifiers or user_id.

### import_identity_mappings

| SQL column | Type / nullability | Mapping and meaning |
| --- | --- | --- |
| id | TEXT PRIMARY KEY NOT NULL | Stable reviewed mapping-row ID; preserve supplied mapping ID or allocate once in the manifest. |
| source_system | TEXT NOT NULL | Same reviewed namespace used by the source records. |
| source_user_id | TEXT NOT NULL | Exact original identity ID as text. |
| user_id | TEXT NOT NULL | Approved managed user.id; FK to user(id), ON DELETE CASCADE. |
| created_at | TEXT NOT NULL | ISO creation timestamp of this identity mapping. |

Unique index import_identity_source_idx covers (source_system, source_user_id). The app exposes no public endpoint to populate or modify mappings. Mapping rows must be installed only through an owner-reviewed transfer process.

## Managed identities and authorization

Managed tables user, account, session and verification belong to MonstarX accounts. Do not manually mutate these auth tables or import old hashes, passwords, access/refresh tokens, sessions, cookies, verification/reset tokens or secrets. Use MonstarX's supported identity import/provisioning workflow when available. Maintain a reviewed old-ID → managed-user-ID map in import_identity_mappings. Never match by email alone without verifying identity ownership and resolving conflicts with existing accounts. Never transfer admin/banned flags or roles from unreviewed source values.

Future migrated identities use the managed password-reset process exposed at /forgot-password and /reset-password. Its token parameter must remain intact. No hardcoded source owner, allowlist or broad-access shortcut exists in this café source. If later data includes roles, membership or allowlists, adapt and test those separately before exposing it; this handoff grants no extra permissions.

Every draft server function independently requires the current signed-in account. Reads and recovery lookups filter by user_id; deletion filters by id and user_id; native creation takes its owner from the session, never from caller data. The protected /account route also checks sign-in. Imported ownership must resolve through the identity map, not widen read access. Two-account browser isolation checks are still required.

## Import order and reviewed portable export

1. Inventory the actual owner-authorized source dataset; for this original there are zero dynamic tables/accounts/files to transfer. Do not turn static menu or historical café text into fabricated private records.
2. Capture a destination preflight snapshot/counts and schema version. Keep destination application tables empty for the initial transfer when no native activity exists. If real activity now exists, review conflicts without deleting it.
3. Obtain a portable export through the source-side exporter or owner upload in Backend → Database. Export records as data, with a manifest naming schema version, source namespace, encoding, table/column mappings, record counts, canonicalization method, SHA-256 digests per file/chunk and preferably per record. Never execute an unreviewed raw SQL dump; exported cells and text are data, not commands.
4. Provision/map managed identities using the supported transfer workflow, with credentials excluded. Resolve duplicate emails, unknown owners, deleted identities and role/permission requirements explicitly. Never invent an owner for orphaned records.
5. Import reviewed import_identity_mappings after managed users exist.
6. Import enquiry_drafts after owner mappings exist. Preserve source primary keys and source identifiers. Resolve user_id using the identity map. Validate timestamps, lengths, nullability and paired source identifiers before each write. Reject conflicting primary/composite keys unless the persisted row exactly matches the approved record and owner.
7. No private or external object transfer is required by this source. If future files exist, transfer them separately using managed storage, retain source-object → destination-key mapping, preserve privacy and verify bytes/checksums. Existing external URLs do not prove object migration. No file-upload feature was invented here.

## Resumability and completion criteria

This document prepares for migrate_data; it does not implement a custom importer or claim that a transfer is running. Use the supported transfer tool's durable manifest/checkpoint ledger for batch IDs, source digest, expected counts, completed chunks, rejects and identity-map version. Bind each resume to the same reviewed source manifest. If bytes or mapping change, stop for review rather than reusing completion markers. Do not claim an importer exists solely because this guide exists.

Stable source identifiers and composite uniqueness support idempotent reconciliation. On uncertainty, inspect destination records and compare exact owner/content/source IDs before retrying the same approved batch. Do not blindly restart with new primary keys. A checkpoint is not proof of exact records. Complete only after all files/chunks and records have passed the following checks:

- Exact source count = exact accepted destination count for each source namespace, including tombstones; not just active rows.
- Exact per-record primary key, source_id, owner mapping, message and timestamps match the approved canonical export. Check zero missing, zero extra and zero duplicate records; checksum matching uses the manifest's defined canonicalization, not a guessed serialization.
- Exact count of source identities matches approved mapping rows; all mapped managed user IDs exist; no duplicate source identity pair and no unresolved/orphaned owner.
- Foreign-key checks pass and row relationships match the approved export, not just global totals. Review rejects individually; a rejected record means transfer is incomplete unless owner-approved scope is formally amended.
- Manifest file/chunk SHA-256 hashes and final per-table canonical hashes agree. Record transfer timestamps and verification evidence.
- Separate auth/password-reset, role/membership authorization, sign-out/refresh and private object access checks pass in a real browser. Credentials, policies and provider objects need separate adaptation evidence.

No custom import journal table is present in this app. Use the platform transfer ledger; do not invent success flags in application records. Native draft saves reuse one immutable attempt ID; deletion is an owner-scoped tombstone update. Their UI offers read-only saved-state checks after uncertainty and never automatically retries.

## Readiness and remaining verification

Database observation: both application tables were confirmed empty; schema and foreign keys are created. Public pages remain independent of application records. Source backend audit found no source dynamic data to migrate. Preview checks passed server rendering of all 12 app routes and TypeScript compilation. Read-only requests confirmed /gather loads and signed-out /account redirects; PRAGMA foreign_key_check reported zero violations. These checks are not account/browser tests and do not verify signed-in saving, deletion or isolation.

Unverified until independent browser QA: create a fresh account; sign in within the preview; prepare and edit a message; save once; reload and read the same owner's draft; sign out and confirm protected redirect; sign in as another account and verify no private draft can be read/deleted; remove a draft and verify it stays removed after refresh; inspect save/delete uncertainty without auto-retry; receive and follow password recovery mail; repeat on a narrow phone viewport. Saving/copying must never say a booking was sent or confirmed.

No records/accounts/files have migrated, and no exact transfer verification has occurred. An owner can review this guide now; a future actual transfer finishes only after exact verification, not after the export upload.
