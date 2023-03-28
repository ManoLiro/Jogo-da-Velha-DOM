//Variaveis Globais
const GameBoard = document.querySelectorAll("#gameBoard span");
let vBoard = [];
let Board3D = [[]];
let turnPlayer = "player1";

function ChangeTitle() {
  const PlayerName = document.getElementById(turnPlayer);
  const span = document.getElementById("turnPlayer");
  span.innerText = PlayerName.value;
}

function ChangeTitleWin() {
  const PlayerName = document.getElementById(turnPlayer);
  const span = document.getElementById("turnPlayer");
  span.innerText = PlayerName.value + " Venceu!";
}

document.getElementById("start").addEventListener("click", initialize);

function initialize() {
  vBoard = [];
  Board3D = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  turnPlayer = "player1";
  ChangeTitle();
  GameBoard.forEach(function (square) {
    square.classList.remove("win");
    square.classList.add("cursor-pointer");
    square.innerText = "";
    square.addEventListener("click", SquareClick);
  });
}

function SquareClick(Square) {
  if (turnPlayer == "player1") {
    Square.currentTarget.innerText = "X";
    Square.currentTarget.classList.remove("cursor-pointer");
    Square.currentTarget.removeEventListener("click", SquareClick);
    let region = Square.currentTarget.dataset.region;
    vBoard.push(region);
    let RowAndColumns = region.split(".");
    let row = RowAndColumns[0];
    let Column = RowAndColumns[1];
    Board3D[row][Column] = "X";
    turnPlayer = "player2";
  } else {
    Square.currentTarget.innerText = "O";
    Square.currentTarget.classList.remove("cursor-pointer");
    Square.currentTarget.removeEventListener("click", SquareClick);
    let region = Square.currentTarget.dataset.region;
    vBoard.push(region);
    let RowAndColumns = region.split(".");
    let row = RowAndColumns[0];
    let Column = RowAndColumns[1];
    Board3D[row][Column] = "O";
    turnPlayer = "player1";
  }
  ChangeTitle();
  let Win = WinSquares();
  if (Win.length > 1) {
    turnPlayer = turnPlayer == "player1" ? "player2" : "player1";
    ChangeTitleWin();
    Win.forEach((element) => {
      document
        .querySelector('[data-region="' + element + '"]')
        .classList.add("win");
    });
    disableAllSquares();
  } else if (vBoard.length == 9) {
    const span = document.getElementById("turnPlayer");
    span.innerText = "Empate!";
  }

  //console.log(Board3D);
}

function disableAllSquares() {
  GameBoard.forEach(function (Square) {
    Square.classList.remove("cursor-pointer");
    Square.removeEventListener("click", SquareClick);
  });
  console.log("Entrou");
}

function WinSquares() {
  let winSquares = [];
  if (
    (Board3D[0][0] == "X" && Board3D[0][1] == "X" && Board3D[0][2] == "X") ||
    (Board3D[0][0] == "O" && Board3D[0][1] == "O" && Board3D[0][2] == "O")
  ) {
    winSquares.push("0.0");
    winSquares.push("0.1");
    winSquares.push("0.2");
  } else if (
    (Board3D[1][0] == "X" && Board3D[1][1] == "X" && Board3D[1][2] == "X") ||
    (Board3D[1][0] == "O" && Board3D[1][1] == "O" && Board3D[1][2] == "O")
  ) {
    winSquares.push("1.0");
    winSquares.push("1.1");
    winSquares.push("1.2");
  } else if (
    (Board3D[2][0] == "X" && Board3D[2][1] == "X" && Board3D[2][2] == "X") ||
    (Board3D[2][0] == "O" && Board3D[2][1] == "O" && Board3D[2][2] == "O")
  ) {
    winSquares.push("2.0");
    winSquares.push("2.1");
    winSquares.push("2.2");
  } else if (
    (Board3D[0][0] == "X" && Board3D[1][0] == "X" && Board3D[2][0] == "X") ||
    (Board3D[0][0] == "O" && Board3D[1][0] == "O" && Board3D[2][0] == "O")
  ) {
    winSquares.push("0.0");
    winSquares.push("1.0");
    winSquares.push("2.0");
  } else if (
    (Board3D[0][1] == "X" && Board3D[1][1] == "X" && Board3D[2][1] == "X") ||
    (Board3D[0][1] == "O" && Board3D[1][1] == "O" && Board3D[2][1] == "O")
  ) {
    winSquares.push("0.1");
    winSquares.push("1.1");
    winSquares.push("2.1");
  } else if (
    (Board3D[0][2] == "X" && Board3D[1][2] == "X" && Board3D[2][2] == "X") ||
    (Board3D[0][2] == "O" && Board3D[1][2] == "O" && Board3D[2][2] == "O")
  ) {
    winSquares.push("0.2");
    winSquares.push("1.2");
    winSquares.push("2.2");
  } else if (
    (Board3D[0][2] == "X" && Board3D[1][1] == "X" && Board3D[2][0] == "X") ||
    (Board3D[0][2] == "O" && Board3D[1][1] == "O" && Board3D[2][0] == "O")
  ) {
    winSquares.push("0.2");
    winSquares.push("1.1");
    winSquares.push("2.0");
  } else if (
    (Board3D[0][0] == "X" && Board3D[1][1] == "X" && Board3D[2][2] == "X") ||
    (Board3D[0][0] == "O" && Board3D[1][1] == "O" && Board3D[2][2] == "O")
  ) {
    winSquares.push("0.0");
    winSquares.push("1.1");
    winSquares.push("2.2");
  }
  return winSquares;
}
