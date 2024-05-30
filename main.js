const winningCombinations = [
    [[0, 0], [0, 1], [0, 2]], // Top row
    [[1, 0], [1, 1], [1, 2]], // Middle row
    [[2, 0], [2, 1], [2, 2]], // Bottom row
    [[0, 0], [1, 0], [2, 0]], // Left column
    [[0, 1], [1, 1], [2, 1]], // Middle column
    [[0, 2], [1, 2], [2, 2]], // Right column
    [[0, 0], [1, 1], [2, 2]], // Diagonal from top left to bottom right
    [[0, 2], [1, 1], [2, 0]] // Diagonal from top right to bottom left
];    

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
        cell.age = 0;
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
    // Check cell clicked
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if(cell.age == 0){
                console.log(`${currentPlayer} played at [${cell.dataset.i}, ${cell.dataset.j}]`);
                if (currentPlayer == 'player1'){playerQueue = player1Moves;}
                else{playerQueue = player2Moves;}

                cell.age = 1;  

                playerQueue.push({ player: currentPlayer, position: { i: parseInt(cell.dataset.i), j: parseInt(cell.dataset.j) }});

                if (playerQueue.length > maxMovesPerPlayer){
                    const oldestCell = document.querySelector(`[data-i="${playerQueue[0].position.i}"][data-j="${playerQueue[0].position.j}"]`);
                    oldestCell.style.backgroundColor = 'white';
                    oldestCell.age = 0;
                    console.log(oldestCell);
                    playerQueue.shift();
                }
                if (playerQueue.length == maxMovesPerPlayer){
                    const fadingCell = document.querySelector(`[data-i="${playerQueue[0].position.i}"][data-j="${playerQueue[0].position.j}"]`);
                    fadingCell.style.backgroundColor = currentPlayer === 'player1'? '#993333' : '#003399';
                
                }
                console.log(playerQueue);

                cell.style.backgroundColor = currentPlayer === 'player1'? 'red' : 'blue';
                currentPlayer = currentPlayer === 'player1'? 'player2' : 'player1';
                if (checkWinner(currentPlayer)) { console.log(`${currentPlayer} wins`);}
            }
        });
    });


    function resetBoard() {
        // Reset the board and players
        currentPlayer = 'player1';
        player1Moves = [];
        player2Moves = [];
        boardContainer.innerHTML = '';
        renderBoard();
    }
});


function checkWinner(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            const cell = document.querySelector(`[data-i="${index[0]}"][data-j="${index[1]}"]`);
            return cell && cell.textContent === player;
        });
    });
}
