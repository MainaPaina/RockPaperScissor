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


const backgroundColor = "rgb(173, 216, 230)";
const chosenColor = "rgb(173, 230, 176)";


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

// Enable = aktiverer og Disable = deaktiverer
function disableButton(buttonName)
{
    document.getElementById(buttonName).setAttribute("disabled", "disabled");
}
function enableButton(buttonName)
{
    document.getElementById(buttonName).removeAttribute("disabled");
}
function activeButton(buttonName)
{
    document.getElementById(buttonName).style.backgroundColor = chosenColor;
}
function inactiveButton(buttonName)
{
    document.getElementById(buttonName).style.backgroundColor = backgroundColor;
}

function userPick(choice){
    disableButton("buttonRock");
    disableButton("buttonPaper");
    disableButton("buttonScissor");
    userChoice = choice;
    if (choice == "paper")
    {
        activeButton("buttonPaper");
    }
    else if (choice == "rock")
    {
        activeButton("buttonRock");
    }
    else if (choice == "scissor")
    {
        activeButton("buttonScissor");
    }
    else
    {
        alert("You trying to cheat, we do not approve!");
    }
    /// check if win
    setTimeout(winCheck, 500);
}
function writeStats() {
 document.getElementById("stats").innerText = lives + " lives | " + rounds + " rounds | " + roundsWon + " rounds won";
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
        cuntGame()
/* if lives > 0:
  proceed game
 else // lives <= 0
  stop game
  print game over? */
    }
}

function cuntGame(){
    pickBot();

    setTimeout(function() {
        enableButton("buttonRock");
        enableButton("buttonPaper");
        enableButton("buttonScissor");
        inactiveButton("buttonRock");
        inactiveButton("buttonPaper");
        inactiveButton("buttonScissor");
    }, 2000);
}

function writeStatsTimer() {
    setTimeout(writeStatsTimer, 300);
    writeStats();
}

writeStatsTimer();
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
