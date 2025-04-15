// A simple browser game using p5.js
let player;
let obstacles = [];
let staticObstacle = null;
let exit;
let gameWon = false;

function setup() {
  createCanvas(800, 600);
  player = createVector(50, height / 2);
  
  // Create moving obstacles
  for (let i = 0; i < 2; i++) {
    obstacles.push({
      pos: createVector(random(width), random(height)),
      size: createVector(random(30, 60), random(30, 60)),
      color: color(random(255), random(255), random(255)),
      velocity: p5.Vector.random2D().mult(random(1, 3))
    });
  }

  // Exit is on the right edge of the screen
  exit = {
    x: width - 50,
    y: height / 2 - 50,
    w: 40,
    h: 100
  };
}

function draw() {
  background(220);

  // Draw the exit
  fill(0, 255, 0);
  rect(exit.x, exit.y, exit.w, exit.h);

  // Draw player
  fill(0, 0, 255);
  rect(player.x, player.y, 30, 30);

  if (!gameWon) {
    handleMovement();
    moveObstacles();
  }

  // Draw moving obstacles
  for (let obs of obstacles) {
    fill(obs.color);
    rect(obs.pos.x, obs.pos.y, obs.size.x, obs.size.y);
  }

  // Draw static obstacle
  if (staticObstacle) {
    fill(150);
    rect(staticObstacle.x, staticObstacle.y, staticObstacle.w, staticObstacle.h);
  }

  // Check if player wins
  if (
    player.x + 30 > exit.x &&
    player.y > exit.y &&
    player.y < exit.y + exit.h
  ) {
    gameWon = true;
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("You Win!", width / 2, height / 2);
  }
}

function handleMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    player.x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    player.y -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    player.y += 5;
  }

  // Keep player inside the canvas
  player.x = constrain(player.x, 0, width - 30);
  player.y = constrain(player.y, 0, height - 30);
}

function moveObstacles() {
  for (let obs of obstacles) {
    obs.pos.add(obs.velocity);

    // Wrap around edges
    if (obs.pos.x > width) {
      obs.pos.x = 0;
    } else if (obs.pos.x + obs.size.x < 0) {
      obs.pos.x = width;
    }
    if (obs.pos.y > height) {
      obs.pos.y = 0;
    } else if (obs.pos.y + obs.size.y < 0) {
      obs.pos.y = height;
    }
  }
}

function mousePressed() {
  if (!staticObstacle) {
    staticObstacle = {
      x: mouseX,
      y: mouseY,
      w: 40,
      h: 40
    };
  }
}
