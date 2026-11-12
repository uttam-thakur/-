import { copy, text } from '../content/invitation';
import { bride } from '../data/bride';
import { groom } from '../data/groom';
import { calendarContent } from './presentation';
import { downloadFile } from './download';
export function downloadCalendar() {
  downloadFile(
    calendarContent(),
    text(copy.calendar.filename, { groom: groom.firstName, bride: bride.firstName }),
    'text/calendar',
  );
}
