const Gameboard = (function () {
    const board = [];

    const resetBoard = () => {
        for(let i = 0; i < 3; i++) {
            board[i] = [];

            for(let j = 0; j < 3; j++) {
                board[i].push(0);
            }
        }
    }
    resetBoard();

    const setTile = (player, row, column) => {
        board[row][column] = player.token;
    }

    const isGameTied = () => {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(!board[i][j]) {
                    return false;
                }
            }
        }

        return true;
    }

    const getWinner = () => {
        // Check rows
        for(let i = 0; i < 3; i++) {
            if(board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0]) {
                return GameController.player1.token == board[i][0] ? GameController.player1 : GameController.player2;
            }
        }

        // Check columns
        for(let i = 0; i < 3; i++) {
            if(board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i]) {
                return GameController.player1.token == board[0][i] ? GameController.player1 : GameController.player2;
            }
        }

        // Check left diagonals
        if(board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0]) {
            return GameController.player1.token == board[0][1] ? GameController.player1 : GameController.player2;
        }

        // Check right diagonals
        if(board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2]) {
            return GameController.player1.token == board[1][0] ? GameController.player1 : GameController.player2;
        }
    }

    return {board, setTile, resetBoard, isGameTied, getWinner};
})();

function Player(name, token) {
    return {name, token};
}

const GameController = (function () {
    const player1 = Player("Player 1", "x");
    const player2 = Player("Player 2", "o");

    let activePlayer = player1;

    const setActivePlayer = () => {
        activePlayer = activePlayer == player1 ? player2 : player1;
    }

    const playRound = (row, column) => {
        if(!Gameboard.board[row][column]) {
            Gameboard.setTile(activePlayer, row, column);
            console.log(`${activePlayer.token} placed at row ${row} column ${column}.`)
            console.log(Gameboard.board);

            let winner = Gameboard.getWinner();

            if(winner) {
                console.log(`${winner.name} is the winner!`);
                Gameboard.resetBoard();
                activePlayer = player1;
            } else if(Gameboard.isGameTied()) {
                console.log("It's a tie!");
                Gameboard.resetBoard();
                activePlayer = player1;
            } else {
                setActivePlayer();
            }
        }
    }

    return {player1, player2, playRound};
})();