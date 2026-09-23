const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");


let dimension = 100;
let imgStart = Math.floor(Math.random() * 100) + 1;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCount = 0;
let seconds = 0;
let moves = 0;
let timerInterval = null;
let gameStarted = false;


const images = [];
for(let i = imgStart; i < imgStart + 8; i++){
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}
let cards =[...images, ...images];

console.table(cards);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame(startGame = false){
    board.innerHTML = '';
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedCount = 0;
    seconds = 0;
    moves = 0;
    clearInterval(timerInterval);
    timerInterval = null;
    movesDisplay.textContent = '0';
    timerDisplay.textContent = formatTime(seconds);
    resultDisplay.textContent = '';
    gameStarted = startGame;
    restartBtn.textContent = gameStarted ? 'Recommencer' : 'Jouer';

    shuffle(cards);
    cards.forEach((imgURL) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", "Carte retournée, cliquez pour révéler");
        card.dataset.value = imgURL;
     
        card.addEventListener('click', () => handleCardClick(card));

        board.appendChild(card);
    });

    if (gameStarted) {
        startTimer();
    }
}


function handleCardClick(card) {
    if (!gameStarted) return;
    if (lockBoard) return;                        
    if (card === firstCard) return;                  
    if (card.classList.contains('matched')) return;  

    card.innerHTML = `<img src="${card.dataset.value}">`;

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    lockBoard = true;
    moves++;
    checkMatch();
}

function checkMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matchedCount += 2; 
        resetTurn();
        checkVictory();
    } else {
        setTimeout(() => {
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function formatTime(sec) {
    const minutes = String(Math.floor(sec / 60)).padStart(2, '0');
    const seconds = String(sec % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds);
    }, 1000);
}

function checkVictory() {
    if (matchedCount === cards.length) {
        clearInterval(timerInterval);
        timerInterval = null;
        resultDisplay.textContent = `Bravo ! Score : ${moves} coups en ${formatTime(seconds)}`;
    }
}

restartBtn.addEventListener('click', () => initGame(!gameStarted));


initGame();