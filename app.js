const choices = ["rock", "paper", "scissors"];
const emojis = {
    "rock": "👊",
    "paper": "🖐️",
    "scissors": "✌️"
};

let userScore = 0;
let sysScore = 0;

const userScoreEl = document.getElementById("user-score");
const sysScoreEl = document.getElementById("sys-score");
const resultMessageEl = document.getElementById("result-message");
const choiceDetailsEl = document.getElementById("choice-details");
const choiceBtns = document.querySelectorAll(".choice-btn");
const resetBtn = document.getElementById("reset-btn");

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function determineWinner(userChoice, sysChoice) {
    if (userChoice === sysChoice) {
        return "tie";
    }
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
    
    // Add pop animation
    userScoreEl.classList.remove("animate-pop");
    sysScoreEl.classList.remove("animate-pop");
    
    // Trigger reflow to restart animation
    void userScoreEl.offsetWidth;
    void sysScoreEl.offsetWidth;
    
    userScoreEl.classList.add("animate-pop");
    sysScoreEl.classList.add("animate-pop");
}

function displayResult(result, userChoice, sysChoice) {
    const userEmoji = emojis[userChoice];
    const sysEmoji = emojis[sysChoice];
    
    // Reset classes
    resultMessageEl.className = "";
    
    choiceDetailsEl.textContent = `You chose ${userEmoji}  vs  Computer chose ${sysEmoji}`;
    
    if (result === "tie") {
        resultMessageEl.textContent = "It's a Tie!";
        resultMessageEl.classList.add("tie-text");
    } else if (result === "win") {
        resultMessageEl.textContent = "You Have Won!";
        resultMessageEl.classList.add("win-text");
        userScore++;
    } else {
        resultMessageEl.textContent = "System Has Won!";
        resultMessageEl.classList.add("lose-text");
        sysScore++;
    }
    
    updateScoreboard();
}

function handleChoiceClick(e) {
    const userChoice = e.currentTarget.id;
    const sysChoice = getComputerChoice();
    const result = determineWinner(userChoice, sysChoice);
    
    displayResult(result, userChoice, sysChoice);
}

function resetGame() {
    userScore = 0;
    sysScore = 0;
    updateScoreboard();
    
    resultMessageEl.textContent = "Make your move!";
    resultMessageEl.className = "";
    choiceDetailsEl.textContent = "Choose an option above to start";
}

// Event Listeners
choiceBtns.forEach(btn => btn.addEventListener("click", handleChoiceClick));
resetBtn.addEventListener("click", resetGame);
