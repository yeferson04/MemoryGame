
const emojis = ["🐶", "🐱", "🐸", "🦁", "🐼", "🐵"];

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matched = 0;
let seconds = 0;
let timer = null;
let started = false;

const game = document.getElementById("game");

function startGame() {
    cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

    game.innerHTML = "";
    moves = 0;
    matched = 0;
    seconds = 0;
    started = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;

    clearInterval(timer);

    document.getElementById("moves").textContent = moves;
    document.getElementById("time").textContent = seconds;
    document.getElementById("message").textContent = "";

    cards.forEach((emoji) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.emoji = emoji;
        card.textContent = emoji;

        card.addEventListener("click", () => flipCard(card));

        game.appendChild(card);
    });
}

function flipCard(card) {
    if (
        lockBoard ||
        card.classList.contains("flipped") ||
        card.classList.contains("matched")
    ) return;

    if (!started) {
        started = true;
        timer = setInterval(() => {
            seconds++;
            document.getElementById("time").textContent = seconds;
        }, 1000);
    }

    card.classList.add("flipped");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;

    document.getElementById("moves").textContent = moves;

    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matched += 2;
        resetTurn();

        if (matched === cards.length) {
            clearInterval(timer);
            document.getElementById("message").textContent =
                "🎉 ¡Felicidades! ¡Ganaste!";
        }
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetTurn();
        }, 900);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restartGame() {
    startGame();
}

startGame();
