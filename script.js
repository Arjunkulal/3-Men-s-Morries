document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let moves = { X: 3, O: 3 };
    let phase = "placing";

    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function checkWinner(player) {
        return winningCombinations.some(combination => {
            return combination.every(index => board[index] === player);
        });
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (phase === "placing") {
            if (!board[index]) {
                board[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                moves[currentPlayer]--;
                if (checkWinner(currentPlayer)) {
                    alert(`Player ${currentPlayer} wins!`);
                    resetGame();
                    return;
                }
                if (moves.X === 0 && moves.O === 0) {
                    phase = "moving";
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerDisplay.textContent = currentPlayer;
            }
        } else if (phase === "moving") {
            if (board[index] === currentPlayer) {
                board[index] = null;
                event.target.textContent = "";
                phase = "placingMove";
            }
        } else if (phase === "placingMove") {
            if (!board[index]) {
                board[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                if (checkWinner(currentPlayer)) {
                    alert(`Player ${currentPlayer} wins!`);
                    resetGame();
                    return;
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerDisplay.textContent = currentPlayer;
                phase = "moving";
            }
        }
    }

    function resetGame() {
        board = Array(9).fill(null);
        moves = { X: 3, O: 3 };
        phase = "placing";
        currentPlayer = "X";
        currentPlayerDisplay.textContent = currentPlayer;
        cells.forEach(cell => (cell.textContent = ""));
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
});