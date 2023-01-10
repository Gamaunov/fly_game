const birdSprite = new Image();
birdSprite.src = "../img/frame-1.png";

class Bird {
  constructor() {
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.originalWidth = 941;
    this.originalHeight = 680;
    this.width = this.originalWidth / 20;
    this.height = this.originalHeight / 20;
    this.weight = 1;
    this.frameX = 0;
  }
  update() {
    let curve = Math.sin(angle) * 20;
    if (this.y > canvas.height - this.height * 3 + curve) {
      this.y = canvas.height - (this.height * 3 + curve);
      this.vy = 0;
    } else {
      this.vy += this.weight;
      this.vy *= 0.9;
      this.y += this.vy;
    }
    if (this.y < 0 + this.height) {
      this.y = 0 + this.height;
      this.vy = 0;
    }
    if (spacePressed && this.y > this.height * 3) this.flap();
  }
  draw() {
    ctx.drawImage(
      birdSprite,
      0,
      0,
      this.originalWidth,
      this.originalHeight,
      this.x,
      this.y,
      this.width * 1.2,
      this.height * 1.2
    );
  }
  flap() {
    this.vy -= 2;
    if (this.frameX >= 3) this.frameX = 0;
    else if (frame % 2 === 0) this.frameX++;
  }
}
const bird = new Bird();
