const GameBoard = (() => {
    const gameBoard = Array(9).fill("");
    //get gameboard array
    const getGameBoard = () => gameBoard;
    //create gameboard grid
    let gridNo = 0;

    const createGameGrid= () => {
        const gameGrid = document.createElement('div');
        gameGrid.classList.add('game-cell');
        gameGrid.setAttribute('id', gridNo);
        document.getElementById('game-board').appendChild(gameGrid);
        gridNo++;
        return gameGrid;
    }

    gameBoard.forEach(() => createGameGrid());

    const resetGameBoard = () => { //Linked with DisplayController.
        function removeGameCell(name) {
            const gameGridElement = document.getElementsByClassName(name);
            //remove first element(index 0) always because wehn you remove element
            //it also shrinks the elements array
            while(gameGridElement.length > 0) {
                gameGridElement[0].parentNode.removeChild(gameGridElement[0]);
            }
        }
        removeGameCell('game-cell');
        gameBoard.fill("");
        gridNo = 0;
        gameBoard.forEach(() => createGameGrid());
    }

    console.log(gameBoard);
    return {gameBoard, getGameBoard, createGameGrid, resetGameBoard}
})();

const DisplayController = (() => {
    const headerMessage = document.getElementById('header-message');
    const resetBtn = document.getElementById('reset-button');

    const changeMessage = (player) => { //works
        headerMessage.textContent = `${player}'s turn!`;
    };

    resetBtn.addEventListener('click', () => {
        GameBoard.resetGameBoard(); //linked
        GameController.resetGame();
    })

    return { headerMessage, changeMessage }
})();

const createPlayer = (name,marker) => {
    return {name, marker}; 
}

const GameController = (() => {
    const gameBoard = document.getElementById('game-board');
    const resetBtn = document.getElementById('reset-button');

    const playerOne = createPlayer("Player One", "O");
    const playerTwo = createPlayer("Player Two", "X");
    const players = [playerOne, playerTwo];
    let currentPlayer = players[0];
    
    const resetGame= () => {
        gameBoard.addEventListener('click', playGame, true);
    }
    const switchPlayer = () => {
        if(currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
    }

    gameBoard.addEventListener('click', playGame, true);

    const updateGameBoard = (gridNo, playerMarker) => {
        GameBoard.gameBoard[gridNo] = playerMarker;
        return GameBoard.getGameBoard;
    }

    const checkBoard = () => {
        //gameBoard
        //['0'. '1', '2']
        //['3', '4', '5']
        //['6', '7', '8']
        const winningStats = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(let winState of winningStats) {
            const [position1, position2, position3] = winState;
            
            if (
                GameBoard.gameBoard[position1] !== '' && 
                GameBoard.gameBoard[position1] === GameBoard.gameBoard[position2] && 
                GameBoard.gameBoard[position1] === GameBoard.gameBoard[position3]
            ) {
                alert(`${GameBoard.gameBoard[position1]}'s wins!`);
                gameBoard.removeEventListener('click', playGame, true);
                return;
                 //this prevents allCellsUsed from alert it's a draw
            }
    
        }
        const allCellsUsed = GameBoard.gameBoard.every(cell => cell !== '');
        if(allCellsUsed) {
            alert(`It's a draw!`);
        }
    }

    
    
    function playGame(e) {
        let grid = e.target;
        let gridId = grid.id;
        if(grid.className == 'game-cell') {
            if(grid.textContent === "") {
                grid.textContent = currentPlayer.marker;
                GameBoard.gameBoard[gridId] = currentPlayer.name;
                updateGameBoard(gridId, currentPlayer.marker);
                checkBoard();
                switchPlayer();
            }
        }
    }
    
    const getCurrentPlayer = () => alert(currentPlayer.name); //testing purpose

    return{ gameBoard, switchPlayer, getCurrentPlayer, updateGameBoard, checkBoard, playGame, resetGame}
})();


