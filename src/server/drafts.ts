import { createServerFn } from '@tanstack/react-start'
import { and, desc, eq, isNull } from 'drizzle-orm'
import { enquiryDrafts } from '@/db/schema'
import { getDb } from '@/lib/db'
import { requireUser } from '@/lib/session.server'
import { draftIdInput, savedDraftInput } from '@/lib/enquiry-input'
import type { DraftIdInput, SavedDraftInput } from '@/lib/enquiry-input'
import { validateInput } from '@/lib/monstarx/validation'

export const listDrafts = createServerFn({ method: 'GET' }).handler(async () => {
  const user = await requireUser()
  const db = await getDb()
  return await db.select().from(enquiryDrafts).where(and(eq(enquiryDrafts.userId, user.id), isNull(enquiryDrafts.deletedAt))).orderBy(desc(enquiryDrafts.createdAt)).all()
})

export const inspectDraft = createServerFn({ method: 'GET' }).validator((input: DraftIdInput) => input).handler(async ({ data }) => {
  const user = await requireUser()
  const checked = validateInput(draftIdInput, data)
  if (!checked.ok) return { error: checked.error }
  const db = await getDb()
  const draft = await db.select().from(enquiryDrafts).where(and(eq(enquiryDrafts.id, checked.data.id), eq(enquiryDrafts.userId, user.id))).get()
  return { draft: draft ?? null }
})

export const saveDraft = createServerFn({ method: 'POST' }).validator((input: SavedDraftInput) => input).handler(async ({ data }) => {
  const user = await requireUser()
  const checked = validateInput(savedDraftInput, data)
  if (!checked.ok) return { error: checked.error }
  try {
    const db = await getDb()
    await db.insert(enquiryDrafts).values({ id: checked.data.id, userId: user.id, message: checked.data.message, createdAt: new Date().toISOString() }).onConflictDoNothing().run()
    const draft = await db.select().from(enquiryDrafts).where(and(eq(enquiryDrafts.id, checked.data.id), eq(enquiryDrafts.userId, user.id))).get()
    if (!draft || draft.deletedAt || draft.message !== checked.data.message) return { error: 'This save attempt cannot be reused. Check My drafts before preparing another save.' }
    return { draft }
  } catch (error) {
    console.error('Private enquiry save could not be confirmed', error)
    return { error: 'We could not confirm this save. Check its saved status below before taking another action.' }
  }
})

export const deleteDraft = createServerFn({ method: 'POST' }).validator((input: DraftIdInput) => input).handler(async ({ data }) => {
  const user = await requireUser()
  const checked = validateInput(draftIdInput, data)
  if (!checked.ok) return { error: checked.error }
  try {
    const db = await getDb()
    // Clear private text, retaining only an ownership-scoped tombstone to reconcile a late delete/save.
    await db.update(enquiryDrafts).set({ message: '[Deleted draft]', deletedAt: new Date().toISOString() }).where(and(eq(enquiryDrafts.id, checked.data.id), eq(enquiryDrafts.userId, user.id), isNull(enquiryDrafts.deletedAt))).run()
    return { deleted: true }
  } catch (error) {
    console.error('Private enquiry deletion could not be confirmed', error)
    return { error: 'We could not confirm deletion. Check its saved status before trying again.' }
  }
})
