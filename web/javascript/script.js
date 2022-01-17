// Set Music & Volume :
var mySong = document.getElementById("mySong");
var icon = document.getElementById("icon");

icon.onclick = function() {
 if(mySong.paused) {
   mySong.play();
   icon.src = "./assets/img/pause.png";
 } else {
  mySong.pause();
  icon.src = "./assets/img/play.png";
 }
}

var volumeAudio = document.getElementById("mySong");
volumeAudio.volume = 0.08;

// Set Click Mouse :
var clickMouse = document.getElementById("clickMouse");
var hold = document.querySelector(".btn-hold");

hold.onclick = function() {
    clickMouse.play();
}

// Set Roll Dice Sound :
var soundDice = document.getElementById("roll-dice");
var btnSound = document.querySelector(".btn-roll");

btnSound.onclick = function() {
    soundDice.play(); 

}


// MODALS
const playerTitleUnInput = document.getElementById('playerTitleUnInput');
const playerTitleDeuxInput = document.getElementById('playerTitleDeuxInput');
// Player Title
const playerTitleUn = document.querySelector('.player-name');
const playerTitleDeux = document.querySelector('.player-name-1');
// Set Players :
const startGameButton = document.querySelector('.btn-new');
startGameButton.addEventListener("click", function() {
 
  // Personnalised Names
  playerTitleUn.innerHTML = playerTitleUnInput.value.charAt(0).toUpperCase() + playerTitleUnInput.value.slice(1);
  playerTitleDeux.innerHTML = playerTitleDeuxInput.value.charAt(0).toUpperCase() + playerTitleDeuxInput.value.slice(1);
  if (playerTitleUn.innerText === '') {
    playerTitleUn.innerHTML = 'Player 1'
  }
  if (playerTitleDeux.innerText === '') {
    playerTitleDeux.innerHTML = 'Player 2'
  }
});

// Start
let scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "./assets/img/dice-" + dice + ".png";

    // 3. Update the round score IF the rolled number was NOT a 1
    if (dice !== 1) {
      // Add score
      roundScore += dice;
      document.getElementById( "current-" + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// HOLD button
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".dice").style.display = "block";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      let winner = document.getElementById("winner");
      winner.play();
      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  document.querySelector(".dice").style.display = "block";
}

// NEW-GAME button
document.querySelector(".btn-new").addEventListener("click", init);

  function init() {
  // Reseting score vars
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  // Reseting allscores
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // Removing classes from panels
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}


