class Gomoku {
  constructor(size = 15) {
    this.size = size;
    this.board = this.createBoard(size);

    // X for player 1, black 
    // O for player 2, white
    this.currentPlayer = "X";
  }

  createBoard(size) {
    return new Array(size).fill(null).map(() => new Array(size).fill("."));
  }

  printBoard() {
    this.board.forEach((row) => console.log(row.join(" ")));
  }

  placePiece(row, col) {
    if ( row > this.size || col > this.size || row < 0 || col < 0) {
      console.log(`Invalid move, row ${row} and col ${col} are out of bounds`);
      return;
    }
    
    if (this.board[row][col] === ".") {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWin(row, col)) {
        console.log(`Player ${this.currentPlayer} wins!`);
        return true;
      }
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    } else {
      console.log("Invalid move. Try again.");
    }
    return false;
  }

  checkWin(row, col) {
    // Check all directions: horizontal, vertical, diagonal (left-right, right-left)
    const directions = [
      { dr: 0, dc: 1 }, // Horizontal
      { dr: 1, dc: 0 }, // Vertical
      { dr: 1, dc: 1 }, // Diagonal (left-right)
      { dr: 1, dc: -1 }, // Diagonal (right-left)
    ];

    for (let { dr, dc } of directions) {
      let count = 1;

      // Check one direction
      count += this.countDirection(row, col, dr, dc);
      // Check the opposite direction
      count += this.countDirection(row, col, -dr, -dc);

      if (count >= 5) return true; // Win condition
    }

    return false;
  }

  countDirection(row, col, dr, dc) {
    let count = 0;
    let r = row + dr,
      c = col + dc;
    while (
      r >= 0 &&
      r < this.size &&
      c >= 0 &&
      c < this.size &&
      this.board[r][c] === this.currentPlayer
    ) {
      count++;
      r += dr;
      c += dc;
    }
    return count;
  }


}


module.exports = Gomoku;
