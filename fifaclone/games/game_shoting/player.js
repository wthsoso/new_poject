export default class Player {
  constructor(x, y, bulletController,health) {
    this.x = x;
    this.health = 3;
    this.y = y;
    this.bulletController = bulletController;
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.image = new Image();
    this.image.src = "ship.png";
    document.addEventListener("keydown", this.keydown);
    document.addEventListener("keyup", this.keyup)
  }

  draw(ctx) {
    this.move();
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height); 
    this.shoot();
  }

  shoot() {
    if (this.shootPressed) {
      const speed = 7;
      const delay = 7;
      const damage = 1;
      const bulletX = this.x + this.width / 2;
      const bulletY = this.y;
      this.bulletController.shoot(bulletX, bulletY, speed, damage, delay)
    }
  }

  move() {
    if (this.DownPressed) {
      this.y += this.speed;
    }
    if (this.upPressed) {
      this.y -= this.speed;
    }
    if (this.RightPressed) {
      this.x += this.speed;
    }
    if (this.LeftPressed) {
      this.x -= this.speed;
    }
  }

  keydown = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = true;
    }
    if (e.code === "ArrowDown") {
      this.DownPressed = true;
    }
    if (e.code === "ArrowLeft") {
      this.LeftPressed = true;
    }
    if (e.code === "ArrowRight") {
      this.RightPressed = true;
    }
    if (e.code === "Space") {
      this.shootPressed = true;
    }
  };
  
  keyup = (e) => {
    if (e.code === "ArrowUp") {
      this.upPressed = false;
    }
    if (e.code === "ArrowDown") {
      this.DownPressed = false;
    }
    if (e.code === "ArrowLeft") {
      this.LeftPressed = false;
    }
    if (e.code === "ArrowRight") {
      this.RightPressed = false;
    }
    if (e.code === "Space") {
      this.shootPressed = false;
    }
  }
}




