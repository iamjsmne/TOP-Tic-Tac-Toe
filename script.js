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
    
    const restartBoard = () => {
        gameBoard.fill("");
        getBoard();
    }

    return { getBoard, restartBoard};
})();
function Grid() {
    let value = "";
    let getValue = () => value;
    let getMarker = (marker) => (value = marker);
    return { getValue, getMarker };
}

const displayController = (()=> {
    const messageElement = document.getElementById('message');
    const gameGridElement = document.getElementsByClassName('gameGrid');

    const setMessageElement = (message) => {
        messageElement.textContent = message;
    }

    return { setMessageElement}
})();

const gameController = (() => {

    displayController.setMessageElement('HelloBye');

})();


/*
const displayController = (() =>{
    const gameGridElement = document.createElement('div');
    gameGridElement.classList.add('gameGrid');
    document.getElementById('gameBoard').appendChild(gameGridElement);
    const gameGrid = document.getElementsByClassName('gameGridElement');


    return { gameGridElement };
})();*/




function createPlayer(name, marker, score) {
    return { name, marker, score}
}


/*
function GameController() {
    const player1 = createPlayer("Player 1", "O", 0);
    const player2 = createPlayer("Player 2", "X", 0);
    const players = [player1, player2];
    let currentPlayer = players[0];
    GameBoard();

}
GameController();*/