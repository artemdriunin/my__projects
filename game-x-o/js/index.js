// Input game options 

const OPTIONS = {
    selectors: {
        gamefield: '.gamefield',
        cell: '.cell',
        message: '.message',
        info: '.board-info',
        reset: '.reset'
    },
    winIndex: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ],
    player: 'x'
};

// Game

function initGame(options) {
    return function() {
        const cells = document.querySelectorAll(`${options.selectors.gamefield} ${options.selectors.cell}`);
        const message = document.querySelector(options.selectors.message);
        const boardInfo = document.querySelector(options.selectors.info);
        const resetBtn = document.querySelector(options.selectors.reset);
        const score = {
            x: 0,
            o: 0,
            draw: 0
        };
        const winIndex = options.winIndex;

        let selectedCells = [];
        let stepCount = 0;
        let paused = false;
        let player = options.player || 'x';

        const isCheckWin = () => {
            for (let item of winIndex) {
                const playerIsWon = selectedCells[item[0]] && 
                selectedCells[item[0]] === selectedCells[item[1]] && 
                selectedCells[item[1]] === selectedCells[item[2]];

                if (playerIsWon) return true;
            }

            return false;
        }

        const changePlayer = () => {
            let changedPlayer = player === 'x' ? 'o' : 'x';
            player = changedPlayer;

            message.innerHTML = `Play: <span>${player}</span>`;
        }

        const updateStatistics = () => {
            boardInfo.children[0].innerHTML = `X: ${score.x}`;
            boardInfo.children[1].innerHTML = `O: ${score.o}`;
            boardInfo.children[2].innerHTML = `Draw: ${score.draw}`;
        }

        cells.forEach((cell, i) => (cell.dataset.index = i));

        if (!message.innerHTML) message.innerHTML = `Play: <span>${player}</span>`;

        if (!boardInfo.children[0].innerHTML 
            || !boardInfo.children[1].innerHTML 
            || !boardInfo.children[2].innerHTML) {
                updateStatistics();
        }

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                if (!cell.innerHTML && !paused) {
                    cell.innerHTML = player;

                    const index = cell.dataset.index;
                    selectedCells[index] = player;
                    stepCount = stepCount + 1;

                    if (isCheckWin()) {
                        message.innerHTML = `Won: <span>${player}</span>`;
                        score[player] = score[player] + 1;
                        stepCount = 0;
                        paused = true;
                    } else {
                        changePlayer();
                    }

                    if (stepCount >= 9) {
                        score.draw = score.draw + 1;
                        stepCount = 0;
                        message.innerHTML = 'Draw';
                    }

                    updateStatistics();
                }
            });
        });
        
        resetBtn.addEventListener('click', () => {
            cells.forEach(cell => (cell.innerHTML = ''));
            selectedCells = [];
            paused = false;

            changePlayer();
        });
    };
}

window.addEventListener('DOMContentLoaded', () => {
    const game = initGame(OPTIONS);

    game();
});