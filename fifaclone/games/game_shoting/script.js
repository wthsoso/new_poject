import Player from "./player.js";
import BulletController from "./BulletController.js";
import Enemy from "./Enemy.js";

const button = document.getElementById("button");
button.addEventListener("click", restart);
var score_counter = 0;
var speedIncrement = 1;
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 550;
canvas.height = 590;
const bulletController = new BulletController(canvas);
const enemies = [
  new Enemy(50, 20, 5, "enemy1.png", 2, canvas),
  new Enemy(150, 20, 5, "enemy1.png", 2, canvas),
  new Enemy(250, 20, 5, "enemy1.png", 2, canvas),
  new Enemy(350, 20, 2, "enemy4.png", 2, canvas),
  new Enemy(450, 20, 10, "enemy3.png", 2, canvas),
  new Enemy(50, 100, 5, "enemy1.png", 2, canvas),
  new Enemy(150, 100, 5, "enemy1.png", 2, canvas),
  new Enemy(250, 100, 2, "enemy4.png", 2, canvas),
  new Enemy(350, 100, 2, "enemy4.png", 2, canvas),
  new Enemy(450, 100, 20, "enemy2.png", 2, canvas)
];

const player = new Player(canvas.width / 5, canvas.height / 1.3, bulletController);

function restart() {
  location.reload();
  button.style.display = "none";
}

function isCollision(bullet, enemy) {
  if (
    bullet.x >= enemy.x &&
    bullet.x <= enemy.x + enemy.width &&
    bullet.y >= enemy.y &&
    bullet.y <= enemy.y + enemy.height
  ) {
    return true;
  }
  return false;
}

function gameLoop() {
  setCommonStyle();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  bulletController.draw(ctx);
  let bullets = [...bulletController.bullets];
  const removeElements = [];

  for (let i = 0; i < enemies.length; i++) {
    const enemy = enemies[i];
    if (enemy.is_out()) {
      console.log("enemy_escaped")
      button.style.display = "block";
      return;
    }
    if (isCollision(player, enemy)) {
      console.log("Player collided with an enemy");
      button.style.display = "block";
      return;
    }
  }

  enemies.forEach((enemy) => {
    let index = 0;
    enemy.move(canvas);

    let isBrake = false;
    while (index < bullets.length) {
      const bullet = bullets[index];
      if (isCollision(bullet, enemy)) {
        console.log("hitted", removeElements);
        removeElements.push(bullet);
        enemy.takeDamage(bullet);
        isBrake = true;
        break;
      }
      index++;
    }

    if (isBrake) {
      console.log(index, bullets);
    }

    enemy.draw(ctx);
  });

  removeElements.forEach((bullet) => {
    bulletController.removeBullet(bullet);
  });

  enemies.forEach((enemy, index) => {
    if (enemy.isDead()) {
      enemies.splice(index, 1);
      score_counter += 10;
      console.log(score_counter)
    }
    if (score_counter == 100 && enemies.length === 0) {
      enemies.push(
        new Enemy(50, 20, 5, "enemy1.png", 2, canvas),
        new Enemy(150, 20, 5, "enemy1.png", 2, canvas),
        new Enemy(250, 20, 5, "enemy1.png", 2, canvas),
        new Enemy(350, 20, 2, "enemy4.png", 2, canvas),
        new Enemy(450, 20, 10, "enemy3.png", 2, canvas),
        new Enemy(50, 100, 5, "enemy1.png", 2, canvas),
        new Enemy(150, 100, 5, "enemy1.png", 2, canvas),
        new Enemy(250, 100, 2, "enemy4.png", 2, canvas),
        new Enemy(350, 100, 2, "enemy4.png", 2, canvas),
        new Enemy(450, 100, 15, "enemy2.png", 2, canvas)
      );
      console.log("difficulti incrised")
      enemies.forEach((enemy) => {
        enemy.speed += speedIncrement;
      });
      speedIncrement += 1;
    }

  });
  if (score_counter == 200 && enemies.length === 0) {
    enemies.push(
      new Enemy(50, 20, 5, "enemy1.png", 2, canvas),
      new Enemy(150, 20, 5, "enemy1.png", 2, canvas),
      new Enemy(250, 20, 10, "enemy3.png", 2, canvas),
      new Enemy(350, 20, 2, "enemy4.png", 2, canvas),
      new Enemy(450, 20, 10, "enemy3.png", 2, canvas),
      new Enemy(50, 100, 5, "enemy1.png", 2, canvas),
      new Enemy(150, 100, 5, "enemy1.png", 2, canvas),
      new Enemy(250, 100, 2, "enemy4.png", 2, canvas),
      new Enemy(350, 100, 2, "enemy4.png", 2, canvas),
      new Enemy(450, 100, 15, "enemy2.png", 2, canvas)
    );
    console.log("difficulti incrised again!")
    enemies.forEach((enemy) => {
      enemy.speed += speedIncrement;
    });

  }
  if (enemies.length === 0) {
    button.style.display = "block";
  } else {
    button.style.display = "none";
  }
}

function setCommonStyle() {
  ctx.shadowBlur = 20;
  ctx.lineWidth = 5;
}

setInterval(gameLoop, 1000 / 60);