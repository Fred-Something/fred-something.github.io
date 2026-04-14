const board = [
  ['.', '.', '.', '.'],
  ['.', 'P', '.', '.'],
  ['.', '.', '.', '.'],
  ['.', '.', '.', '.']
];

const size = board.length;
const game_element = document.getElementById('game');
game_element.style.gridTemplateColumns = `repeat(${size}, 40px)`;

function render() {
  game_element.innerHTML = '';
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = board[y][x] === 'P' ? 'P' : '';
      game_element.appendChild(cell);
    }
  }
}

function move_player(dx, dy) {
  let px = 0, py = 0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (board[y][x] === 'P') {
        px = x;
        py = y;
      }
    }
  }
  const nx = px + dx;
  const ny = py + dy;
  if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
    board[py][px] = '.';
    board[ny][nx] = 'P';
    render();
  }
}

document.addEventListener('keydown', event => {
  const moves = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0]
  };
  if (moves[event.key]) {
    move_player(...moves[event.key]);
  }
});

document.getElementById('up').onclick = () => move_player(0, -1);
document.getElementById('down').onclick = () => move_player(0, 1);
document.getElementById('left').onclick = () => move_player(-1, 0);
document.getElementById('right').onclick = () => move_player(1, 0);

render();