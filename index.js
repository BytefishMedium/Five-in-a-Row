const readline = require('readline');

const Gomoku = require('./Gomoku');

function startGame(game) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question(
      `Player ${game.currentPlayer}, enter row and column (e.g., 3 4): `,
      (answer) => {
        const [row, col] = answer.split(" ").map(Number);

        if (game.placePiece(row, col)) {
          game.printBoard();
          console.log(`Game Over. Player ${game.currentPlayer} wins!`);
          rl.close();
        } else {
          game.printBoard();
          askQuestion();
        }
      },
    );
  };

  game.printBoard();
  askQuestion();
}

let game = new Gomoku()
startGame(game)