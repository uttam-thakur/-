import type { RsvpResponse } from '../types/rsvp';
export function createRsvpResponse(
  fields: Pick<FormData, 'get'>,
  attending: boolean,
  guests: number,
): RsvpResponse {
  return {
    name: String(fields.get('name') ?? ''),
    attending,
    guests: attending ? guests : 0,
    message: String(fields.get('message') ?? ''),
  };
}
