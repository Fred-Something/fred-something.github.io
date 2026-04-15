var board = [
  [0, 1, 1, 0, 0],
  [0, 5, 0, 0, 0],
  [0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0]
];

// const player = [5, 6]
const visual = ['', '#', 'B', '?', '!', 'P', 'p']
const solid = [2, 4, 1]

// var boxes = [[2, 2], [2, 3]]
var width = board[0].length;
var height = board.length;
var game_element = document.getElementById('game');
game_element.style.gridTemplateColumns = `repeat(${width}, 40px)`;

function render() {
  game_element.innerHTML = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.textContent = visual[board[y][x]];
      game_element.appendChild(cell);
    }
  }
}

function move_player(dx, dy) {
  let px = 0, py = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (board[y][x] === 5) {
        px = x;
        py = y;
      }
    }
  }
  const nx = px + dx;
  const ny = py + dy;
  if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
    if (board[ny][nx] === 2) {
      const mx = nx + dx;
      const my = ny + dy;

      if (mx >= 0 && mx < width && my >= 0 && my < height && !solid.includes(board[my][mx])) {
        board[py][px] = 0;
        board[ny][nx] = 5;
        board[my][mx] = 2;
      }
    }
    else if (solid.includes(board[ny][nx])) {
      return;
    }
    else {
      board[py][px] = 0;
      board[ny][nx] = 5;
    }
    render();
  }
}

function reroll() {
  // TODO finish

  board = [
    [0, 0, 0,],
    [0, 5, 0,],
    [0, 0, 0]
  ]

  width = board[0].length;
  height = board.length;
  game_element = document.getElementById('game');
  game_element.style.gridTemplateColumns = `repeat(${width}, 40px)`;

  render();
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

document.getElementById('next').onclick = () => reroll();

render();