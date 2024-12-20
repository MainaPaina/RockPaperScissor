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
///      "scoreTarget": 6
///    }
///
const playerDefault = {
    "name": "Juan",
    "avatar": "./img/confused.png",
    "chanceOfRock": 100,
    "chanceOfScissor": 100,
    "chanceOfPaper": 100,
    "scoreTarget": 6
}
/// Variable for holding current selected player
let playerCurrentSelected;
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
    "chanceOfScissor": 100,
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
const gameChoiceScissor = 2;
const gameChoicePaper = 3;
const gameChoiceSmack = 4;

const backgroundColor = "rgb(173, 216, 230)";
const activeColor = "rgb(141, 5, 239)";

function startGame() {
    
}

function loadJSONData() {
    let xmlhttp = new XMLHttpRequest(); // navn på variabel er valgfritt, xhr eller request er vanlige navn, vi valgte å kalle den for xmlhttp
    let url = "./json/stuff.json"; // lokale variabler, trenger ikke like godt gjennomtenkt navn
    
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
                console.log(playerList);
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
            else if (playerList != undefined && playerCurrentSelected == undefined) {
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
    let optionDOM = document.createElement("option");
    optionDOM.selected = "selected";
    optionDOM.disabled = "disabled";
    optionDOM.innerText = "- Select player";
    listDOM.appendChild(optionDOM);
    for (let i = 0; i < playerList.length; i++) {
        optionDOM = document.createElement("option");
        optionDOM.setAttribute("data-id", i);
        optionDOM.innerText = playerList[i].name;
        listDOM.appendChild(optionDOM);
    }

    listDOM.addEventListener("change", function() {
        let _selectedPlayer = listDOM.options[listDOM.selectedIndex];
        let selectedIdPlayer = _selectedPlayer.getAttribute("data-id");
        console.log(playerList[selectedIdPlayer]);
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
        case gameChoiceScissor:
            computerChoice = "scissor";
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
    if ((playerChoice == "scissor" && computerChoice == "paper") || 
        (playerChoice == "rock" && computerChoice == "scissor") || 
        (playerChoice == "paper" && computerChoice == "rock")) {
        
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

    if (playerScore > playerCurrentSelected.scoreTarget || computerScore > playerCurrentSelected){
        endGame();
/* if lives > 0:
  proceed game
 else // lives <= 0
  stop game
  print game over? */
    }

    else {
        cuntGame();
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

loadJSONData();


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


