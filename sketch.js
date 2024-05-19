let stars = [];
let numStars = 1000;
let speed = 4;
let warpSpeed = false;
let img;
let imgWidth, imgHeight;

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

  // Calculate initial image dimensions
  calculateImageDimensions();

  // Prevent default behavior on touch events
  let canvasElement = document.getElementsByTagName('canvas')[0];
  canvasElement.addEventListener('touchstart', preventDefault);
  canvasElement.addEventListener('touchmove', preventDefault);
  canvasElement.addEventListener('touchend', preventDefault);
}

function draw() {
  background(0);
  translate(0, 0, -width); // Move camera back to see the whole starfield

  // Move through the starfield
  for (let star of stars) {
    star.update();
    star.show();
  }

  // Draw the resized image at the center of the canvas
  push();
  translate(-imgWidth / 2, -imgHeight / 2); // Center the image
  image(img, 0, 0, imgWidth, imgHeight);
  pop();
}

function mousePressed() {
  warpSpeed = true;
}

function mouseReleased() {
  warpSpeed = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDimensions();
}

function calculateImageDimensions() {
  // Calculate the aspect ratio of the image
  let imgAspect = img.width / img.height;
  let canvasAspect = windowWidth / windowHeight;

  if (canvasAspect > imgAspect) {
    // If canvas is wider than the image, fit image height to canvas height
    imgHeight = windowHeight;
    imgWidth = imgAspect * imgHeight;
  } else {
    // If canvas is taller than the image, fit image width to canvas width
    imgWidth = windowWidth;
    imgHeight = imgWidth / imgAspect;
  }
}

function preventDefault(e) {
  e.preventDefault();
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
