export * from './auth-schema'
import { index, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'
import { user } from './auth-schema'

export const enquiryDrafts = sqliteTable('enquiry_drafts', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull(),
  deletedAt: text('deleted_at'),
  sourceSystem: text('source_system'),
  sourceId: text('source_id'),
}, table => [index('enquiry_drafts_owner_idx').on(table.userId, table.createdAt), uniqueIndex('enquiry_drafts_source_idx').on(table.sourceSystem, table.sourceId)])

// Empty mapping table reserved for a reviewed future identity transfer, never populated by public forms.
export const importIdentityMappings = sqliteTable('import_identity_mappings', {
  id: text('id').primaryKey().notNull(),
  sourceSystem: text('source_system').notNull(),
  sourceUserId: text('source_user_id').notNull(),
  userId: text('user_id').notNull().references(() => user.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').notNull(),
}, table => [uniqueIndex('import_identity_source_idx').on(table.sourceSystem, table.sourceUserId)])
export type EnquiryDraftRecord = typeof enquiryDrafts.$inferSelect
