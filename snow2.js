var cops = 100;

function Snow() {
  this.x = random(0, windowWidth);
  this.y = random(0, windowHeight+100);
  this.size = random(5, 15);
  this.col = random(150, 200);
  this.redvalon = random(200, 255);
  this.grenvalon = random(150, 255);
  this.bluevalon = 0;

  this.sat = random(0, 20);
  this.xdirection = random(-0.1, 0.1);
  this.ydirection = random(-0.1, 0.1);
  this.display = function() {
    noStroke();
    if (playing == false) {
      fill(this.col, this.sat);
    } else {
      fill(this.redvalon, this.grenvalon, this.bluevalon, this.sat);
    }
    ellipse(this.x, this.y, this.size)
  }
  this.sides = function() {
    if (this.x > windowWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = windowWidth;
    }

    if (this.y > windowHeight+100) {
      this.y = 0;
    } else if (this.y < 0) {
      this.y = windowHeight+100;
    }
  }
}
