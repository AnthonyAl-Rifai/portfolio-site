export const convertPitch = (rate: number) => {
  let deviation;

  if (rate === 1 || rate === -1) {
    return '0';
  }

  if (rate > 0) {
    deviation = (rate - 1) * 100;
  } else {
    deviation = (1 - Math.abs(rate)) * -100;
  }

  const pitch = parseInt(deviation.toFixed(0), 10);
  return pitch.toString();
}

export default convertPitch;
