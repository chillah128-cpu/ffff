export function rollDice(sides = 6) {
  // простейшее подбрасывание стандартной кости
  return Math.floor(Math.random() * sides) + 1;
}