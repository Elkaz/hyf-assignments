function getRenderedGame(position) {
  const rows = position.length;
  const columns = position[0].length;
  const topBottomBorder = "*******";
  let result = topBottomBorder + "\n";
  for (let i = 0; i < rows; i++) {
    let line = "*";
    for (let j = 0; j < columns; j++) {
      let cell = position[i][j];
      line += cell + "*";
    }
    result += line + "\n";
  }
  result += topBottomBorder;

  return result;
}

const position = [
  ["x", "o", " "],
  [" ", "o", " "],
  [" ", "o", "x"],
];
const renderedGame = getRenderedGame(position);
console.log(renderedGame);

function getGameInfo(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== " " &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      const winner = board[i][0];
      const loser = winner === "x" ? "o" : "x";
      return { winner, loser, hasEnded: true };
    }
  }
  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== " " &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      const winner = board[0][j];
      const loser = winner === "x" ? "o" : "x";
      return { winner, loser, hasEnded: true };
    }
  }
  // Check diagonals
  if (
    board[0][0] !== " " &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    const winner = board[0][0];
    const loser = winner === "x" ? "o" : "x";
    return { winner, loser, hasEnded: true };
  }
  if (
    board[0][2] !== " " &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    const winner = board[0][2];
    const loser = winner === "x" ? "o" : "x";
    return { winner, loser, hasEnded: true };
  }

  return { winner: null, loser: null, hasEnded: false };
}

let board1 = [
  ["x", "o", " "],
  [" ", "o", " "],
  [" ", "o", "x"],
];

console.log(getGameInfo(board1));

const board2 = [
  ["x", "o", " "],
  [" ", " ", " "],
  [" ", "o", "x"],
];

console.log(getGameInfo(board2));
