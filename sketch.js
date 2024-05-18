let stars = [];
let numStars = 200;
let speed = 4;
let warpSpeed = false;
let img;

function preload() {
  // Load the image using the p5.js loadImage function
  img = loadImage('pentaquarksmall.png'); // Load the uploaded image
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  // Create stars
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background(0);
  translate(0, 0, -width); // Move camera back to see the whole starfield

  // Move through the starfield
  for (let star of stars) {
    star.update();
    star.show();
  }

  // Draw the image at the center of the canvas
  push();
  translate(-img.width / 2, -img.height / 2); // Center the image
  image(img, 0, 0);
  pop();
}

function mousePressed() {
  warpSpeed = true;
}

function mouseReleased() {
  warpSpeed = false;
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;
  }

  update() {
    this.z -= warpSpeed ? speed * 5 : speed; // Warp speed is 5 times the normal speed
    if (this.z < 1) {
      this.z = width;
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.pz = this.z;
    }
  }

  show() {
    fill(255);
    noStroke();

    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);

    let px = map(this.x / this.pz, 0, 1, 0, width);
    let py = map(this.y / this.pz, 0, 1, 0, height);

    this.pz = this.z;

    if (warpSpeed) {
      stroke(255);
      line(px, py, sx, sy);
    } else {
      let r = map(this.z, 0, width, 8, 0);
      ellipse(sx, sy, r, r);
    }
  }
}
