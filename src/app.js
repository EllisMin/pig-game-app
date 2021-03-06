var scores, curTotalScore, activePlayer, isPlaying;
var prevRollSix; // On rolling 6 in a row switches turn
var diceTwo;
var winningScore = 50; // inclusive
init();

// Roll btn
document.querySelector(".btn-roll").addEventListener("click", function() {
  var diceDOM = document.querySelector(".dice-img");

  // Remove animation
  diceDOM.classList.remove("fade-out");
  diceDOM.classList.remove("roll");
  void diceDOM.offsetWidth; // used to restart animation

  // get rand# btwn 1 - 6
  var dice = Math.floor(Math.random() * 6) + 1;
  // var dice = Math.floor(Math.random() * 3) + 4; ///

  // display dice with rand generated#
  diceDOM.style.display = "block";
  diceDOM.src = "./img/" + dice + ".png";

  if (!diceTwo) {
    if (prevRollSix && dice === 6) {
      // player loses total score
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      diceDOM.classList.add("fade-out");
      switchPlayer();
    } else if (dice === 1) {
      // Fade in effect
      diceDOM.classList.add("fade-out");
      switchPlayer();
    } else {
      if (dice === 6) prevRollSix = true;
      else prevRollSix = false;
      // roll animation
      diceDOM.classList.add("roll");
      curTotalScore += dice;
      document.getElementById("cur-" + activePlayer).innerHTML = curTotalScore;
    }
  }
  // Playing with 2 dices
  else {
    var dice2DOM = document.querySelector(".dice-img-2");
    dice2DOM.classList.remove("fade-out");
    dice2DOM.classList.remove("roll");
    void dice2DOM.offsetWidth;

    var dice2 = Math.floor(Math.random() * 6) + 1;
    dice2DOM.style.display = "block";
    dice2DOM.src = "./img/" + dice2 + ".png";

    if (prevRollSix && (dice === 6 || dice2 === 6)) {
      // player loses total score
      scores[activePlayer] = 0;
      document.getElementById("score-" + activePlayer).textContent = "0";
      diceDOM.classList.add("fade-out");
      dice2DOM.classList.add("fade-out");
      switchPlayer();
    } else if (dice === 1 || dice2 === 1) {
      // Fade in effect
      diceDOM.classList.add("fade-out");
      dice2DOM.classList.add("fade-out");
      switchPlayer();
    } else {
      if (dice === 6 || dice2 === 6) prevRollSix = true;
      else prevRollSix = false;
      // roll animation
      diceDOM.classList.add("roll");
      dice2DOM.classList.add("roll");
      curTotalScore = curTotalScore + dice + dice2;
      document.getElementById("cur-" + activePlayer).innerHTML = curTotalScore;
    }
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

  prevRollSix = false;
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
  rolledSix = false;

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
  var inputDOM = document.getElementById("new-score-input");
  inputDOM.placeholder = "winning score: " + winningScore;
  inputDOM.value = "";

  useOneDice();
  // Uncheck
  document.getElementById("modified-checkbox").checked = false;
}
// Update new score
document.querySelector(".btn-update").addEventListener("click", function() {
  var inputDOM = document.getElementById("new-score-input");
  var input = inputDOM.value;

  // input: undefined, 0, null, or "" are COERCED to false
  // isNan: return true if variable does NOT contain a valid number; 123 and '123' are both valid
  if (input && !isNaN(input)) {
    winningScore = input;
    // Update UI
    inputDOM.placeholder = "winning score: " + winningScore;
    inputDOM.value = "";
  } else {
    alert("Type in number to update a new winning score");
  }
});

// slider to use 2 dices
document
  .getElementById("modified-checkbox")
  .addEventListener("change", function() {
    // Add a dice
    if (this.checked) {
      diceTwo = true;
      document.querySelector(".dice-img-2").src = "./img/7.png";
      document.querySelector(".dice-img").style.display = "block";
      document.querySelector(".dice-img-2").style.display = "block";
      document.querySelector(".dice-container").classList.add("separate-dice");
    }
    // Back to one dice
    else {
      useOneDice();
    }
  });

// Show rules
document.querySelector(".btn-rule").addEventListener("click", () => {
  document.getElementById("rule-container").classList.add("show-rules");
});
// close rules
document.querySelector(".btn-close").addEventListener("click", () => {
  document.getElementById("rule-container").classList.remove("show-rules");
});

function useOneDice() {
  document.querySelector(".dice-img-2").style.display = "none";
  diceTwo = false;
  document.querySelector(".dice-container").classList.remove("separate-dice");
}
