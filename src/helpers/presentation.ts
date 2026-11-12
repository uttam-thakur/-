import { bride } from '../data/bride';
import { groom } from '../data/groom';
import { events } from '../data/events';
import { venues } from '../data/venues';
import { wedding } from '../data/wedding';
import { copy, text } from '../content/invitation';
export const coupleNames = () =>
  [bride.firstName, groom.firstName].join(copy.common.joiner);
export function primaryEvent() {
  const event = events.find((e) => e.id === wedding.primaryEventId);
  if (!event)
    throw new Error(
      'data/wedding.ts primaryEventId must match an event in data/events.ts',
    );
  return event;
}
export function eventVenue(id: string) {
  const venue = venues.find((v) => v.id === id);
  if (!venue) throw new Error(`Unknown venue id: ${id}`);
  return venue;
}
export function dateText(value: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat(wedding.locale, {
    ...options,
    timeZone: wedding.timeZone,
  }).format(new Date(value));
}
export const fullDate = (value: string) =>
  dateText(value, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
export const shortDate = (value: string) =>
  dateText(value, { day: 'numeric', month: 'short', year: 'numeric' });
export const dateOnly = (value: string) =>
  dateText(value, { day: 'numeric', month: 'long', year: 'numeric' });
export const timeOnly = (value: string) =>
  dateText(value, { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase();
export const weddingHashtag = () =>
  wedding.hashtag || `#${groom.firstName}Weds${bride.firstName}`.replace(/\s/g, '');
export const celebrationDays = () =>
  new Set(events.map((e) => dateOnly(e.startsAt))).size;
const escapeIcs = (s: string) =>
  s
    .replace(/\\/g, '\\\\')
    .replace(/\r?\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
const icsDate = (s: string) =>
  new Date(s)
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '');
export function calendarContent(now = new Date()) {
  const event = primaryEvent(),
    venue = eventVenue(event.venueId);
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Royal Gateway//Wedding Invitation//EN',
    'BEGIN:VEVENT',
    `UID:${escapeIcs(wedding.calendarUid)}`,
    `DTSTAMP:${icsDate(now.toISOString())}`,
    `DTSTART:${icsDate(event.startsAt)}`,
    `DTEND:${icsDate(event.endsAt || new Date(new Date(event.startsAt).getTime() + 4 * 3600000).toISOString())}`,
    `SUMMARY:${escapeIcs(text(copy.calendar.summary, { couple: coupleNames() }))}`,
    `LOCATION:${escapeIcs(`${venue.name}, ${venue.address}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
