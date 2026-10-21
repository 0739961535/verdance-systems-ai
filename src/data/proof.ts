/**
 * Proof we are allowed to show, all off until it is real.
 *
 * OWN_NUMBERS: our own Operations Team figures (Verdance's own enquiries, not a
 * client's), labelled as ours on the page. TODO(Daniel): fill from our own
 * command centre data and say when they were taken. While any field is null
 * the strip does not render.
 *
 * FOUNDER_VIDEO: a 45-second "the person on the call" clip. TODO(Daniel):
 * record it, drop the files in public/video/, set the paths. Null = hidden.
 */
export const OWN_NUMBERS: {
  enquiriesThisMonth: number | null;
  medianReplySeconds: number | null;
  asOf: string | null;
} = { enquiriesThisMonth: null, medianReplySeconds: null, asOf: null };

export const FOUNDER_VIDEO: { mp4: string; webm?: string; poster: string; captions?: string } | null = null;
