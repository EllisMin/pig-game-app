var scores, curTotalScore, activePlayer, isPlaying;

var winningScore = 15; // inclusive
init();

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
    document.getElementById("cur-" + activePlayer).innerHTML = curTotalScore;
  }
});

// Hold Btn
document.querySelector(".btn-hold").addEventListener("click", function() {
  // Update score
  scores[activePlayer] += curTotalScore;
  document.getElementById("score-" + activePlayer).innerHTML =
    scores[activePlayer];
  // Winning score achieved
  if (scores[activePlayer] >= winningScore) {
    var nameDOM = document.getElementById("name-" + activePlayer);
    nameDOM.innerHTML = "Winner!";
    nameDOM.classList.add("winner-text");

    // isPlaying = false;
    // Hide UIs
    document.querySelector(".btn-roll").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
    document.querySelector(".dice-img").style.display = "none";
  } else {
    switchPlayer();
  }
});

function switchPlayer() {
  // update cur to 0
  curTotalScore = 0;
  document.getElementById("cur-" + activePlayer).innerHTML = 0;

  // Update user
  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // Update active class, alternative to remove/add class
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// New Game
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  // Reset Score
  scores = [0, 0];
  curTotalScore = 0;
  if (activePlayer !== undefined) {
    var nameDOM = document.getElementById("name-" + activePlayer);
    nameDOM.innerHTML = "player " + (activePlayer + 1);
    nameDOM.classList.remove("winner-text");
  }
  activePlayer = 0;
  // State variable
  // isPlaying = true;

  // handle UI
  document.querySelector(".btn-roll").style.display = "inline";
  document.querySelector(".btn-hold").style.display = "inline";
  document.querySelector(".dice-img").style.display = "none";
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("cur-0").textContent = "0";
  document.getElementById("cur-1").textContent = "0";
}
