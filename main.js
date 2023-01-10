const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const btn = document.querySelector(".btn");

const audioSpeed = new Audio();
audioSpeed.src = "./audio/bird-point.wav";
audioSpeed.volume = 0.05;

const audioGameOver = new Audio();
audioGameOver.src = "./audio/bird-die.wav";
audioGameOver.volume = 0.1;

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 4;
let highScore;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop("0.4", "#f30000");
gradient.addColorStop("0.5", "#5e1c64");
gradient.addColorStop("0.5", "#2a132f");
gradient.addColorStop("0.6", "#04299f");
gradient.addColorStop("0.7", "#04299f");

const background = new Image();
background.src = "./img/back.png";

const BG = {
  x1: 0,
  x2: canvas.width,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};

function handleBackground() {
  ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
  ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  handleBackground();
  handleObstacles();
  handleParticles();
  bird.update();
  bird.draw();
  ctx.fillStyle = gradient;
  ctx.font = "78px PermanentMarker";
  ctx.strokeText(score, 35, 70);
  ctx.fillText(score, 35, 70);
  controlSpeed();
  highScore = localStorage.getItem("high-score") || 0;
  highScore = Math.max(score, highScore);
  localStorage.setItem("high-score", highScore);
  ctx.fillStyle = "black";
  ctx.font = "18px PermanentMarker";
  ctx.strokeText(highScore, 10, 20);
  ctx.fillText(highScore, 10, 20);
  handleCollisions();
  if (handleCollisions()) return;
  requestAnimationFrame(animate);
  angle += 0.15;
  hue++;
  frame++;
}
animate();

window.addEventListener("keydown", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") spacePressed = true;
});
window.addEventListener("keyup", function (e) {
  if (e.code === "Space" || e.code === "ArrowUp") spacePressed = false;
  bird.frameX = 0;
});
window.addEventListener("mousedown", function () {
  spacePressed = true;
});
window.addEventListener("mouseup", function () {
  spacePressed = false;
  bird.frameX = 0;
});

const bang = new Image();
bang.src = "./img/bang.png";

function handleCollisions() {
  for (let i = 0; i < obstaclesArray.length; i++) {
    if (
      bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
      bird.x + bird.width > obstaclesArray[i].x &&
      ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
        (bird.y > canvas.height - obstaclesArray[i].bottom &&
          bird.y + bird.height < canvas.height))
    ) {
      ctx.drawImage(bang, bird.x, bird.y, 50, 50);
      ctx.font = "48px PermanentMarker";
      ctx.fillStyle = "black";
      ctx.fillText("Game over", 220, canvas.height / 2 - 20);
      audioGameOver.play();
      return true;
    }
  }
}

function controlSpeed() {
  if (score === 5) {
    gameSpeed = 6;
    audioSpeed.play();
  }
  if (score === 10) {
    gameSpeed = 7;
    audioSpeed.play();
  }
  if (score === 15) {
    gameSpeed = 8;
    audioSpeed.play();
  }
  if (score === 20) {
    gameSpeed = 9;
    audioSpeed.play();
  }
  if (score === 25) {
    gameSpeed = 10;
    audioSpeed.play();
  }
}

btn.addEventListener("click", () => {
  location.reload();
});
