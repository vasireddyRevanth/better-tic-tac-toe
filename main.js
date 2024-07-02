let BASE_CELL_COLOUR = '#4a5054';
let CELL_COLOUR_1 = '#23714b';
let CELL_COLOUR_2 = '#98310b';
let FADING_COLOUR_1 = '#14412B';
let FADING_COLOUR_2 = '#571C06';
let FOCUS_COLOUR_1 = 'rgba(13.7, 43, 29, 1)';
let FOCUS_COLOUR_2 = 'rgba(59.6, 19.2, 4.3, 1)';
let WIN_COLOUR_1 = '#23714b';
let WIN_COLOUR_2 = '#98310b';


document.addEventListener('DOMContentLoaded', function mainGame() {
    
    let currentPlayer = 'Player-1';
    let player1Moves = [];
    let player2Moves = [];
    const maxMovesPerPlayer = 3;
    const boardSize = 3;
    const screenContent = document.getElementById('screen-content');
    const board = document.createElement('div');
    board.id = 'tic-tac-toe-board';
    screenContent.innerHTML = '';

    screenContent.appendChild(board);
    const boardContainer = document.getElementById('tic-tac-toe-board');



    function createCell(i, j, number) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.i = i;
        cell.dataset.j = j;
        cell.age = 0;
        cell.dataset.number = number;
        cell.isHovered = 'notFocus';
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

    function renderButtons(){
        let setting = document.createElement('div');
        setting.classList.add('settingsBtn');
        
        for(let i = 0; i<3;i++){
            let bar = document.createElement('div');
            bar.classList.add('line');
            setting.appendChild(bar);
        }

        screenContent.appendChild(setting);
    
    }

    renderBoard();
    renderButtons();
    
    
    // Check cell clicked
    document.querySelector(".settingsBtn").addEventListener('click', () => {
        settingsModal = document.querySelector('.settings-menu');
        settingsModal.style.display = settingsModal.style.display === "none"? "flex" : "none";        
    });
    
    document.querySelector(".settings-menu").addEventListener('click', () => {
        settingsModal = document.querySelector('.settings-menu');
        settingsModal.style.display = settingsModal.style.display === "none"? "flex" : "none";
    });


    document.querySelectorAll('.square').forEach(square => {
        square.addEventListener('click', function() {
            // Handle click here
            console.log(`Selected option: ${this.dataset.value}`);
        });
    });
    
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        
        cell.addEventListener('mouseover', function() {
            console.log('mouseover');
            // Change the background color when the cell is hovered over
            if (cell.isHovered === 'notFocus') {
                this.style.backgroundColor = currentPlayer === 'Player-1'? FOCUS_COLOUR_1 : FOCUS_COLOUR_2;
                cell.isHovered = 'Focus';
            }
        });
        
        cell.addEventListener('mouseout', function() {
            console.log('mouseout');
            // Only revert the background color if it was changed due to a hover event
            if (cell.isHovered === 'Focus') {
                this.style.backgroundColor = BASE_CELL_COLOUR;
                cell.isHovered = 'notFocus';
            }
        });

        // Function for when player presses cell
        cell.addEventListener('click', () => {
            if(cell.age == 0){
                console.log(`${currentPlayer} played at [${cell.dataset.i}, ${cell.dataset.j}]`);
                if (currentPlayer == 'Player-1'){playerQueue = player1Moves;}
                else{playerQueue = player2Moves;}

                cell.age = 2;
                cell.isHovered='clicked';

                playerQueue.push({
                    player: currentPlayer, 
                    position: { 
                        i: parseInt(cell.dataset.i), 
                        j: parseInt(cell.dataset.j) },
                    number: parseInt(cell.dataset.number)});

                if (playerQueue.length > maxMovesPerPlayer){
                    const oldestCell = document.querySelector(`[data-i="${playerQueue[0].position.i}"][data-j="${playerQueue[0].position.j}"]`);

                    oldestCell.style.backgroundColor = BASE_CELL_COLOUR;
                    oldestCell.isHovered = 'notFocus';
                    oldestCell.age = 0;
                    console.log(oldestCell);
                    playerQueue.shift();

                }
                if (playerQueue.length == maxMovesPerPlayer){
                    const fadingCell = document.querySelector(`[data-i="${playerQueue[0].position.i}"][data-j="${playerQueue[0].position.j}"]`);

                    fadingCell.style.backgroundColor = currentPlayer === 'Player-1'? FADING_COLOUR_1 : FADING_COLOUR_2;
                    // cell.age = 1;
                }
                console.log(playerQueue);

                cell.style.backgroundColor = currentPlayer === 'Player-1'? CELL_COLOUR_1 : CELL_COLOUR_2;
                if (checkWinner(playerQueue)) { 
                    console.log(`${currentPlayer} wins`);

                    winnerScreen(1);
                    // setTimeout(resetBoard, 3000);
                }
                
                currentPlayer = currentPlayer === 'Player-1'? 'Player-2' : 'Player-1';
            }
            else if (cell.age == 1) {
                if(currentPlayer === 'Player-1' && cell.style.backgroundColor === FADING_COLOUR_1 ||
                   currentPlayer === 'Player-2' && cell.style.backgroundColor === FADING_COLOUR_2) {
                    cell.age = 0;
                }
            }
        });
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

    function winnerScreen(set){
        modal = document.querySelector('.gameEnd');
        modal.style.display = set === 1? "flex" : "none";
        // modal.style.backgroundColor = currentPlayer === "Player-1"?'rgba(13.7, 43, 29, 0.15)':'rgba(59.6, 19.2, 4.3, 0.15)';

        title = document.querySelector('#endHead');
        title.textContent = currentPlayer+" Wins";
        
        reButton = document.getElementById('resetButton');
        reButton.style.boxShadow = currentPlayer === 'Player-1'?WIN_COLOUR_1:WIN_COLOUR_2;
        reButton.addEventListener('click', () =>{
            resetBoard();
            modal.style.display = "none";
        });
    }

    function resetBoard() {
        // Reset the board and players
        currentPlayer = 'Player-1';
        player1Moves = [];
        player2Moves = [];
        screenContent.innerHTML = '';
        mainGame();
        winnerScreen(0);
    }



});

