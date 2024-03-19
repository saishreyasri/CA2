const images = [
    '🍔', '🍔', '🍕', '🍕',
    '🍩', '🍩', '🍫', '🍫',
    '🎂', '🎂', '🧁', '🧁'
];

let cards = [];
let flippedCards = [];
let matchedCards = [];
let moves = 0;
let startTime;
let timerInterval;
const clickSound = new Audio('assets/click2.mp3');
const matchSound = new Audio('assets/match.wav');
const backgroundMusic = new Audio('assets/Monkeys.mp3');

function createCard(image, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.textContent = image;
    card.addEventListener('click', handleCardClick);
    return card;
}

function handleCardClick() {
    if (!startTime) {
        startTime = Date.now();
        startTimer();
        backgroundMusic.play();
    }

    const clickedCard = this;
    const index = clickedCard.dataset.index;

    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
        flippedCards.push(index);
        clickedCard.textContent = images[index];
        playClickSound();
        if (flippedCards.length === 2) {
            moves++;
            updateMoves();
            setTimeout(checkForMatch, 500);
        }
    }
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function updateMoves() {
    document.getElementById('moves').textContent = moves;
}

function checkForMatch() {
    const [firstIndex, secondIndex] = flippedCards;
    const firstCard = cards[firstIndex];
    const secondCard = cards[secondIndex];

    if (images[firstIndex] === images[secondIndex]) {
        matchedCards.push(firstIndex, secondIndex);
        playMatchSound();
        if (matchedCards.length === images.length) {
            endGame();
        }
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
        }, 0);
    }

    flippedCards = [];
}

function playMatchSound() {
    matchSound.currentTime = 0;
    matchSound.play();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initializeGame() {
    const gameContainer = document.getElementById('gameContainer');
    shuffleArray(images);

    for (let i = 0; i < images.length; i++) {
        const card = createCard('', i);
        cards.push(card);
        gameContainer.appendChild(card);
    }
}

function startTimer() {
    timerInterval = setInterval(updateTime, 1000);
}

function updateTime() {
    const currentTime = new Date();
    const elapsedTime = new Date(currentTime - startTime);
    const seconds = elapsedTime.getSeconds();
    document.getElementById('time').textContent = seconds;
}

function endGame() {
    clearInterval(timerInterval);
    backgroundMusic.pause();
    const endTime = Date.now();
    const elapsedTime = new Date(endTime - startTime);
    const seconds = elapsedTime.getSeconds();


    let phrase;
    if (seconds <= 15) {
        const phrases = ["Wow! You're lightning fast!", "Incredible speed!"];
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
    } else if (seconds <= 25) {
        const phrases = ["Great job! You're quick!", "Well done!"];
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
    } else {
        const phrases = ["Nice effort! Keep practicing!", "You did it! Try to beat your time next time!"];
        phrase = phrases[Math.floor(Math.random() * phrases.length)];
    }


    const popupOverlay = document.getElementById('popupOverlay');
    popupOverlay.style.display = 'flex';
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup');
    popupContent.innerHTML = `
        <h2>Game Over!</h2>
        <p>${phrase}</p>
        <p>Moves: ${moves}</p>
        <p>Time: ${seconds} seconds</p>
        <button onclick="restartGame()">Play Again</button>
    `;
    popupOverlay.appendChild(popupContent);


    localStorage.setItem('moves', moves);
    localStorage.setItem('time', seconds);
}

function restartGame() {
    localStorage.removeItem('moves');
    localStorage.removeItem('time');
    location.reload();
}


window.onload = function () {
    const moves = localStorage.getItem('moves');
    const time = localStorage.getItem('time');

    if (moves !== null && time !== null) {
        endGame(moves, time);
    }
}

initializeGame();
