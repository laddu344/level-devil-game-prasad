// Simple Level Devil style platformer using Phaser.js
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 450,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);
let player, cursors, platforms, spikes, text, trapTriggered = false;

function preload() {
  this.load.image('player', 'assets/player.png');
  this.load.image('tiles', 'assets/tiles.png');
  this.load.image('spikes', 'assets/spikes.png');
}

function create() {
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 440, 'tiles').setScale(2).refreshBody();

  // Hidden trap platform
  const fakePlatform = this.physics.add.staticImage(400, 300, 'tiles');
  fakePlatform.name = 'trap';

  player = this.physics.add.sprite(100, 360, 'player');
  player.setBounce(0.1);
  player.setCollideWorldBounds(true);

  spikes = this.physics.add.staticGroup();
  spikes.create(700, 420, 'spikes');

  this.physics.add.collider(player, platforms);
  this.physics.add.collider(player, fakePlatform, trapFall, null, this);
  this.physics.add.overlap(player, spikes, gameOver, null, this);

  cursors = this.input.keyboard.createCursorKeys();

  text = this.add.text(20, 20, 'Reach the right side →', { fontSize: '20px', fill: '#fff' });
}

function update() {
  if (trapTriggered) return;

  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-350);
  }

  if (player.x > 780) {
    text.setText('😈 You escaped... this time!');
  }
}

function trapFall(player, platform) {
  if (platform.name === 'trap' && !trapTriggered) {
    trapTriggered = true;
    text.setText('💀 Trap triggered! Floor disappeared!');
    platform.destroy();
  }
}

function gameOver() {
  text.setText('☠️ You hit spikes! Restart to try again.');
  player.setTint(0xff0000);
  trapTriggered = true;
}
