/// Variable for holding available players/characters to be loaded from JSON
let playerList;
/// Create a default "player" in case no JSON is present
///{
///  "players": [
///    {
///      "name": "Juanita",
///      "chanceOfRock": 90,
///      "chanceOfScissors": 100,
///      "chanceOfPaper": 80,
///      "chanceOfSmash": 6,
///      "scoreTarget": 6
///    }
///
const playerDefault = {
    "name": "Juan",
    "avatar": "./img/confused.png",
    "chanceOfRock": 100,
    "chanceOfScissors": 100,
    "chanceOfPaper": 100,
    "chanceOfSmash": 5,
    "scoreTarget": 6
}
/// Variable for holding current selected player
let playerCurrentSelected = playerDefault;
/// Variable for holding history of choices from player
let playerHistory;
/// Variable for holding current choice from player
let playerChoice;
/// Variable for tracking player number of rounds won
let playerScore = 0;
///
/// Computer / AI / BOT Variables
/// List of computer opponents loaded from JSON
let computerList;
///
/// Create a default "computer" in case no JSON is present
///{
///  "opponents": [
///    {
///      "name": "Computer 1",
///      "avatar": "./img/gaming.png",
///      "chanceOfStone": 100,
///      "chanceOfScissors": 100,
///      "chanceOfPaper": 100,
///      "algorithm": "random"
///    }
let computerDefault = {
    "name": "Pick Bot",
    "avatar": "./img/avtar/pickbot.png",
    "chanceOfStone": 100,
    "chanceOfScissors": 100,
    "chanceOfPaper": 100,
    "algorithm": "random"
}
/// Variable for holding selected computer opponent
let computerCurrentSelected;
/// Variable for holding history of choices from computer
let computerHistory;
/// Variable for holding current choice from computer
let computerChoice;
/// Variable for tracking number computer won rounds
let computerScore = 0;

/// GAME Variables
/// Hold current round in the game
let gameCurrentRound = 0;
/// Give rock, paper and scissor a value, to be picked in a random choice
const gameChoiceRock = 1;
const gameChoiceScissors = 2;
const gameChoicePaper = 3;
const gameChoiceSmash = 4;

const backgroundColor = "rgb(173, 216, 230)";
const activeColor = "rgb(141, 5, 239)";

function startGame() {

    computerScore = 0;
    playerScore = 0;
    gameCurrentRound = 0;

    hideButtons();
    showButtons();

    document.getElementById("buttons").style.display = "";
    document.getElementById("gameOver").innerText = "";
}

function loadJSONData() {
    let xmlhttp = new XMLHttpRequest(); // navn på variabel er valgfritt, xhr eller request er vanlige navn, vi valgte å kalle den for xmlhttp
    let url = "https://mainapaina.github.io/RockPaperScissor/json/stuff.json"; // lokale variabler, trenger ikke like godt gjennomtenkt navn
    
    xmlhttp.onreadystatechange = function() {
        // READYSTATE forklaring: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
        // STATUS forklaring: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        if (this.readyState == 4 && this.status == 200) {
            let jsonData = JSON.parse(this.responseText);
            // Teste om variabel er undefined
            if (jsonData["players"] == undefined) {
                playerCurrentSelected = playerDefault;
            }
            else {
                playerList = jsonData.players;
/*                 console.log(playerList); */
            }

            /* Alternativ test om verdi ikke er udefinert. 
            if (jsonData["players"] != undefined) {
                playerList = jsonData.players;
                console.log(playerList);
            }
            else {
                playerCurrentSelected = playerDefault;
            } */

            if (jsonData["opponents"] == undefined) {
                computerCurrentSelected = computerDefault;
            }
            else {
                computerList = jsonData.opponents;
            }

            // IDIOT FORSIKRING!
            // liten sikkerhets mekanisme for å verifisere at playerCurrentSelected er satt eller at playerList har innhold
            if (playerList == undefined && playerCurrentSelected == undefined) {
                playerCurrentSelected = playerDefault;
            }
            else if (playerList != undefined) {
                showPlayerSelection();
            }

            if (computerList == undefined && computerCurrentSelected == undefined) {
                computerCurrentSelected = computerDefault;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function showPlayerSelection() {
    let listDOM = document.getElementById("playerSelectionList");
    let optionDOM;
    for (let i = 0; i < playerList.length; i++) {
        optionDOM = document.createElement("option");
        if (playerList[i].name == playerCurrentSelected.name){
            optionDOM.selected = "selected";
        }
        optionDOM.setAttribute("data-id", i);
        optionDOM.innerText = playerList[i].name + " - First to " + playerList[i].scoreTarget;
        listDOM.appendChild(optionDOM);
    }

    listDOM.addEventListener("change", function() {
        let _selectedPlayer = listDOM.options[listDOM.selectedIndex];
        let selectedIdPlayer = _selectedPlayer.getAttribute("data-id");
/*         console.log(playerList[selectedIdPlayer]); */
        document.getElementById("playerImage").src = playerList[selectedIdPlayer].avatar;
        playerCurrentSelected = playerList[selectedIdPlayer];
        document.getElementById("playerName").innerText = playerList[selectedIdPlayer].name;
    });

}

// funksjon for å lage nytt valg for maskinen
function pickBot(){

    let randomBotPick = Math.floor(Math.random() * 3) + 1;
    switch (randomBotPick){
        case gameChoiceRock: 
            computerChoice = "rock";
            break;
        case gameChoiceScissors:
            computerChoice = "scissors";
            break;
        case gameChoicePaper:
            computerChoice = "paper";
            break;
    }
}


function winCheck(){

    document.getElementById("pickBotChoice").setAttribute("src", "./img/" + computerChoice + ".png");
    document.getElementById("pickBotChoice").style.display = "";

    /// IF playerChoice beats computerChoice (VANILLA)
    /// add 1 to the player score 
    if ((playerChoice == "scissors" && computerChoice == "paper") || 
        (playerChoice == "rock" && computerChoice == "scissors") || 
        (playerChoice == "paper" && computerChoice == "rock") ||
        (playerChoice == "smash")) {
        
        /// Add 1 to player score
        playerScore += 1;
    }
    /// IF playerChoice is equal to computerChoice its a tie, no score to be given
    else if (playerChoice == computerChoice) {

    }
    /// IF else, we assume computer WIN
    else {
        /// Add 1 point to computerScore
        computerScore += 1;
    }
    /// Advance with 1 round
    gameCurrentRound += 1;

    /// Check if 

    if (playerScore >= playerCurrentSelected.scoreTarget || computerScore > playerCurrentSelected){
        setTimeout(endGame, 500);
/* if lives > 0:
  proceed game
 else // lives <= 0
  stop game
  print game over? */
    }

    else {
        setTimeout(cuntGame, 500);
    }

}

function endGame(){
    if (computerScore >= playerCurrentSelected.scoreTarget) {
        document.getElementById("buttons").style.display = "none";
        document.getElementById("gameOver").innerText = "GAME OVER";
        document.getElementById("gameOver").style.color = "black";
    }
    else {
        document.getElementById("buttons").style.display = "none";
        document.getElementById("gameOver").innerText = "CONGRATULATIONS, YOU WIN!";
        document.getElementById("gameOver").style.color = "green";
        renderWrappingConfetti();
    }
}

function cuntGame(){
    showButtons();
    pickBot();
}

function hideButtons(){
    document.getElementById("buttonRock").style.display = "none";
    document.getElementById("buttonScissors").style.display = "none";
    document.getElementById("buttonPaper").style.display = "none";
    document.getElementById("buttonSmash").style.display = "none";
}

function showButtons(){
    let buttonsShown = 0;
    let randomNumber = Math.floor(Math.random() * 100);
    if (playerCurrentSelected.chanceOfRock > randomNumber) {
        document.getElementById("buttonRock").style.display = "";
        // document.getElementById("buttonRock").innerText = "Rock - " + randomNumber;
        document.getElementById("buttonRock").innerText = "Rock";
        buttonsShown++;
    }
    else {
        // console.log("Rock, player - " + playerCurrentSelected.chanceOfRock + ", value - " + randomNumber);
    }
    randomNumber = Math.floor(Math.random() * 100);
    if (playerCurrentSelected.chanceOfScissors > randomNumber) {
        document.getElementById("buttonScissors").style.display = "";
        // document.getElementById("buttonScissors").innerText = "Scissors - " + randomNumber;
        document.getElementById("buttonScissors").innerText = "Scissors";
        buttonsShown++;
    }
    else {
        // console.log("Scissors, player - " + playerCurrentSelected.chanceOfScissors + ", value - " + randomNumber);
    }
    randomNumber = Math.floor(Math.random() * 100);
    if (playerCurrentSelected.chanceOfPaper > randomNumber) {
        document.getElementById("buttonPaper").style.display = "";
        // document.getElementById("buttonPaper").innerText = "Paper - " + randomNumber;
        document.getElementById("buttonPaper").innerText = "Paper";
        buttonsShown++;
    }
    else {
        // console.log("Paper, player - " + playerCurrentSelected.chanceOfPaper + ", value - " + randomNumber);
    }
    randomNumber = Math.floor(Math.random() * 100);
    if (playerCurrentSelected.chanceOfSmash > randomNumber) {
        document.getElementById("buttonSmash").style.display = "";
        // document.getElementById("buttonSmash").innerText = "Smash - " + randomNumber;
        document.getElementById("buttonSmash").innerText = "Smash";
        buttonsShown++;
    }
    else {
        // console.log("Smash, player - " + playerCurrentSelected.chanceOfSmash + ", value - " + randomNumber);
    }

    if (buttonsShown == 0) {
        rollCriticalEndGame();
    }
}

function userPick(choice){

    hideButtons();
    playerChoice = choice;
    document.getElementById("userChoice").style.display = "";
    document.getElementById("userChoice").setAttribute("src", "./img/" + playerChoice + ".png");
    setTimeout(winCheck, 500);   /// check if win
    document.getElementById("pickBotChoice").style.display = "none";
}

function updateStats(){    /*                    tall      tekst        tall      tekst          tall        tekst             */                      
    document.getElementById("stats").innerText = playerScore + " score | " + gameCurrentRound + " Rounds | " + computerScore + " computer score";
}


function updateStatsTimer() {
    setTimeout(updateStatsTimer, 300);
    updateStats();
}

function rollCriticalEndGame() {
    let h1 = document.getElementById("gameOver");
    document.getElementById("buttonStartGame").disabled = "disabled";
    setTimeout(function() { 
        h1.innerText = "Critical Fail";
        h1.style.color = "red";
        setTimeout(function() {
            h1.innerText = "There are no options available";
            h1.style.color = "orange";
            setTimeout(function() {
                h1.innerText = "You failed!";
                h1.style.color = "red";
                setTimeout(function() {
                    h1.innerText = "Start a new game to try again";
                    h1.style.color = "orange";
                    document.getElementById("buttonStartGame").disabled = "";
                }, 1000);
            }, 1000);
        }, 1000)
    }, 1000)
}

// COPIED FROM: https://snorre.io/blog/2024-07-19-javascript-canvas-confetti/

  // For brevity I will only show a simplified example of the color function
  // If you inspect my code I account for dark mode preference as my blog
  // supports both light and dark mode
  let colors = [
    "#10b981",
    "#7c3aed",
    "#fbbf24",
    "#ef4444",
    "#3b82f6",
    "#22c55e",
    "#f97316",
    "#ef4444",
  ]

function setupCanvas(id) {

    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", id);
    const ctx = canvas.getContext('2d');
    // canvas.style.position = "absolute";
    // canvas.style.top = "0px";
    canvas.width = 1200;
    canvas.height = 900;
    document.body.appendChild(canvas)
    return { canvas, ctx };
  }
  function renderWrappingConfetti() {
    const { canvas, ctx } = setupCanvas('canvas-wrapping'); 
    const timeDelta = 0.05;
    const xAmplitude = 0.5;
    const yAmplitude = 1;
    const xVelocity = 2;
    const yVelocity = 3;

    let time = 0;
    const confetti = []

    for (let i = 0; i < 100; i++) {
      const radius = Math.floor(Math.random() * 50) - 10
      const tilt = Math.floor(Math.random() * 10) - 10
      const xSpeed = Math.random() * xVelocity - xVelocity / 2
      const ySpeed = Math.random() * yVelocity
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height - canvas.height;

      confetti.push({
        x,
        y,
        xSpeed,
        ySpeed,
        radius,
        tilt,
        color: colors[Math.floor(Math.random() * colors.length)],
        phaseOffset: i, // Randomness from position in list
      })
    }

    function update() {
      // Run for at most 10 seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confetti.forEach((piece, i) => {
        piece.y += (Math.cos(piece.phaseOffset + time) + 1) * yAmplitude + piece.ySpeed;
        piece.x += Math.sin(piece.phaseOffset + time) * xAmplitude + piece.xSpeed;
        // Wrap around the canvas
        if (piece.x < 0) piece.x = canvas.width;
        if (piece.x > canvas.width) piece.x = 0;
        if (piece.y > canvas.height) piece.y = 0;
        ctx.beginPath();
        ctx.lineWidth = piece.radius / 2;
        ctx.strokeStyle = piece.color;
        ctx.moveTo(piece.x + piece.tilt + piece.radius / 4, piece.y);
        ctx.lineTo(piece.x + piece.tilt, piece.y + piece.tilt + piece.radius / 4);
        ctx.stroke();
      })
      time += timeDelta;
      requestAnimationFrame(update);
    }
    update();
    setTimeout(function() {
        document.body.removeChild(canvas);
    }, 10000);
    //
  }
//renderWrappingConfetti();
// END OF COPY



loadJSONData();

startGame();
updateStatsTimer();
pickBot();


//function ai() {
// variant 1:
//  The program generates a random number, 0, 1, or 2 as the computer’s choice of hand, 
//  representing Rock, Paper, Scissors. It doesn’t have to be this order and it is hidden from the user.
// variant 2 - medium difficulty -- future
//  Use a counting measure to see what has been most used, and what is most likely to be picked or if user
//  is only playing one type.
// variant 3 - hard difficulty -- future
//  Use a rotation based algorithm to predict next opponent pick
//}

// function player(tool) {
//  when player has selected tool, record this to variable, and add to history
//  if picked paper, do a random x% change for it to become super/godmode
//  use setTimeout to add a small delay before proceeding the game, this makes it look more animated
//  and can be skipped by directly going to next step in game
//}

/*
// function for checking whos winning
function checkWinner() {
 check whos winning - use a if statement

 scissor beats paper
 paper beats rock
 rock beats scissor
 if user win:
  - add to score
  - add to rounds
 if computer win:
  - add to rounds
  - loose a life

 if lives > 0:
  proceed game
 else // lives <= 0
  stop game
  print game over?
}
*/

//saks slår papir
//papir slår stein
//stein slår saks
//superpapir slår alt - joker

// trenger at dataen velger sein saks eller papir at random
// math.floor math.random*3

// dersom papir - kjør enda en random 0-9 (hvor 7 gir super powers)

// "liv" 3 stk. og man mister ett hver gang man taper


