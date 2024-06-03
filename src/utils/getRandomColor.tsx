export function getRandomColor() {
  const colors = [
    'red', 'darkorange', 'yellow',
    'aqua', 'blue', 'lime',
    'navy', 'fuchsia', 'white',
  ]
  const randomNumber = Math.floor(Math.random() * colors.length)

  return colors[randomNumber];
}