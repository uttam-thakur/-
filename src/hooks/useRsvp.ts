import { useState, type FormEvent } from 'react';
import { copy } from '../content/invitation';
import { invitationConfig } from '../config/invitation';
import { createRsvpResponse } from '../helpers/rsvp';
import { downloadFile } from '../helpers/download';
export function useRsvp() {
  const [attending, setAttending] = useState(true),
    [guests, setGuests] = useState(1),
    [status, setStatus] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = createRsvpResponse(
      new FormData(event.currentTarget),
      attending,
      guests,
    );
    downloadFile(
      JSON.stringify(response, null, 2),
      invitationConfig.rsvp.filename,
      'application/json',
    );
    setStatus(copy.rsvp.localSuccess);
  }
  const decrease = () => setGuests((value) => Math.max(1, value - 1));
  const increase = () =>
    setGuests((value) => Math.min(invitationConfig.rsvp.maxGuests, value + 1));
  return { attending, setAttending, guests, status, submit, decrease, increase };
}
