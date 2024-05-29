document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'player1';
    let player1Moves = [];
    let player2Moves = [];
    const maxMovesPerPlayer = 3;
    const boardSize = 3;
    const boardContainer = document.getElementById('tic-tac-toe-board');

    boardContainer.innerHTML = '';

    function createCell(i, j) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.i = i;
        cell.dataset.j = j;
        return cell;
    }

    function renderBoard() {
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < boardSize; j++) {
                row.appendChild(createCell(i, j));
            }

            boardContainer.appendChild(row);
        }
    }

    renderBoard();

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            console.log(`${currentPlayer} played at (${cell.dataset.i}, ${cell.dataset.j})`);

            let playerQueue = currentPlayer === 'player1'? player1Moves : player2Moves;
            playerQueue.push({ player: currentPlayer, position: { i: parseInt(cell.dataset.i), j: parseInt
(cell.dataset.j) }});

            while (playerQueue.length > maxMovesPerPlayer) {
                const oldestMoveIndex = playerQueue.length - 1;
                const oldestCell = document.querySelector(`[data-i="${playerQueue[oldestMoveIndex].position.i}
"][data-j="${playerQueue[oldestMoveIndex].position.j}"]`);
                oldestCell.textContent = '';
                playerQueue.shift();
            }

            cell.textContent = currentPlayer === 'player1'? 'x' : 'o';

            currentPlayer = currentPlayer === 'player1'? 'player2' : 'player1';

            // Check for win condition
            if (checkWin(currentPlayer)) {
                alert(`${currentPlayer} wins`);
                resetBoard();
            }
        });
    });

    function checkWin(player) {
        // Check rows and columns
        for (let i = 0; i < boardSize; i++) {
            if ((cells[i * boardSize + i].textContent === player && cells[i * boardSize + i + 1].textContent
 === player && cells[i * boardSize + i + 2].textContent === player) ||
                (cells[i].textContent === player && cells[i + boardSize].textContent === player && cells[i + 2
 * boardSize].textContent === player)) {
                return true;
            }
        }

        // Check diagonals
        if ((cells[0].textContent === player && cells[4].textContent === player && cells[8].textContent ===
 player) ||
            (cells[2].textContent === player && cells[4].textContent === player && cells[6].textContent ===
 player)) {
            return true;
        }

        return false;
    }

    function resetBoard() {
        // Reset the board and players
        currentPlayer = 'player1';
        player1Moves = [];
        player2Moves = [];
        boardContainer.innerHTML = '';
        renderBoard();
    }
});