import Bullet from "./Bullet.js";

export default class BulletController {
  bullets = [];
  timerTillNextBullet = 0;

  constructor(canvas) {
    this.canvas = canvas;
  }

  shoot(x, y, speed, damage, delay) {
    if (this.timerTillNextBullet <= 0) {
      this.bullets.push(new Bullet(x, y, speed, damage));
      this.timerTillNextBullet = delay;
    }
    this.timerTillNextBullet--;
  }

  isOutside(bullet) {
    if (bullet.y < 0) {
      return true;
    }
    return false;
  }

  removeBullet(bullet) {
    const index = this.bullets.indexOf(bullet);
    if (index !== -1) {
      this.bullets.splice(index, 1);
    }
  }

  draw(ctx) {
    const newBulletList = [];
    this.bullets.forEach((bullet, index) => {
      if (!this.isOutside(bullet)) {
        bullet.draw(ctx);
        newBulletList.push(bullet);
      }
    });

    this.bullets = newBulletList;
  }
}
