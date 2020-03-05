import { CELL_SIZE_PX, FIELD_WIDTH, FIELD_HEIGHT } from './config.js';

export function createCell(x, y) {
  // add element
  const cell = document.createElement('div');
  cell.id = `x${x}y${y}`;
  cell.dataset.x = x;
  cell.dataset.y = y;

  cell.style.left = `${x * CELL_SIZE_PX}px`;
  cell.style.top = `${y * CELL_SIZE_PX}px`;
  cell.style.width = `${CELL_SIZE_PX}px`;
  cell.style.height = `${CELL_SIZE_PX}px`;

  return cell;
}

function borderField(x, y) {
  return  x === 0 || y === 0 || x === FIELD_WIDTH - 1 || y === FIELD_HEIGHT - 1;
}

export function initGamefield() {
  const gameField = document.getElementById('gamefield');

  gameField.style.width = `${CELL_SIZE_PX * FIELD_WIDTH}px`;
  gameField.style.height = `${CELL_SIZE_PX * FIELD_HEIGHT}px`;

  for (let x = 0; x < FIELD_WIDTH; x++) {
    for (let y = 0; y < FIELD_HEIGHT; y++) {

      let cell = getCell(x, y);
      if (!cell) {
        cell = createCell(x, y);
        gameField.appendChild(cell);
      }
      cell.className = '';

      if (borderField(x, y)) {
        cell.classList.add('wall');
      }

    }
  }

}

function getCell(x, y) {
  const id = `x${x}y${y}`;
  return document.getElementById(id);
}

/**
 * @param {number} x
 * @param {number} y
 * @param {string} cellClass
 */
export function setCellClass(x, y, cellClass) {
  const cell = getCell(x, y);
  cell.className = cellClass;
}

/**
 * @param {number} x
 * @param {number} y
 * @returns {string}
 */
export function getCellClass(x, y) {
  const id = `x${x}y${y}`;
  const cell = document.getElementById(id);
  return cell.className;
}