var track1;
var endTime = 164;

function setup(){
  createCanvas(1300, 135);
  track1 = loadSound("data/Module06/00_1.mp3");
}

function draw() {
  // background(0);
  fill(0);
  rectMode(CORNERS);
  rect(0, 0, 1300, 135);

  // track1
  if (track1.isLoaded()) {
    noStroke();
    fill(150);
    beginShape();
    for (var i = 0; i < 650; i++) {
      curveVertex(i*2, 90-abs(track1.getPeaks(650)[i])*180);
    }
    endShape();
    fill(50);
    beginShape();
    for (var i = 0; i < 650; i++) {
      curveVertex(i*2, 90+abs(track1.getPeaks(650)[i])*90);
    }
    endShape();
  }
}

function keyPressed() {
  if (key == ' ') {
    saveCanvas(track1.url.slice(5, 18), 'png');
  }

  if (keyCode == ENTER) {
    track1.play();
  }
}
