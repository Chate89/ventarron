var acel = 0.1;
var divi = 1;

function Shape() {
  this.loadedPorc = 0;
  // metadata values
  this.metadata = function () {
    this.metavol = floor(map((split(metadata[this.selection*5],":")[1]), 0, 100, 0, 500));
    this.metapan = floor(map((split(metadata[1+this.selection*5],":")[1]), -50, 50, 20, windowWidth-20));
    this.metafreq = float((split(metadata[2+this.selection*5],":")[1]));
    // center xy
    this.size = this.metavol;
    this.x = this.metapan;
    this.y = map(this.metafreq, 0, 1, windowHeight-20, 20);

    // this.freq = pow(10, map(this.y, 20, windowHeight-20, 4.2, 2))

  }

  // muted
  this.muted = false;
  this.solo = false;

  this.eq = false;

  // number of nodes
  this.nodes = floor(random(5, 7));

  // colour values and transparency
  this.redvalon = random(50, 255);
  this.grenvalon = random(50, 150);
  this.bluevalon = 0;
  this.redval = this.redvalon;
  this.grenval = this.grenvalon;
  this.blueval = this.bluevalon;
  this.hl = this.amp;
  this.sat = 50;

  // rotation: position, velocity and direction
  this.rotation = random(1, 10);
  this.rotdir = (random(-1, 1));
  this.rotvelon = random(0.001, 0.002);

  // node xy
  this.centX = 0;
  this.centY = 0;

  // boost trigger
  this.upping = false;
  this.dowing = false;
  this.lefting = false;
  this.righting = false;

  // booster
  this.upboost = 1;
  this.downboost = 1;
  this.leftboost = 1;
  this.rightboost = 1;

  // playing verification
  this.playing = false;

  // selection
  this.selection = 0;

  // stroke selection
  this.ss = false;

  // amp
  this.amp = 0;

  // filter
  this.freq = this.metafreq;

  //mouseover
  this.overing = function() {
    this.overellip = this.size
    if (int(dist(this.x, this.y, mouseX, mouseY)) < this.size/2) {
      this.mouseover = true;
    } else {
      this.mouseover = false;
    }
    // ellipse(this.x, this.y, this.overellip);
  }

  // display the shape
  this.display = function() {
    if (this.playing == true) {
      this.rotvel = this.rotvelon;
    } else if (this.playing == false) {
      this.rotvel = this.rotvelon/divi;
    }

    this.rotation += this.rotvel*(this.rotdir/abs(this.rotdir));
    beginShape();
    if (this.ss == false) {
      noStroke();
    } else {
      stroke(this.redval, this.grenval, this.blueval);
    }
    fill(this.redval, this.grenval, this.blueval, this.sat);
    // noFill();
    for (var i = 0; i < PI*4; i += PI/(this.nodes/2)) {
      this.centX = this.x + (this.amp/5+this.size)*sin(i+this.rotation)/2;
      this.centY = this.y + (this.amp/5+this.size)*cos(i+this.rotation)/2;
      this.sat = 50+this.amp/2;
      curveVertex (this.centX, this.centY);
    }
    endShape();
    if (this.selection == selection-1) {
      textAlign(CENTER);
      textSize(15);
      text('vol: '+this.volume, this.x, this.y-20);
      if (floor(100*this.pan) > 0) {
        text('pan: '+ abs(100*(this.pan.toFixed(2))).toFixed(0)+'R', this.x, this.y);
      } else if (floor(100*this.pan) == 0) {
        text('pan: '+ 'C', this.x, this.y);
      } else if (floor(100*this.pan) < 0) {
        text('pan: '+ abs(100*(this.pan.toFixed(2))).toFixed(0)+'L', this.x, this.y);
      }
      text('freq: '+floor(this.freq), this.x, this.y+20);
    }


    if (this.size <= 0) {
      this.size = 0;
    } else if (this.size >=500) {
      this.size = 500;
    }
  }

  // shape position interaction
  this.boost = function() {

    // arrows trigger
    if (this.selection == selection-1) {
      if (keyIsDown(UP_ARROW)) {
        this.upping = true;
      } else {
        this.upping = false;
      }
      if (keyIsDown(DOWN_ARROW)) {
        this.dowing = true;
      } else {
        this.dowing = false;
      }
      if (keyIsDown(LEFT_ARROW)) {
        this.lefting = true;
      } else {
        this.lefting = false;
      }
      if (keyIsDown(RIGHT_ARROW)) {
        this.righting = true;
      } else {
        this.righting = false;
      }
    } else {
      this.upping = false;
      this.dowing = false;
      this.righting = false;
      this.lefting = false;
    }

    this.y = this.y-this.upboost+this.downboost;
    //up boost
    if (this.upping == true) {
      this.upboost += acel;
    } else if (this.upping == false) {
      if (this.upboost <= 1) {
        this.upboost = 1;
      } else {
        this.upboost -= acel*4;
      }
    }
    //down boost
    if (this.dowing == true) {
      this.downboost += acel;
    } else if (this.upping == false) {
      if (this.downboost <= 1) {
        this.downboost = 1;
      } else {
        this.downboost -= acel*4;
      }
    }

    this.x = this.x-this.leftboost+this.rightboost;
    //left boost
    if (this.lefting == true) {
      this.leftboost += acel;
    } else if (this.lefting == false) {
      if (this.leftboost <= 1) {
        this.leftboost = 1;
      } else {
        this.leftboost -= acel*4;
      }
    }
    //right boost
    if (this.righting == true) {
      this.rightboost += acel;
    } else if (this.righting == false) {
      if (this.rightboost <= 1) {
        this.rightboost = 1;
      } else {
        this.rightboost -= acel*4;
      }
    }
  }

  // boundries
  this.sides = function() {
    if (this.y < 20) {
      this.y = 20;
    }
    if (this.y > windowHeight-20) {
      this.y = windowHeight-20;
    }
    if (this.x < 20) {
      this.x = 20;
    }
    if (this.x > windowWidth-20) {
      this.x = windowWidth-20;
    }
  }

  // size
  this.sizer = function() {
    if (this.selection == selection-1) {
      this.size += wheel;
      if (keyIsDown(SHIFT)) {
        this.size += 5;
      } else if (keyIsDown(CONTROL)) {
        if (this.size <= 5) {
          this.size = 0;
        } else {
          this.size -= 5;
        }
      }
    }
  }

  // audio
  this.sound = function () {
    this.freq = pow(10, map(this.y, 20, windowHeight-20, 4.2, 2))
    if (this.muted == true) {
      this.volume = 0;
    } else {
    this.volume = floor(map(this.size, 0, 500, 0, 100));
    }
    this.pan = map(this.x, 20, windowWidth-20, -1, 1);
    track[this.selection].setVolume(this.volume/100);
    track[this.selection].pan(this.pan);
  }


  // mouse interaction
  this.mouseinteraction = function () {
    if (mouseIsPressed) {
      if (this.selection == selection-1) {
        if (mouseX < this.x) {
          this.x = mouseX + (this.x - pmouseX);
        } else {
          this.x = mouseX - (pmouseX - this.x);
        }
        if (mouseY < this.y) {
          this.y = mouseY + (this.y - pmouseY);
        } else {
          this.y = mouseY - (pmouseY - this.y);
        }
      }
    }
  }
}
