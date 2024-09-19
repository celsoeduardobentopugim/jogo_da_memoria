const cards = [
    '🍎', '🍌', '🍇', '🍉',
    '🍊', '🍍', '🍓', '🍒',
    '🍎', '🍌', '🍇', '🍉'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedCards = 0;

const gameBoard = document.getElementById('game-board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart');

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    const shuffledCards = shuffle(cards);
    shuffledCards.forEach((card) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-card', card);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.getAttribute('data-card');

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        lockBoard = true;

        checkForMatch();
    }
}

function checkForMatch() {
    const isMatch = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchedCards += 2;
    resetBoard();

    if (matchedCards === cards.length) {
        showMessage('Você venceu!');
    }
}

function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.classList.remove('flipped');
        secondCard.textContent = '';
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function showMessage(text) {
    message.textContent = text;
    message.classList.remove('hidden');
    restartButton.classList.remove('hidden');
}

function restartGame() {
    matchedCards = 0;
    message.classList.add('hidden');
    restartButton.classList.add('hidden');
    gameBoard.innerHTML = '';
    createBoard();
}

restartButton.addEventListener('click', restartGame);
createBoard();
