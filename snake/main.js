import { createCell, initGamefield, setCellClass, getCellClass } from './gamefield.js';
import * as configuration from './config.js';

const START_X = 10;
const START_Y = 10;

let stepLengthMs = 200;

const snake = {
  maxLength: 5,
  body: [],
  direction: 'right',
  lastStepDirection: 'right',

  init() {
    this.maxLength = 5;
    this.body = [{ x: START_X, y: START_Y }];
    this.direction = 'right';
    this.lastStepDirection = 'right';
  },

  getHead() {
    return this.body[0];
  },

  getLength() {
    return this.body.length;
  },

  nextStep() {
    this.moveHead();
  },

  moveHead() {
    let { x, y } = this.getHead();

    switch (this.direction) {
      case 'right':
        x = x + 1;
        break
      case 'left':
        x = x - 1;
        break
      case 'up':
        y = y - 1;
        break
      case 'down':
        y = y + 1;
        break
    }

    this.lastStepDirection = this.direction;

    snake.body.unshift({ x, y });
  },

  moveTail() {
    if (this.getLength() > this.maxLength) {
      const tail = this.body.pop();
      setCellClass(tail.x, tail.y, '');
    }
  }

}

const isVertical = dir => dir === 'up' || dir === 'down';

function startGame() {
  initGamefield();
  snake.init();
  addFood();
  nextStep();
}

function handleGameFieldClick({ target }) {
  const head = snake.getHead();
  const clickX = Number(target.dataset.x);
  const clickY = Number(target.dataset.y);
  if (isVertical(snake.direction)) {
    if (clickX < head.x) {
      snake.direction = 'left';
    }
    if (clickX > head.x) {
      snake.direction = 'right';
    }
  } else {
    if (clickY < head.y) {
      snake.direction = 'up';
    }
    if (clickY > head.y) {
      snake.direction = 'down';
    }
  }

}

function init() {
  startGame();
  const gameField = document.getElementById('gamefield');
  gameField.addEventListener('click', handleGameFieldClick);
}

function gameOver() {
  alert(`Game over. final length: ${snake.getLength()}`);
  startGame();
  stepLengthMs = 200;
}

function addFood() {

  let foodX;
  let foodY;

  do {
    foodX = Math.floor(Math.random() * configuration.FIELD_WIDTH);
    foodY = Math.floor(Math.random() * configuration.FIELD_HEIGHT);

  } while (getCellClass(foodX, foodY));

  setCellClass(foodX, foodY, 'food');

}

function nextStep() {
  const timeout = setTimeout(nextStep, stepLengthMs);

  snake.nextStep();

  const head = snake.getHead();
  const obstacle = getCellClass(head.x, head.y);

  if (obstacle) {
    if (obstacle === 'food') {
      snake.maxLength = snake.maxLength + 1;
      stepLengthMs = stepLengthMs - 20;
      addFood();
    } else {
      clearTimeout(timeout);
      gameOver();
      return;
    }
  }

  setCellClass(head.x, head.y, 'snake');

  snake.moveTail();

}

function handleKeyDown(e) {

  const keyDirectionMap = {
    ArrowUp: 'up',
    ArrowDown: 'down',
    ArrowLeft: 'left',
    ArrowRight: 'right',
  }

  const newDirection = keyDirectionMap[e.code];

  if (isVertical(snake.lastStepDirection) !== isVertical(newDirection)) {
    snake.direction = newDirection;
  }
}

window.addEventListener('load', init);

window.addEventListener('keydown', handleKeyDown);

