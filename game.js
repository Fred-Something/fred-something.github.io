var board = [
  [0, 6, 6, 0, 0],
  [0, 5, 0, 1, 0],
  [0, 0, 2, 2, 0],
  [0, 0, 0, 0, 0]
];

// TODO
/*
Win detection
Text file with puzzles to pull from
Ranking options
Database
*/

/*
EMPTY = 0
GOAL = 1
BOX = 2
GOAL_BOX = 3
PLAYER = 4
GOAL_PLAYER = 5
WALL = 6
*/

const player = [4, 5]
const box = [2, 3]
const goal = [1, 3, 5]
const visual = ['', '?', 'B', '!', 'P', 'p', '#']
const images = ['empty.png', 'goal-empty.png', 'box.png', 'goal-full.png', 'player.png', 'goal-player.png', 'wall.png'];
const solid = [2, 4, 6]

var moves = []
var solved = false

var width = board[0].length;
var height = board.length;
var game_element = document.getElementById('game');
game_element.style.gridTemplateColumns = `repeat(${width}, 40px)`;

function render() {
  game_element.innerHTML = '';

  if (solved) {
    const winMessage = document.createElement('div');
    winMessage.className = 'win-message';
    winMessage.textContent = 'You win!!!';
    game_element.appendChild(winMessage);
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const img = document.createElement('img');
      img.src = `img/${images[board[y][x]]}`;
      img.style.width = '100%';
      img.style.height = '100%';
      cell.appendChild(img);
      game_element.appendChild(cell);
    }
  }
}

function check_win() {
  for (const row of board) {
    if (row.includes(1)) {
      return false;
    }
  }

  return true;
}

function move_player(dx, dy) {
  let px = 0, py = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (player.includes(board[y][x])) {
        px = x;
        py = y;
      }
    }
  }
  const nx = px + dx;
  const ny = py + dy;
  if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
    if (box.includes(board[ny][nx])) {
      const mx = nx + dx;
      const my = ny + dy;

      if (mx >= 0 && mx < width && my >= 0 && my < height && !solid.includes(board[my][mx])) {
        board[py][px] -= 4;
        board[ny][nx] += 4 - 2;
        board[my][mx] += 2;
        moves.push([dx, dy, true])
        if (check_win()) solved = true;
        // Udpate board to display win?
      }
    }
    else if (solid.includes(board[ny][nx])) {
      return;
    }
    else {
      board[py][px] -= 4;
      board[ny][nx] += 4;
      moves.push([dx, dy, false])
    }
    render();
  }
}

function undo() {
  var move = moves.pop()

  if (!move) return;

  let px = 0, py = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (player.includes(board[y][x])) {
        px = x;
        py = y;
      }
    }
  }
  const dx = move[0]
  const dy = move[1] 

  const nx = px - dx;
  const ny = py - dy;

  board[py][px] -= 4;
  board[ny][nx] += 4;

  if (move[2]) {
    const mx = px + dx;
    const my = py + dy;

    board[my][mx] -= 2;
    board[py][px] += 2;
  }

  render()
}

function reset() {
  while (moves.length > 0) {
    undo()
  }
  solved = false

  render();
}

function reroll() {
  // TODO finish

  board = [
    [0, 0, 0,],
    [0, 5, 0,],
    [0, 0, 0]
  ]

  moves = []
  solved = false

  width = board[0].length;
  height = board.length;
  game_element = document.getElementById('game');
  game_element.style.gridTemplateColumns = `repeat(${width}, 40px)`;

  render();
}

document.addEventListener('keydown', event => {
  const inputs = {
    ArrowUp: [0, -1],
    ArrowDown: [0, 1],
    ArrowLeft: [-1, 0],
    ArrowRight: [1, 0],
  };
  if (inputs[event.key]) {
    move_player(...inputs[event.key]);
  }
  else if (event.key === "z") {
    undo();
  }
  else if (event.key === "r") {
    reset();
  }
});

document.getElementById('up').onclick = () => move_player(0, -1);
document.getElementById('down').onclick = () => move_player(0, 1);
document.getElementById('left').onclick = () => move_player(-1, 0);
document.getElementById('right').onclick = () => move_player(1, 0);

document.getElementById('undo').onclick = () => undo();
document.getElementById('reset').onclick = () => reset();
document.getElementById('next').onclick = () => reroll();

render();