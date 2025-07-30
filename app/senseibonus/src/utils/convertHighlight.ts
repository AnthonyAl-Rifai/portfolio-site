
export const convertHighlight = (str: string) => {
  const num = parseInt(str, 10);
  if (!isNaN(num) && isFinite(num) && num < 10) return `0${num}`;
  return str; 
};
