export const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const computeWinner = (player, gameData) => {
  if (gameData.gameOver) return;

  const combo = winningCombinations.find((combination) =>
    combination.every((index) => gameData.moves[index] === player)
  );

  if (combo) {
    return combo;
  } else if (gameData.moveCount == 9) {
    return false;
  }
};

export function checkOutcome(board) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every((cell) => cell !== null)) {
    return "TIE";
  }
  return null;
}

export const minimax = (board, depth, isMaximizing) => {
  const scores = { X: -1, O: 1, TIE: 0 };
  const winner = checkOutcome(board);
  if (winner !== null) {
    return scores[winner];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "X";
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

export const bestMove = (moves) => {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < moves.length; i++) {
    if (moves[i] === null) {
      moves[i] = "O";
      let score = minimax(moves, 0, false);
      moves[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};
