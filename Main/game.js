const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 60,
  width: 50,
  height: 50,
  speed: 5
};

let bullets = [];
let enemies = [];
let score = 0;

function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
  ctx.fillStyle = "yellow";
  bullets.forEach(b => {
    ctx.fillRect(b.x, b.y, 5, 10);
    b.y -= 7;
  });
  bullets = bullets.filter(b => b.y > 0);
}

function drawEnemies() {
  ctx.fillStyle = "red";
  enemies.forEach(e => {
    ctx.fillRect(e.x, e.y, e.width, e.height);
    e.y += 3;
  });
  enemies = enemies.filter(e => e.y < canvas.height);
}

function checkCollisions() {
  bullets.forEach((b, bi) => {
    enemies.forEach((e, ei) => {
      if (b.x < e.x + e.width &&
          b.x + 5 > e.x &&
          b.y < e.y + e.height &&
          b.y + 10 > e.y) {
        bullets.splice(bi, 1);
        enemies.splice(ei, 1);
        score += 100;
      }
    });
  });
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 25);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawBullets();
  drawEnemies();
  checkCollisions();
  drawScore();
  requestAnimationFrame(gameLoop);
}

function spawnEnemy() {
  let x = Math.random() * (canvas.width - 40);
  enemies.push({ x: x, y: -40, width: 40, height: 40 });
}
setInterval(spawnEnemy, 1000);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") player.x -= player.speed;
  if (e.key === "ArrowRight") player.x += player.speed;
  if (e.key === " " || e.key === "Spacebar") {
    bullets.push({ x: player.x + player.width / 2 - 2.5, y: player.y });
  }
});

gameLoop();
