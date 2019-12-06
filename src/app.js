var scores = [0, 0];
var curTotalScore = 0;
var activePlayer = 0;
// Changing CSS property
document.querySelector(".dice-img").style.display = "none";

document.querySelector(".btn-roll").addEventListener("click", function() {
  var diceDOM = document.querySelector(".dice-img");
  // Remove animation
  diceDOM.style.animation = "none";

  // 1. get rand# btwn 1 - 6
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. display dice with rand generated#
  diceDOM.style.display = "block";
  diceDOM.src = "./img/" + dice + ".png";

  // 3. update curTotalScore if rolled# wasn't 1
  if (dice === 1) {
    // Fade in effect
    diceDOM.style.animation = "fadeIn 1.5s forwards ease-in";

    switchPlayer();
  } else {
    curTotalScore += dice;
    // Selects by id. Faster; exclude '#'
    document.getElementById("cur-" + activePlayer).innerHTML = curTotalScore;
  }
});

// Hold Btn
document.querySelector(".btn-hold").addEventListener("click", function() {
  // Update score
  scores[activePlayer] += curTotalScore;
  document.getElementById("score-" + activePlayer).innerHTML =
    scores[activePlayer];

  switchPlayer();
});

function switchPlayer() {
  // update cur to 0
  curTotalScore = 0;
  document.getElementById("cur-" + activePlayer).innerHTML = 0;

  // Update active class & update user
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("active");
}
