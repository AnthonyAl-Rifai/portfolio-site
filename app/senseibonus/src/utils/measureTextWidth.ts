export function measureTextWidth(text: string, font: string) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;
  context.font = font;
  context.textBaseline = 'top';
  context.direction = 'ltr';
  return context.measureText(text).width;
}
