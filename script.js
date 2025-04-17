const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";

const WINNING_COMBINATIONS = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

restartBtn.addEventListener("click", startGame);

startGame();

function startGame() {
  currentPlayer = "X";
  popup.classList.add("hidden");
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("disabled");
    cell.addEventListener("click", handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  cell.innerText = currentPlayer;
  cell.classList.add("disabled");

  if (checkWin(currentPlayer)) {
    showPopup(`${currentPlayer} Wins!`);
  } else if (isDraw()) {
    showPopup("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(comb => {
    return comb.every(index => {
      return cells[index].innerText === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => cell.innerText !== "");
}

function showPopup(message) {
  popupMessage.innerText = message;
  popup.classList.remove("hidden");
  cells.forEach(cell => cell.classList.add("disabled"));
}
