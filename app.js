let gameSeq = [];
let userSeq = [];

let btns = ["red", "green", "blue", "yellow"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// 1. Start the game
document.addEventListener("keypress", function() {
    if (started == false) {
        console.log("Game started");
        started = true;
        levelUp();
    }
});

// 2. Visual feedback functions
function gameFlash(btn) {
    btn.classList.add("flash");  
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");  
    setTimeout(function() {
        btn.classList.remove("userFlash");
    }, 250);
}

// 3. Computer's turn
function levelUp() {
    userSeq = []; // Reset user sequence for the new level
    level++; 
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    
    gameSeq.push(randColor);
    console.log("Game Sequence:", gameSeq); 
    gameFlash(randBtn);
}

// 4. THE BRAIN: Checking the sequence
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        // If user finished the whole sequence correctly
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        // Game Over logic
        h2.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

// 5. User's turn (Clicking)
function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id"); // Ensure your HTML buttons have id="red", etc.
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) { // Added 'let' here
    btn.addEventListener("click", btnPress);
}

// 6. Reset for next game
function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}