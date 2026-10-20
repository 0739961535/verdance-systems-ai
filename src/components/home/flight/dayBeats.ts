/**
 * The hero film's story: one day in your business, told over real footage
 * (a lift-off, then the Earth from orbit through one day). Copy from
 * growth-lab/WEBSITE_COPY_V2.md section 2A. Times are SAST, 24-hour.
 *
 * `at`: the span of the scroll (0 to 1) where the beat is fully on screen,
 * matched to the film (lift-off, dawn, the sun, day, sunset, night, the Moon).
 */
export type DayBeat = { time: string; title: string; body: string; at: [number, number]; end?: boolean };

export const DAY_BEATS: DayBeat[] = [
  { time: "06:00", title: "First enquiry. Answered.", body: "A WhatsApp comes in before you're up. Verdance replies within 60 seconds.", at: [0.13, 0.2] },
  { time: "09:00", title: "Friday's quote. Followed up.", body: "A polite check-in goes out in your voice. You hear the moment they reply.", at: [0.25, 0.32] },
  { time: "13:00", title: "Busy floor. Still answered.", body: "Your team is with customers. The enquiries don't wait for them.", at: [0.38, 0.46] },
  { time: "17:30", title: "The admin. Done.", body: "Bookings in the diary, notes on the right customer. Nothing typed twice.", at: [0.54, 0.62] },
  { time: "21:41", title: "A new enquiry. Booked.", body: "Answered within 60 seconds, and a time offered before they ask anyone else.", at: [0.68, 0.74] },
  { time: "02:00", title: "Still answered.", body: "Every enquiry, every hour. Anything important waits for you in the morning.", at: [0.785, 0.835] },
  { time: "", title: "Your team's hours back.", body: "Live in 10 working days. Start with a free 30-minute call.", at: [0.87, 0.95], end: true },
];
