let topLayer;
let img;
let glitchShader;
let myFont;

let lastClickTime = 0;
let doubleClickThreshold = 400;

function preload() {
  glitchShader = loadShader("shader.vert", "shader.frag");
  img = loadImage("qr.png");
  myFont = loadFont("assets/myFont.ttf");
}

function setup() {
  createCanvas(600, 600, WEBGL);

  topLayer = createGraphics(width, height);
  resetScene();

  shader(glitchShader);
}

function draw() {
  if (mouseIsPressed) {
    topLayer.erase();
    topLayer.line(pmouseX, pmouseY, mouseX, mouseY);
    topLayer.noErase();
  }

  glitchShader.setUniform("uTexture", img);
  glitchShader.setUniform("uScratch", topLayer);
  glitchShader.setUniform("uTime", millis() / 1000.0);

  rect(-width / 2, -height / 2, width, height);
}

function resetScene() {
  topLayer.background(0);
  topLayer.fill(255);
  topLayer.textSize(20);
  topLayer.textFont(myFont);
  topLayer.textAlign(CENTER, CENTER);
  topLayer.text(
    "SCRATCH ME TO LEARN ABOUT THE COLLECTION",
    topLayer.width / 2,
    topLayer.height / 2
  );
  topLayer.strokeWeight(150);
}

function mousePressed() {
  let currentTime = millis();
  if (currentTime - lastClickTime < doubleClickThreshold) {
    resetScene();
  }

  lastClickTime = currentTime;
}
