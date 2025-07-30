function formatTime(timeInSeconds: number): string {
  const minutes = Math.max(Math.floor(timeInSeconds / 60), 0);
  const seconds = Math.max(Math.floor(timeInSeconds % 60), 0);

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export default formatTime;
