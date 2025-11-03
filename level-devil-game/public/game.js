let player;
let cursors;
let spikes;
let ground;
let gameOver = false;

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#222",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
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

function preload() {
  this.load.image("player", "assets/player.png");
  this.load.image("ground", "assets/ground.png");
  this.load.image("spike", "assets/spike.png");
}

function create() {
  ground = this.physics.add.staticGroup();
  ground.create(400, 580, "ground").setScale(2).refreshBody();

  spikes = this.physics.add.staticGroup();
  spikes.create(600, 540, "spike");
  spikes.create(200, 540, "spike");

  player = this.physics.add.sprite(100, 450, "player");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  this.physics.add.collider(player, ground);
  this.physics.add.collider(player, spikes, hitSpike, null, this);
}

function update() {
  if (gameOver) return;

  if (cursors.left.isDown) {
    player.setVelocityX(-200);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);
  } else {
    player.setVelocityX(0);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-450);
  }
}

function hitSpike(player, spike) {
  this.physics.pause();
  player.setTint(0xff0000);
  gameOver = true;

  setTimeout(() => {
    this.scene.restart();
    gameOver = false;
  }, 1000);
}
