const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up constants
const GRAVITY = 0.6;
const FLOOR_Y = 330;
const PLAYER_SPEED = 4;
const JUMP_FORCE = 12;

// Game states
let isGameOver = false;
let levelComplete = false;

// Load images
const playerImg = new Image();
playerImg.src = 'assets/player.png';

const spikeImg = new Image();
spikeImg.src = 'assets/spikes.png';

const tileImg = new Image();
tileImg.src = 'assets/tiles.png';

// Player setup
let player = {
  x: 50,
  y: FLOOR_Y - 40,
  width: 30,
  height: 40,
  dx: 0,
  dy: 0,
  jumping: false
};

// Door and spikes
const door = { x: 700, y: FLOOR_Y - 50, width: 30, height: 50 };
const spikes = [
  { x: 300, y: FLOOR_Y - 20, width: 40, height: 20 },
  { x: 500, y: FLOOR_Y - 20, width: 40, height: 20 }
];

// Controls
const keys = {};
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Update loop
function update() {
  if (isGameOver || levelComplete) return;

  // Horizontal movement
  if (keys['ArrowLeft']) player.dx = -PLAYER_SPEED;
  else if (keys['ArrowRight']) player.dx = PLAYER_SPEED;
  else player.dx = 0;

  // Jump
  if (keys['ArrowUp'] && !player.jumping) {
    player.dy = -JUMP_FORCE;
    player.jumping = true;
  }

  // Apply gravity
  player.dy += GRAVITY;

  // Update position
  player.x += player.dx;
  player.y += player.dy;

  // Floor collision
  if (player.y + player.height >= FLOOR_Y) {
    player.y = FLOOR_Y - player.height;
    player.dy = 0;
    player.jumping = false;
  }

  // Spikes collision
  for (let s of spikes) {
    if (
      player.x < s.x + s.width &&
      player.x + player.width > s.x &&
      player.y < s.y + s.height &&
      player.y + player.height > s.y
    ) {
      gameOver();
    }
  }

  // Door collision (exit)
  if (
    player.x < door.x + door.width &&
    player.x + player.width > door.x &&
    player.y < door.y + door.height &&
    player.y + player.height > door.y
  ) {
    levelWin();
  }

  draw();
  requestAnimationFrame(update);
}

// Draw game
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw floor
  for (let i = 0; i < canvas.width; i += 40) {
    ctx.drawImage(tileImg, i, FLOOR_Y, 40, 40);
  }

  // Draw spikes
  for (let s of spikes) {
    ctx.drawImage(spikeImg, s.x, s.y, s.width, s.height);
  }

  // Draw door
  ctx.fillStyle = '#b8b8b8';
  ctx.fillRect(door.x, door.y, door.width, door.height);

  // Draw player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

// Game over
function gameOver() {
  isGameOver = true;
  setTimeout(() => {
    alert('💀 Game Over! You hit a spike.');
    location.reload();
  }, 100);
}

// Level complete
function levelWin() {
  levelComplete = true;
  setTimeout(() => {
    alert('🎉 Level Complete!');
    location.reload();
  }, 100);
}

tileImg.onload = update;
