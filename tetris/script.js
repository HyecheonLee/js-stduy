let current = {
  x: 0,
  y: 0,
  tetromino: undefined
}
const STAGE_WIDTH = 12;
const STAGE_HEIGHT = 20;
const startBtn = document.querySelector('.start-button');
const TETROMINOS = {
  0: {shape: [[0]], color: '0, 0, 0'},
  I: {
    shape: [
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0],
      [0, 'I', 0, 0]],
    color: 'cell-colorI',
  },
  J: {
    shape: [
      [0, 'J', 0],
      [0, 'J', 0],
      ['J', 'J', 0]],
    color: 'cell-colorJ',
  },
  L: {
    shape: [
      [0, 'L', 0],
      [0, 'L', 0],
      [0, 'L', 'L']],
    color: 'cell-colorL',
  },
  O: {
    shape: [
      ['O', 'O'],
      ['O', 'O']],
    color: 'cell-colorO',
  },
  S: {
    shape: [
      [0, 'S', 'S'],
      ['S', 'S', 0],
      [0, 0, 0]],
    color: 'cell-colorS',
  },
  T: {
    shape: [
      [0, 0, 0],
      ['T', 'T', 'T'],
      [0, 'T', 0]],
    color: 'cell-colorT',
  },
  Z: {
    shape: [['Z', 'Z', 0], [0, 'Z', 'Z'], [0, 0, 0]],
    color: 'cell-colorZ',
  },
};
const randomTetromino = () => {
  const tetromino = 'IJLOSTZ';
  const randTetromino = tetromino[Math.floor(Math.random() * tetromino.length)];
  return TETROMINOS[randTetromino];
};
const createStage = () => {
  Array.from(Array(STAGE_HEIGHT),
      (() => new Array(STAGE_WIDTH).fill([0, 'clear'])));
}
const stagePaint = (stage) => {
  const foundCell = findCell(stage);
  const x = foundCell.getAttribute("data-col");
  const y = foundCell.getAttribute("data-row");
  painReset()
  const element = document.querySelectorAll('.stage .cell');
  const tetromino = stage.tetromino;
  const shape = tetromino.shape;
  const paintIndex = [];
  for (let i = 0; i < shape.length; i++) {
    for (let j = 0; j < shape[i].length; j++) {
      if (shape[i][j] !== 0) {
        paintIndex.push([parseInt(y) + i, parseInt(x) + j])
      }
    }
  }

  for (let i = 0; i < element.length; i++) {
    const cell = element[i];
    for (let j = 0; j < paintIndex.length; j++) {
      const paint = paintIndex[j];
      if (cell.getAttribute("data-col") == paint[1] &&
          cell.getAttribute("data-row") == paint[0]) {
        cell.classList.add(stage.tetromino.color)
      }
    }
  }
}

const painReset = () => {
  const element = document.querySelectorAll('.stage .cell');
  for (let i = 0; i < element.length; i++) {
    const cell = element[i];
    cell.classList.remove("cell-colorI")
    cell.classList.remove("cell-colorJ")
    cell.classList.remove("cell-colorL")
    cell.classList.remove("cell-colorO")
    cell.classList.remove("cell-colorS")
    cell.classList.remove("cell-colorT")
    cell.classList.remove("cell-colorZ")
  }
}

const findCell = (stage) => {
  const element = document.querySelectorAll('.stage .cell');
  for (let i = 0; i < element.length; i++) {
    const cell = element[i];
    if (cell.getAttribute("data-col") == stage.x &&
        cell.getAttribute("data-row") == stage.y) {
      return cell;
    }
  }
  return null;
}
startBtn.addEventListener('click', () => {
  current.x = 0
  current.y = 0
  current.tetromino = randomTetromino();
  stagePaint(current);
});
/*
const Stage = ({stage}) => (
    stage.map(row => row.map((cell, x) => `<div class="cell ${stage.color}"/>`))
)*/
