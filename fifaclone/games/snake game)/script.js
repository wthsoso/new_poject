const snakeElement = document.getElementById("snake");
const foodElement = document.getElementById("food");
const scoreElement = document.getElementById("score");
let snakeX = 0;
let snakeY = 0;
let foodX = 0;
let foodY = 0;
let direction = "right";
let score = 0; 

function getRandomPosition() {
    return Math.floor(Math.random() * 30) * 20;
}

function updateSnakePosition() {
    snakeElement.style.left = snakeX + "px";
    snakeElement.style.top = snakeY + "px";
}

function updateFoodPosition() {
    foodX = getRandomPosition();
    foodY = getRandomPosition();
    foodElement.style.left = foodX + "px";
    foodElement.style.top = foodY + "px";
}

function checkCollision() {
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        score += 1;
        scoreElement.textContent = "Score: " + score; 
    }
}

function moveSnake() {
    if (direction === "right") {
        snakeX += 20;
    } else if (direction === "left") {
        snakeX -= 20;
    } else if (direction === "down") {
        snakeY += 20;
    } else if (direction === "up") {
        snakeY -= 20;
    }

    if (snakeX < 0 || snakeX >= 600 || snakeY < 0 || snakeY >= 600) {
        clearInterval(interval);
        alert("Game over! Final Score: " + score);
    }

    updateSnakePosition();
    checkCollision();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight" && direction !== "left") {
        direction = "right";
    } else if (event.key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (event.key === "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (event.key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
});

updateFoodPosition();
updateSnakePosition();
const interval = setInterval(moveSnake, 100);
