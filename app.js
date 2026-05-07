const choices = ["rock", "paper", "scissors"];
const emojis = {
    "rock": "👊",
    "paper": "🖐️",
    "scissors": "✌️"
};

// Game State
const MAX_SCORE = 3;
let userScore = 0;
let sysScore = 0;
let currentRound = 1;
let isAnimating = false;

// DOM Elements
const userScoreEl = document.getElementById("user-score");
const sysScoreEl = document.getElementById("sys-score");
const userScoreCard = document.getElementById("user-score-card");
const sysScoreCard = document.getElementById("sys-score-card");
const roundNumberEl = document.getElementById("round-number");

const resultMessageEl = document.getElementById("result-message");
const choiceDetailsEl = document.getElementById("choice-details");

const playerHandIcon = document.getElementById("player-hand-icon");
const systemHandIcon = document.getElementById("system-hand-icon");

const choiceBtns = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("reset-btn");

const modalOverlay = document.getElementById("match-modal");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const playAgainBtn = document.getElementById("play-again-btn");

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, sysChoice) {
    if (userChoice === sysChoice) return "tie";
    if (
        (userChoice === "rock" && sysChoice === "scissors") ||
        (userChoice === "paper" && sysChoice === "rock") ||
        (userChoice === "scissors" && sysChoice === "paper")
    ) {
        return "win";
    }
    return "lose";
}

function updateScoreboard() {
    userScoreEl.textContent = userScore;
    sysScoreEl.textContent = sysScore;
    
    userScoreEl.classList.remove("animate-pop");
    sysScoreEl.classList.remove("animate-pop");
    
    void userScoreEl.offsetWidth;
    void sysScoreEl.offsetWidth;
    
    userScoreEl.classList.add("animate-pop");
    sysScoreEl.classList.add("animate-pop");
}

function checkMatchOver() {
    if (userScore >= MAX_SCORE || sysScore >= MAX_SCORE) {
        setTimeout(() => {
            showModal(userScore >= MAX_SCORE);
        }, 800);
        return true;
    }
    return false;
}

function showModal(playerWon) {
    if (playerWon) {
        modalTitle.textContent = "Victory!";
        modalTitle.className = "win-text";
        modalDesc.textContent = `You won the series ${userScore} - ${sysScore} 🏆`;
    } else {
        modalTitle.textContent = "Defeat!";
        modalTitle.className = "lose-text";
        modalDesc.textContent = `System won the series ${sysScore} - ${userScore} 💔`;
    }
    modalOverlay.classList.add("active");
}

function resetCards() {
    userScoreCard.classList.remove("win-card", "lose-card");
    sysScoreCard.classList.remove("win-card", "lose-card");
}

function displayRoundResult(result, userChoice, sysChoice) {
    // Show actual choices
    playerHandIcon.textContent = emojis[userChoice];
    systemHandIcon.textContent = emojis[sysChoice];
    
    // Reset message classes
    resultMessageEl.className = "";
    resetCards();
    
    choiceDetailsEl.textContent = `You chose ${emojis[userChoice]}  vs  Computer chose ${emojis[sysChoice]}`;
    
    if (result === "tie") {
        resultMessageEl.textContent = "It's a Tie!";
        resultMessageEl.classList.add("tie-text");
    } else if (result === "win") {
        resultMessageEl.textContent = "Round Won!";
        resultMessageEl.classList.add("win-text");
        userScoreCard.classList.add("win-card");
        userScore++;
    } else {
        resultMessageEl.textContent = "Round Lost!";
        resultMessageEl.classList.add("lose-text");
        sysScoreCard.classList.add("win-card"); // highlight system as winner of round
        sysScore++;
    }
    
    updateScoreboard();
    
    const matchOver = checkMatchOver();
    if (!matchOver) {
        currentRound++;
        roundNumberEl.textContent = currentRound;
    }
    
    // Re-enable buttons
    isAnimating = false;
    toggleButtons(false);
}

function toggleButtons(disable) {
    choiceBtns.forEach(btn => btn.disabled = disable);
}

function handleChoiceClick(e) {
    if (isAnimating) return;
    
    const userChoice = e.currentTarget.id;
    const sysChoice = getComputerChoice();
    const result = determineWinner(userChoice, sysChoice);
    
    // Start Animation Sequence
    isAnimating = true;
    toggleButtons(true);
    resetCards();
    
    resultMessageEl.textContent = "Rock... Paper... Scissors...";
    resultMessageEl.className = "";
    choiceDetailsEl.textContent = "Shoot!";
    
    // Reset hands to rock for shaking
    playerHandIcon.textContent = emojis["rock"];
    systemHandIcon.textContent = emojis["rock"];
    
    // Add shake classes
    playerHandIcon.classList.add("shake-player");
    systemHandIcon.classList.add("shake-system");
    
    // Wait for animation to complete (1.5s)
    setTimeout(() => {
        playerHandIcon.classList.remove("shake-player");
        systemHandIcon.classList.remove("shake-system");
        
        displayRoundResult(result, userChoice, sysChoice);
    }, 1500);
}

function resetGame() {
    userScore = 0;
    sysScore = 0;
    currentRound = 1;
    isAnimating = false;
    
    updateScoreboard();
    roundNumberEl.textContent = currentRound;
    resetCards();
    
    playerHandIcon.textContent = emojis["rock"];
    systemHandIcon.textContent = emojis["rock"];
    
    resultMessageEl.textContent = "Make your move!";
    resultMessageEl.className = "";
    choiceDetailsEl.textContent = "Choose an option below";
    
    toggleButtons(false);
    modalOverlay.classList.remove("active");
}

// Event Listeners
choiceBtns.forEach(btn => btn.addEventListener("click", handleChoiceClick));
resetBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);
