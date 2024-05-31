document.addEventListener('DOMContentLoaded', function() {
    let currentPlayer = 'player1';
    let player1Moves = [];
    let player2Moves = [];
    const maxMovesPerPlayer = 3;
    const boardSize = 3;
    const boardContainer = document.getElementById('tic-tac-toe-board');


    boardContainer.innerHTML = '';

    function createCell(i, j, number) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.i = i;
        cell.dataset.j = j;
        cell.age = 0;
        cell.dataset.number = number;
        return cell;
    }

    function renderBoard() {
        let cellNumber = 1;
        for (let i = 0; i < boardSize; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < boardSize; j++) {
                row.appendChild(createCell(i, j, cellNumber));
                cellNumber+=1;
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

                cell.age = 2;

                playerQueue.push({
                    player: currentPlayer, 
                    position: { 
                        i: parseInt(cell.dataset.i), 
                        j: parseInt(cell.dataset.j) },
                    number: parseInt(cell.dataset.number)});

                if (playerQueue.length > maxMovesPerPlayer){
                    const oldestCell = document.querySelector(`
                        [data-i="${playerQueue[0].position.i}"]
                        [data-j="${playerQueue[0].position.j}"]`);

                    oldestCell.style.backgroundColor = '';
                    oldestCell.age = 0;
                    console.log(oldestCell);
                    playerQueue.shift();
                }
                if (playerQueue.length == maxMovesPerPlayer){
                    const fadingCell = document.querySelector(`[data-i="${playerQueue[0].position.i}"][data-j="${playerQueue[0].position.j}"]`);

                    fadingCell.style.backgroundColor = currentPlayer === 'player1'? '#993333' : '#003399';
                    cell.age = 1;
                }
                console.log(playerQueue);

                cell.style.backgroundColor = currentPlayer === 'player1'? 'red' : 'blue';
                if (checkWinner(playerQueue)) { console.log(`${currentPlayer} wins`);}
                
                currentPlayer = currentPlayer === 'player1'? 'player2' : 'player1';
            }
            else if (cell.age == 1) {
                if(currentPlayer === 'player1' && cell.style.backgroundColor === "#993333" ||
                   currentPlayer === 'player2' && cell.style.backgroundColor === "#003399") {
                    cell.age = 0;
                }
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


function checkWinner(playerMoves) {
    const winningCombinations = [
        [1, 2, 3], // Top row
        [4, 5, 6], // Middle row
        [7, 8, 9], // Bottom row
        [1, 4, 7], // Left column
        [2, 5, 8], // Middle column
        [3, 6, 9], // Right column
        [1, 5, 9], // Diagonal from top left to bottom right
        [3, 5, 7] // Diagonal from top right to bottom left
    ];

    for (let combination of winningCombinations) {
        const [first, second, third] = combination;
        const sortedNumbers = playerMoves.filter(move => 
            move.number === first || 
            move.number === second || 
            move.number === third);
            
        sortedNumbers.sort((a, b) => a.number - b.number);

        if (sortedNumbers.length === 3 && 
            sortedNumbers[0].number === first && 
            sortedNumbers[1].number === second && 
            sortedNumbers[2].number === third) {
            return true;
        }
    }

    return false;
}
