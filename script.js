function GameBoard() {
    let gameBoard = [];
    //create board & it's grid *NEED THIS*
    const rows = 3;
    const cols = 3;
    let gridNo = 0;

    for(let i = 0; i < rows; i++) { //row
        gameBoard[i] = [];
        for(let j = 0; j < cols; j++) {//cols
            gameBoard[i].push(Cell().getValue());
            getGameGrid();
            gridNo++;
        }
    }
    const getBoard = () => gameBoard;

    const resetBoard = () => {
        gameBoard.fill("");

    };

    return { getBoard, resetBoard};
}
function Cell() {
    let value = "";
    let getValue = () => value;
    let getMarker = (marker) => (value = marker);
    return { getValue, getMarker };
}

function getGameGrid() {
    const gameGridElement = document.createElement('div');
    gameGridElement.classList.add('gameGrid');
    document.getElementById('gameBoard').appendChild(gameGridElement);
    gameGridElement.addEventListener('click', (event)=> {
        const { target } = event;
        alert("hi");
    })
    return gameGridElement;
}

function createPlayer(name, marker, score) {
    return { name, marker, score };
}

const player1 = createPlayer('Player 1', "O", 0);
const player2 = createPlayer('Player 2', "X", 0);

function displayController() {

}



GameBoard();
displayController();