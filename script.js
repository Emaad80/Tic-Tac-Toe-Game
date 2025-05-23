let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");
let turn = "X";
let isgameover = false;

//Function to Change the Turn
const changeTurn = () => {
  return turn === "X" ? "0" : "X";
};

//Function to Check for a Win
const checkWin = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  let wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15 , 45],
    [2, 4, 6, 5, 15, 135],
  ];
  wins.forEach((e) => {
    if (
      boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
      boxtext[e[0]].innerText !== ""
    ) {
      document.querySelector(".Info").innerText =
        boxtext[e[0]].innerText + " Won";
      isgameover = true;
      music.play();
      document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });
};
// Check if all boxes are filled
const isDraw = () => {
  let boxtext = document.getElementsByClassName("boxtext");
  return Array.from(boxtext).every((element) => element.innerText !== "");
};

// Game Logic
let box = document.getElementsByClassName("box");
Array.from(box).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        if (isDraw()) {
          document.getElementsByClassName("Info")[0].innerText = "It's a Draw!";
          gameover.play(); // Play gameover music if it's a draw
        } else {
          document.getElementsByClassName("Info")[0].innerText =
            "Turn for  " + turn;
        }
      }
    }
  });
});
//Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
  let boxtext = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxtext.innerText === "") {
      boxtext.innerText = turn;
      turn = changeTurn();
      audioTurn.play();
      checkWin();
      if (!isgameover) {
        document.getElementsByClassName("Info")[0].innerText =
          "Turn for  " + turn;
      }else {
        gameover.play(); // Play loss music if game is over
      }
    }
  });
});
//Add onClick listener to reset button
reset.addEventListener("click", () => {
  let boxtexts = document.querySelectorAll(".boxtext");
  Array.from(boxtexts).forEach((element) => {
    element.innerText = "";
  });
  turn = "X";
  isgameover = false;
  document.getElementsByClassName("Info")[0].innerText = "Turn for  " + turn;
  document.querySelector(".imgbox").getElementsByTagName("img")[0].style.width = "0px";
  document.querySelector(".line").style.width = "0vw";
  music.pause();
  music.currentTime = 0;
});
