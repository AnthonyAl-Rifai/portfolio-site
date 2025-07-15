export function getTimeFromRadians(rotationInRadians: number): number {
  // RPM value
  const rpm = 33 + 1 / 3;

  // Calculate the total revolutions made
  const totalRevolutions = rotationInRadians / (2 * Math.PI);

  // Calculate the time in seconds for those revolutions
  // Note: 60 seconds in a minute and RPM is revolutions per minute
  const timeInSeconds = totalRevolutions * (60 / rpm);

  return timeInSeconds;
}

export function getRotationInSeconds(position: number): number {
  return ((position * 33.3333) / 60) * (2 * Math.PI);
}
