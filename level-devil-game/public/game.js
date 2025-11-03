const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load images
const playerImg = new Image();
playerImg.src = './assets/player.png';

const spikeImg = new Image();
spikeImg.src = './assets/spikes.png';

const tileImg = new Image();
tileImg.src = './assets/tiles.png';

const doorColor = '#b8b8b8'; // door placeholder color

// Game variables
let gravity = 0.6;
let floorY = 300;
let isGameOver = false;

// Player object
let player = {
  x: 50,
  y: floorY - 40,
  width: 20,
  height: 40,
  dx: 0,
  dy: 0,
  speed: 4,
  jumping: false
};

// Door and spike positions
const door = { x: 700, y: floorY - 50, width: 30, height: 50 };
const spikes = [{ x: 400, y: floorY - 20, width: 30, height: 20 }];

// Keyboard controls
const keys = {};
document.addEventListener('keydown', e => (keys[e.key] = true));
document.addEventListener('keyup', e => (keys[e.key] = false));

// Game loop
function update() {
  if (isGameOver) return;

  // Move left/right
  if (keys['ArrowLeft']) player.dx = -player.speed;
  else if (keys['ArrowRight']) player.dx = player.speed;
  else player.dx = 0;

  // Jump
  if (keys['ArrowUp'] && !player.jumping) {
    player.dy = -12;
    player.jumping = true;
  }

  // Gravity
  player.dy += gravity;
  player.x += player.dx;
  player.y += player.dy;

  // Floor collision
  if (player.y + player.height >= floorY) {
    player.y = floorY - player.height;
    player.dy = 0;
    player.jumping = false;
  }

  // Check spikes
  for (let s of spikes) {
    if (
      player.x < s.x + s.width &&
      player.x + player.width > s.x &&
      player.y < s.y + s.height &&
      player.y + player.height > s.y
    ) {
      isGameOver = true;
      alert('💀 You hit a spike!');
      location.reload();
    }
  }

  // Door collision (win)
  if (
    player.x < door.x + door.width &&
    player.x + player.width > door.x &&
    player.y < door.y + door.height &&
    player.y + player.height > door.y
  ) {
    alert('🎉 Level Complete!');
    location.reload();
  }

  draw();
  requestAnimationFrame(update);
}

// Draw game scene
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw floor (tiles)
  ctx.drawImage(tileImg, 0, floorY, canvas.width, 40);

  // Draw spikes
  for (let s of spikes) {
    ctx.drawImage(spikeImg, s.x, s.y, s.width, s.height);
  }

  // Draw door
  ctx.fillStyle = doorColor;
  ctx.fillRect(door.x, door.y, door.width, door.height);

  // Draw player
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
}

tileImg.onload = update;
