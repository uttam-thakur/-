export function venueMapLinks(name: string, address: string) {
  const query = encodeURIComponent(`${name}, ${address}`);
  return {
    embed: `https://www.google.com/maps?q=${query}&output=embed`,
    open: `https://www.google.com/maps/search/?api=1&query=${query}`,
  };
}
