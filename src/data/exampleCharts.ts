/**
 * EXAMPLE figures for the homepage chart section. None of these are client
 * results or measured averages: every chart that uses them is labelled
 * "Example" on the page. The only real numbers are Verdance's promises
 * (a reply within 60 seconds, live in 10 working days).
 */

/** Reply-time race: an example enquiry, before and with the system. */
export const RACE = {
  before: { label: "Before", minutes: 47, note: "Seen between jobs, answered when someone is free" },
  after: { label: "With AI", seconds: 4, note: "Answered, details taken, time offered" },
} as const;

/** Office hours used to split the hourly chart. 08:00 to 17:00. */
export const OFFICE_OPEN = 8;
export const OFFICE_CLOSE = 17;

/** Example enquiries received in each hour of one day, 00:00 to 23:00. */
export const ENQUIRIES_BY_HOUR: number[] = [
  1, 0, 0, 0, 0, 1, 2, 4, //  00-07
  7, 9, 8, 6, 5, 7, 6, 5, //  08-15
  6, 7, 8, 9, 10, 8, 5, 2, // 16-23
];

/** Answered within the hour: before only in office hours, with AI every hour. */
export function answeredBefore(hour: number, received: number) {
  return hour >= OFFICE_OPEN && hour < OFFICE_CLOSE ? received : 0;
}

/** Example pipeline for one month. */
export const PIPELINE = [
  { label: "Enquiries", value: 120 },
  { label: "Answered in 60 s", value: 120 },
  { label: "Qualified", value: 72 },
  { label: "Booked", value: 41 },
  { label: "Won", value: 17 },
];
