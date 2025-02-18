

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    const winnerModal = document.getElementById("winnerModal");
    const winnerMessage = document.getElementById("winnerMessage");
    const restartButton = document.getElementById("restartButton");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let moves = { X: 3, O: 3 };
    let phase = "placing";
    let selectedPieceIndex = null; // Track the selected piece for moving

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

        // If it's the placing phase
        if (phase === "placing") {
            if (!board[index]) {
                board[index] = currentPlayer;
                event.target.textContent = currentPlayer;
                moves[currentPlayer]--;
                if (checkWinner(currentPlayer)) {
                    winnerMessage.textContent = `Player ${currentPlayer} Wins! 🎉`; // Winner message
                    winnerModal.style.display = "flex"; // Show winner modal
                    return;
                }
                if (moves.X === 0 && moves.O === 0) {
                    phase = "moving";
                }
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerDisplay.textContent = currentPlayer;
            }
        } 

        // If it's the moving phase, allow selecting a piece
        else if (phase === "moving") {
            if (board[index] === currentPlayer) {
                // If the player selects a piece, highlight it
                if (selectedPieceIndex !== null) {
                    // Remove highlight from previously selected piece
                    cells[selectedPieceIndex].classList.remove('selected');
                }
                selectedPieceIndex = index; // Track the selected piece
                event.target.classList.add('selected'); // Highlight the selected piece
                phase = "placingMove"; // Transition to the move phase
            }
        } 

        // If it's the placingMove phase, allow placing the piece in a new cell
        else if (phase === "placingMove") {
            // Ensure the player is not moving the piece back to the same spot
            if (!board[index] && index !== selectedPieceIndex) {
                board[index] = currentPlayer;
                board[selectedPieceIndex] = null; // Clear the original position
                event.target.textContent = currentPlayer;
                cells[selectedPieceIndex].textContent = ""; // Clear the original cell

                // Remove highlight from the selected cell after the move
                cells[selectedPieceIndex].classList.remove('selected');
                selectedPieceIndex = null; // Reset selected piece

                if (checkWinner(currentPlayer)) {
                    winnerMessage.textContent = `Player ${currentPlayer} Wins! 🎉`; // Winner message
                    winnerModal.style.display = "flex"; // Show winner modal
                    return;
                }

                currentPlayer = currentPlayer === "X" ? "O" : "X";
                currentPlayerDisplay.textContent = currentPlayer;

                phase = "moving"; // Go back to the moving phase
            }
        }
    }

    function resetGame() {
        board = Array(9).fill(null);
        moves = { X: 3, O: 3 };
        phase = "placing";
        currentPlayer = "X";
        currentPlayerDisplay.textContent = currentPlayer;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('selected'); // Remove selection highlight
        });
        winnerModal.style.display = "none"; // Hide winner modal
    }

    cells.forEach(cell => cell.addEventListener("click", handleClick));
});

