export const opacityToHex = (opacity: number) => {
  if (opacity < 0) return "00";
  if (opacity > 1) return "FF";
  const alpha = Math.round(opacity * 255);
  return (alpha + 0x10000).toString(16).slice(-2).toLowerCase();
};
