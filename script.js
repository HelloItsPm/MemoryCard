const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🥝', '🍓'];
let cards = [...cardValues, ...cardValues]; // Doubler les cartes
let flippedCards = [];
let matchedCards = [];

const gameBoard = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const restartButton = document.getElementById('restart-btn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    cards = shuffle(cards);
    cards.forEach((value, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = value;
        cardElement.dataset.index = index;
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

function flipCard() {
    const cardElement = this;

    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && !cardElement.classList.contains('matched')) {
        cardElement.classList.add('flipped');
        cardElement.textContent = cardElement.dataset.value;
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
        flippedCards = [];

        if (matchedCards.length === cards.length) {
            messageElement.textContent = 'Félicitations ! Vous avez trouvé tous les doubles !';
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.textContent = '';
            card2.classList.remove('flipped');
            card2.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

restartButton.addEventListener('click', () => {
    matchedCards = [];
    messageElement.textContent = '';
    createBoard();
});

createBoard();
