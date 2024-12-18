// variabler som trengs tilgjengelig for alle

// bruker valgt "verktøy" array
let userChoice;

// historikk/liste/array over valgte verktøy fra bruker
let userChoiceHistory;

// maskin valgt "verktøy"
let computerChoice;

// historikk/liste/array over valgte verktøy fra maskin
let computerChoiceHistory;

// gir stein, saks og papir en verdi "at random" klarer å lese
const rock = 1;
const scissor = 2;
const paper = 3;

// antall liv 
let lives = 3;

// antall runder 
let rounds = 0;

// poeng - antall vunnet
let roundsWon = 0;

// difficulty - 1 = easy, 2 = medium, 3 = hard // for later use
let difficulty = 1; // for learning purposes, betyr 1 altså EASY, 2 MEDIUM og 3 HARD (4 IMPOSSIBLE)

let backgroundColor = "rgb(173, 216, 230)";

let activeColor = "rgb(141, 5, 239)";

// funksjon for å lage nytt valg for maskinen
function pickBot(){

    let randomBotPick = Math.floor(Math.random() * 3) + 1;
    switch (randomBotPick){

        case rock: 
            computerChoice = "rock";
            break;

        case scissor:
            computerChoice = "scissor";
            break;

        case paper:
            computerChoice = "paper";
            break;

    }
}


function winCheck(){

    document.getElementById("pickBotChoice").setAttribute("src", "./img/" + computerChoice + ".png");
    document.getElementById("pickBotChoice").style.display = "";

    if ((userChoice == "scissor" && computerChoice == "paper") || 
        (userChoice == "rock" && computerChoice == "scissor") || 
        (userChoice == "paper" && computerChoice == "rock")) {
            roundsWon += 1;
        }

    else if (userChoice == computerChoice) {

    }

    else {
        lives -= 1;
    }

    rounds += 1;

    if (lives > 0 ){
        cuntGame();
/* if lives > 0:
  proceed game
 else // lives <= 0
  stop game
  print game over? */
    }

    else {
        endGame();
    }

}

function endGame(){
    document.getElementById("buttons").innerHTML = "<H1>GAME OVER</H1>";
}

function cuntGame(){
    showButtons();
    pickBot();
}

function hideButtons(){
    document.getElementById("buttonRock").style.display = "none";
    document.getElementById("buttonScissor").style.display = "none";
    document.getElementById("buttonPaper").style.display = "none";
}

function showButtons(){
    document.getElementById("buttonRock").style.display = "";
    document.getElementById("buttonScissor").style.display = "";
    document.getElementById("buttonPaper").style.display = "";
}

function userPick(choice){

    hideButtons();
    userChoice = choice;
    document.getElementById("userChoice").style.display = "";
    document.getElementById("userChoice").setAttribute("src", "./img/" + userChoice + ".png");
    setTimeout(winCheck, 500);   /// check if win
    document.getElementById("pickBotChoice").style.display = "none";
}

function updateStats(){    /*                    tall      tekst        tall      tekst          tall        tekst             */                      
    document.getElementById("stats").innerText = lives + " Lives | " + rounds + " Rounds | " + roundsWon + " Rounds Won";
}


function updateStatsTimer() {
    setTimeout(updateStatsTimer, 300);
    updateStats();
}

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


