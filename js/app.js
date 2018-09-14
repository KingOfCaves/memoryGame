const table = document.querySelector(".table-top");
const propmt = document.querySelector(".turns");
const stars = document.querySelector(".rank").children;
const redoBtn = document.querySelector(".redo");
const results = document.querySelector(".results");
const seconds = document.querySelector(".seconds");
const wrong = "flaticon-cancel";
const right = "flaticon-check";
const pending = "flaticon-help";
const resultMessage = document.querySelector(".results__title");
resultMessage.textContent = "shiggy no diggy";

let deck = [
    "sun", "sun",
    "snowflake", "snowflake",
    "humidity", "humidity",
    "thunder", "thunder",
    "sun", "sun",
    "snowflake", "snowflake",
    "humidity", "humidity",
    "thunder", "thunder"
];
let turns;
let matchedCards = [];
let flippedCards = [];
let mcLength = matchedCards.length;
let deckLength = deck.length;
let victory = false;
let time = 0;
let timer;

// INIT FUNCTION FOR GAME
function init(state){
    // if init is called and state is true then is proceeds to setup the entire page
    if(state){
        flushArray(flippedCards);
        hideResults(results);
        rankReset(stars);
        tableClear(table);
        tableSetup(deck, table);
        startTimer();
        return true;
    }
    // if init is called and its state is false it ends the game
    else{
        flushArray(flippedCards);
        stopTimer();
        showResults();
        return false;
    }
}

// FUNCTION FOR SHUFFLING THE DECK
//documentation for functionality in credits on github
function shuffle(array){
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// FUNCTION FOR SETTING UP THE TABLE WITH THE CARDS AVAILABLE
function tableSetup(array, placement){
    array = shuffle(array);
    for(let i = 0; i < array.length; i++){
        // setting up the format for each vanilla card
        let card = document.createElement("li");
        let status = document.createElement("span");
        status.classList.add("status", pending);
        let type = document.createElement("span");
        type.classList.add("type", `flaticon-${array[i]}`);
        // adds card to table
        placement.appendChild(card).classList.add("card");
        // appends status span and type span to each card
        placement.children[i].appendChild(status);
        placement.children[i].appendChild(type);
    }

}

// FUNCTION FOR CLEARING THE TABLE OF ALL ELEMENTS
function tableClear(array){
    if (array.children.length >= 0) {
        array.innerHTML = "";
    }
}

// FUNCTIONS FOR RESETTING THE STAR RANK
function rankReset(array){
    turns = 0;
    propmt.textContent = turns;
    for(let i = 0; i < array.length; i++){
        array[i].classList = "flaticon-star-1";
    }
}

// CHECKING FOR MATCH IN FLIPPEDCARDS ARRAY
function matchCheck(array, num, msg){
    // checks to make sure that at least 2 cards are preset in array
    if (array.length % 2 === 0) {
        let t1 = array[0].querySelector(".type").classList[1];
        let t2 = array[1].querySelector(".type").classList[1];
        if (t1 === t2) {
            array.forEach(function (item) {
                console.log(t1);
                // adds matched class to card
                item.classList.add("matched");
                // changes status emblem to show that match is correct
                item.querySelector(".status").classList.replace(pending, right);
                matchedCards.push(item);
            });
            // flushes array
            array.length = 0;
        } else {
            console.log(t1);
            console.log(t2);
            array.forEach(function (item) {
                item.querySelector(".status").classList.replace(pending, wrong);
                setTimeout(function (){
                    // resets card class
                    item.classList = "card";
                    // changes status emblem to show that match is wrong
                    item.querySelector(".status").classList.replace(wrong, pending);
                }, 2000)
            });
            // flushes array
            array.length = 0;
        }
        propmtUpdate();
        rankCheck(num, msg);
        gameSet();
    }
}

// CHECKS FOR THE CHANGES IN TURNS AND CHANGES THE STAR RANK ACCORDINGLY
function rankCheck(num, msg) {
    // multiple for turns to check for
    let difficuly = 12;
    // star rank A
    if (num >= difficuly){
        stars[stars.length - 1].className = "flaticon-star";
        msg.textContent = "PRETTY GOOD AYY?";
        //  star rank B
        if (num >= difficuly * 1.5){
            stars[stars.length - 2].className = "flaticon-star";
            msg.textContent = "TRY AGAIN!";
            // star rank C
            if (num >= difficuly * 2) {
                stars[stars.length - 3].className = "flaticon-star";
                msg.textContent = "AAAAAAAAAAAAAAAAAAA";
            }
        }
    } else {
        msg.textContent = "300 IQ PLAY!";
    }
}

function flushArray(array){
    array.length = 0;
}

function propmtUpdate(){
    // adds 1 turn and updates the html
    turns ++;
    // updates html of propmt to match current value of turnsdd
    propmt.textContent = turns;
}
function clicked(item){
    // adds flipped class and adds card to flippedCards array to be checked
    item.classList.add("flip");
    flippedCards.push(item);
}

// FUNCTION FOR STARTING THE TIMER AND SETTING UP RATE
function startTimer(){
    // creates timer for function that runs every 1000ms
    timer = setInterval(function () {
        time++;
        console.log(time);
    }, 1000);
}
// FUNCTION
function stopTimer(){
    // stops timer
    clearInterval(timer);
    // sets content of results page to equal value of time passed
    seconds.textContent = time;
    // resets value of time
    time = 0;
    // destroys timer
    timer = NaN;
}

//FUNCTION FOR SHOW RESULTS
function showResults(){
    results.classList.add("results-open");
}
//FUNCTION FOR HIDING RESULTS
function hideResults(){
    results.classList.remove("results-open");
}

//FUNCTION FOR CHECKING IF THE AMOUNT OF MATCHED CARDS IS EQUAL TO DECK
function gameSet(){
    if (mcLength === deckLength) {
        init(false);
    }
}

// EVENT CLICK LISTENER ON TABLE
table.addEventListener("click", function(evt){
    // click event only triggers functions if it is a vanilla card
    if (evt.target.classList == "card") {
        clicked(evt.target), matchCheck(flippedCards, turns, resultMessage);
    }
});
// EVENT CLICK LISTENER THAT RERUNS INIT WITH A STATE OF TRUE
redoBtn.addEventListener("click", function(evt){
    /*
    this is kind of wierd
    ---------------------
    this checks to see if init returns true or false
    this is setup to make sure that when the redo button is clicked
    init doesnt overlay onto itself, it does an actual full reset
    ---------------------
    */
    if(!init()){
        init(true);
    }
});

// STARTER FOR WHEN THE PAGE IS LOADED
init(true);