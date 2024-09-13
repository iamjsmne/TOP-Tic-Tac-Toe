const GameBoard = (() => {
    let gameBoard = [];
    //create board & it's grid *NEED THIS*
    const rows = 3;
    const cols = 3;

    for(let i = 0; i < rows; i++) { //row
        gameBoard[i] = [];
        for(let j = 0; j < cols; j++) {//cols
            gameBoard[i].push(Grid().getValue());
            getGameGrid();
        }
    }
    const getBoard = () => gameBoard;
    
    function getGameGrid() {
        const gameGridElement = document.createElement('div');
        gameGridElement.classList.add('gameGrid');
        document.getElementById('gameBoard').appendChild(gameGridElement);

        return gameGridElement;
    }
    
    const resetBoard = () => {
        gameBoard.fill("");
        getBoard();
    }

    return { getBoard, resetBoard};
})();
function Grid() {
    let value = "";
    let getValue = () => value;
    let getMarker = (marker) => (value = marker);
    return { getValue, getMarker };
}
function createPlayer(name, marker, score) {
    return { name, marker, score}
}

const DisplayController = (()=> {
    const messageElement = document.getElementById('message');
    const resetBtnElement = document.getElementById('resetButton');
    /*const player1Score = document.getElementById('player1Score');
    const player2Score = document.getElementById('player2Score');*/

    const setMessage = (message) => {
        messageElement.textContent = message;
    }

    resetBtnElement.addEventListener('click', () => {
        GameBoard.resetBoard();
    });
    

    return { setMessage }
})();

/*
const displayController = (() =>{
    const gameGridElement = document.createElement('div');
    gameGridElement.classList.add('gameGrid');
    document.getElementById('gameBoard').appendChild(gameGridElement);
    const gameGrid = document.getElementsByClassName('gameGridElement');
    gameGridElement.addEventListener('click', (event)=> {
        const { target } = event;
        target.textContent = players[0].marker;
        alert("hi");
    })

    return { gameGridElement };
})();*/

function GameController() {
    const player1 = createPlayer("Player 1", "O", 0);
    const player2 = createPlayer("Player 2", "X", 0);
    const players = [player1, player2];
    let currentPlayer = players[0];
    
    const switchPlayer = () => {
        if(currentPlayer === players[0]) {
            currentPlayer = players[1];
        } else {
            currentPlayer = players[0];
        }
        displayController.setMessageElement(`${currentPlayer.name}'s turn!`);
    }

    const checkBoard = () => {
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
        for(let winStat of winningStats) {
            const [position1, position2, position3] = winStat;

            if (
                gameBoard[position1] !== '' &&
                gameBoard[position1] === gameBoard[position2] &&
                gameBoard[position1] === gameBoard[position3] 
            ) {
                alert(`${gameBoard[position1]}'s wins!`);
                return;
            }
        }
        const allGridMarked = gameBoard.every(grid => grid !== '');
        if(allGridMarked) {
            alert('It\'s a draw!');
        }
    }

    return { switchPlayer, checkBoard }
}
GameController();