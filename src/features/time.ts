export function getUnixstamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function formatTime(unixtimestamp: number) {
  const date = new Date(unixtimestamp * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}