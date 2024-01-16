export default class Enemy {
  constructor(x, y, health, imageSrc, speed, canvas,damage) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.direction = 1;
    this.speed = 3;
    this.canvas = canvas;
    this.image = new Image();
    this.image.src = imageSrc;
    this.health = health;
    this.height = 50;
    this.width = 50;
    this.recievedBullets = [];
  }

  move() {
    this.x += this.speed * this.direction;
    if (this.x + this.width >= this.canvas.width) {
      this.x = -this.width;
      this.y += 100; 
    }
  }
  
  
  is_out(){
    if(this.y + this.speed >= 760){
      return true;
    }
  }
  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  takeDamage(bullet) {
    if (this.recievedBullets.findIndex((bl) => bl.id === bullet.id) === -1) {
      this.health -= bullet.damage;
      this.recievedBullets.push(bullet);
    }
  }

  isDead() {
    return this.health <= 0;
  }

   
}





