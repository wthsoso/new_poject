const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("restartButton");
let score = 0;


const carImage = new Image();
carImage.src = "main_Car2_changed.png";


const obstacleImage = new Image();
obstacleImage.src = "enemy_car.png";

let carX = 185; 
let obstacleX = 0;
let obstacleY = -30;
let gameInterval;

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", function() {
    location.reload();
});

function startGame() {
    startButton.disabled = true;
    gameInterval = setInterval(updateGameArea, 20);
    document.addEventListener("keydown", moveCar);
}

function moveCar(e) {
    if (e.key === "ArrowLeft" && carX > 0) {
        carX -= 15;
    } else if (e.key === "ArrowRight" && carX < 370) {
        carX += 15;
    }
}

function updateGameArea() {
    clearCanvas();
    drawObstacle();
    moveObstacle();
    drawCar();
    checkCollision();
    scoreDisplay.innerHTML = "Score: " + score;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCar() {
    ctx.drawImage(carImage, carX, canvas.height - 60, 30, 60);
}

function drawObstacle() {
    ctx.drawImage(obstacleImage, obstacleX, obstacleY, 30, 60);
}


function moveObstacle() {
    obstacleY += 10;

    if (obstacleY > canvas.height) {
        obstacleX = Math.floor(Math.random() * 370);
        obstacleY = -30;
        score += 5;
    }
}

function checkCollision() {
    if (
        carX < obstacleX + 30 &&
        carX + 30 > obstacleX &&
        canvas.height - 60 < obstacleY + 60
    ) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    document.removeEventListener("keydown", moveCar);
    startButton.disabled = false;
}
