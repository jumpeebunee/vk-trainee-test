export const getSpriteNumPos = (num: number) => {
  if (!num) return 13;
  const spriteWidth = 14;
  return -spriteWidth * (num - 1);
} 