export const getRandomColor = () => {
  const h = Math.floor(Math.random() * 650);
  const s = 70;
  const l = 50;
  return `hsl(${h}, ${s}%, ${l}%)`;
};
