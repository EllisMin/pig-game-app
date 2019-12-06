var scores = [0, 0];
var curTotalScore = 0;
var activePlayer = 0;

/* Change current dice # */
// textContent() gets the content of all elements, including <script> and <style> elements
// document.querySelector("#cur-" + activePlayer).textContent = dice;

// In contrast, innerText() only shows “human-readable” elements
// document.querySelector("#cur-" + activePlayer).innerHTML =
//   "<em>" + dice + "</em>";

// Also possible to access  like this
// var x = document.querySelector("#score-0").innerHTML;
// console.log(x);

// Changing CSS property
document.querySelector(".dice-img").style.display = "none";

// Event listener for roll btn
// btn is a callback fcn; fun passed as an argument
// document.querySelector(".btn-roll").addEventListener("click", btn);
// function btn() {}

// Anonymous function; function that's used only here; has no usability
document.querySelector(".btn-roll").addEventListener("click", function() {
  // 1. get rand# btwn 1 - 6
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. display dice with rand generated#
  var diceDOM = document.querySelector(".dice-img");
  diceDOM.style.display = "block";
  diceDOM.src = "./img/" + dice + ".png";

  // 3. update curTotalScore if rolled# wasn't 1
  if (dice === 1) {
    switchPlayer();
  } else {
    curTotalScore += dice;

    // Selects by id. Faster; exclude '#'
    document.getElementById("cur-" + activePlayer).innerHTML = curTotalScore;
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
//   console.log(scores); ///

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

  activePlayer = activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
}
