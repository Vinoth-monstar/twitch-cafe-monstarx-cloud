import { z } from 'zod'

export const occasions = [
  ['a small group gathering', 'A small group gathering'],
  ['a private event', 'A private event'],
  ['a workshop', 'A workshop'],
  ['a brand collaboration', 'A brand collaboration'],
  ['a bulk drinks order', 'A bulk drinks order'],
] as const
export const enquiryInput = z.object({
  occasion: z.enum(['a small group gathering', 'a private event', 'a workshop', 'a brand collaboration', 'a bulk drinks order'], { error: 'Choose an occasion from the list.' }),
  date: z.string().refine(value => {
    if (!value) return true
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
    const date = new Date(`${value}T12:00:00Z`)
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  }, 'Choose a valid calendar date or leave it blank.'),
  guests: z.coerce.number().int('Enter a whole number of guests.').min(1, 'Enter at least 1 guest.').max(Number.MAX_SAFE_INTEGER, 'Enter a smaller whole number of guests.'),
  notes: z.string().max(2000, 'Keep your idea to 2,000 characters or fewer.'),
})
export const savedDraftInput = z.object({
  id: z.string().min(1, 'Prepare a new save attempt.').max(200, 'Prepare a new save attempt.'),
  message: z.string().trim().min(1, 'Enter a message before saving.').max(10000, 'Keep a saved message to 10,000 characters or fewer.'),
})
export const draftIdInput = z.object({ id: z.string().min(1, 'Choose a draft.').max(200, 'Choose a valid draft.') })
export type SavedDraftInput = z.infer<typeof savedDraftInput>
export type DraftIdInput = z.infer<typeof draftIdInput>
