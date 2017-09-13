// internal canvas
var topy, bottom, lside, rside;
var bossfader = 255;
var shad = 200;
// shapes
var numShapes = 10;
var shapes = [];
var selection = 0;
var anyOver = 0;
// tracks
var track = [];
var loadcomp = 0;
var lateralshad = 255;
var endTime = 205;
var amp = [];
var porcent = 0;
var waveimg = [];
var filters = [];
var fft;
var ffts = [];
var fftscon = 0;
var redvaleq = [];
var greenvaleq = [];
var bluevaleq = [];
// randomizer
var versions = [];
var raTr = [];
// highlight
var hlc = 0;
var hl;
var playing = false;
var info = false;
var mainCol = 0;
var botlock = false;
var loadshade;
var overI = false;
var overL = false
var wheel = 0;

//fullscreen choose
var screench = false;
var scrchshade = 255;
var mainshade = 255;
var loadingtotal = 0;
var nav;

var lenguage = 0; // 0=eng, 1=esp
var rpi = '';

var snows = [];



function preload() {
  juraBook = loadFont('data/Jura-Book.ttf');
  metadata = loadStrings('data/metadata.json');
  // metadata: versions
  // for (var i = 0; i < numShapes; i++) {
  //   waveimg[i] = loadImage("data/waveShapes/Module0" + (i+1) + "_00_1.png");
  // }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // internal canvas
  topy = 10;
  bottom = windowHeight - 10;
  lside = 5;
  rside = windowWidth - 5;
  mouseX = windowWidth/2
  mouseY = windowHeight/2

 // navigator
 //Check if browser is IE
   if (navigator.userAgent.search("MSIE") >= 0) {
     nav = 'ie';
   }

   //Check if browser is Chrome
   else if (navigator.userAgent.search("Chrome") >= 0) {
     nav = 'ch';
   }
   //Check if browser is Firefox
   else if (navigator.userAgent.search("Firefox") >= 0) {
     nav = 'ff';
   }
   //Check if browser is Safari
   else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
     nav = 'sf';
   }
   //Check if browser is Opera
   else if (navigator.userAgent.search("Opera") >= 0) {
     nav = 'op';
   }

  // snow
  for (var i = 0; i < cops; i++) {
    snows[i] = new Snow();
  }

  // shapes setup
  for (var i = 0; i < numShapes; i++) {
    shapes[i] = new Shape();
  }

  for (var i = 0; i < numShapes; i++) {
    versions[i] = split(metadata[3+(i*5)],":")[1];
  }

  // randomizer & track loading
  for (var i = 0; i < numShapes; i++) {
    raTr[i] = floor(random(0, versions[i]))+1;
    track[i] = loadSound("data/Module0" + (i) + "/00_" + raTr[i] + '.mp3', loaded);
  }

  // ffts
  for (var i = 0; i < numShapes; i++) {
    ffts[i] = new p5.FFT();
    ffts[i].setInput(track[i]);
  }

  // filters
  for (var i = 0; i < track.length; i++) {
    filter[i] = new p5.BandPass()
    filter[i].res(1);
  }

  // amps
  for (var i = 0; i < track.length; i++) {
    amp[i] = new p5.Amplitude()
    amp[i].setInput(track[i])
  }

  // track selection asign & metadata loading
  for (var i = 0; i < shapes.length; i++) {
    shapes[i].selection = i;
    shapes[i].metadata();
  }

  for (var i = 0; i < numShapes; i++) {
    redvaleq[i] = floor(random(0, 255));
    greenvaleq[i] = floor(random(0, 255));
    bluevaleq[i] = floor(random(0, 255));
  }

}

function loaded() {
  loadcomp++;
}

function windowResized() {
  bottom = windowHeight - 10;
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background (mainCol);
  noStroke();
  // if (loadcomp == 6) {
  //   console.log(pow(10, map(shapes[0].y, 20, windowHeight-20, 4.2, 1)));
  // }


  for (var i = 0; i < shapes.length; i++) {
    ffts[i].analyze();
  }

  for (var i = 0; i < shapes.length; i++) {
    filter[i].freq(shapes[i].freq);
  }

  // shaping
  if (scrchshade < 1) {
    for (var i = 0; i < shapes.length; i++) {
      // shapes[i].nodes = raTr[i]+1;
      shapes[i].display();
      shapes[i].overing();
      shapes[i].boost();
      shapes[i].sides();
      shapes[i].sizer();
      shapes[i].mouseinteraction();
      amp[i].smoothing = 0.9;
      shapes[i].amp = amp[i].volume*2000;
      shapes[i].sound();
    }
  }
  wheel = 0;

  // fft.analyze();
  // for (var i = 0; i < ffts.length; i++) {
  //   ffts[i].analyze();
  // }



  // play trigger
  for (var i = 0; i < shapes.length; i++) {
    if (playing == false) {
      shapes[i].redval = 50;
      shapes[i].grenval = 50;
      shapes[i].blueval = 50;
      shapes[i].playing = false;
      divi = 3;
    } else if (playing == true && shapes[i].muted == false) {
      shapes[i].redval = shapes[i].redvalon;
      shapes[i].grenval = shapes[i].grenvalon;
      shapes[i].blueval = shapes[i].bluevalon;
      shapes[i].playing = true;
      divi = 1;
    }
  }

  // highlight
  hlc += 0.04;
  hl = 10+10*cos(PI*hlc);
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i] == shapes[selection-1]) {
      shapes[i].ss = true;
    } else {
      shapes[i].ss = false;
    }
  }

  rectMode(CORNER);


  // internal canvas
  noStroke();
  fill(0, bossfader);
  rect(lside, topy, rside-lside, bottom-topy);

  // timecorrection trigger
  if (loadcomp == 6 && abs(track[0].currentTime()-track[5].currentTime()) >= 0.1) {
    // console.log(abs(track[0].currentTime()-track[5].currentTime()));
    timecorrection();
  }

  // snows
  for (var i = 0; i < snows.length; i++) {
    snows[i].y += snows[i].ydirection;
    snows[i].x += snows[i].xdirection;
    snows[i].display();
    snows[i].sides();
  }

  // loader
  if (loadcomp < shapes.length) {
    bossfader = 255;
  } else {
    bossfader -= 0.1;
    if (bossfader <= 0) {
      bossfader = 0;
    } else {
      bossfader -= 0.1;
    }
  }

  if (info == true) {
    information();
  } else if (info == false || playing == true) {
    if (bottom > 650) {
      ypos = 150;
    } else {
      ypos = 80;
    }
    stroSatI = 0;
    if (bossfader > 0) {
      bossfader -= 5;
    } else if ( bossfader <= 0) {
      bossfader = 0;
    }
  }

  // info button
  if (info == true) {
    fill(70, 30, 0, 255);
  } else {
    fill(0, 200);
  }
  if (overI == true) {
    stroke(200, 100, 0, 255);
  } else {
    stroke(200, 100, 0, 100);
  }
  rectMode(CENTER)
  rect(lside+30, topy+30, 30, 30, 5);
  fill(200, 100, 0, 100);
  noStroke();
  textSize(12);
  textFont('Arial');
  textStyle(ITALIC);
  text("Info", lside+30, topy+30);
  textStyle(NORMAL);
  noFill();
  stroke(200, 100, 0, stroSatI);
  rectMode(CORNER);
  textFont(juraBook);

  // leng buttom
    if (overL == true) {
    stroke(200, 100, 0, 255);
  } else {
    stroke(200, 100, 0, 100);
  }
  rectMode(CENTER)
  fill(0, 200);
  rect(lside+45, bottom-30, 60, 30, 5);
  fill(200, 100, 0, 100);
  noStroke();
  textSize(12);
  textFont('Arial');
  textStyle(ITALIC);
  if (lenguage == 0) {
    text("Leng: EN", lside+45, bottom-30);
  } else {
    text("Leng: ES", lside+45, bottom-30);
  }
  textStyle(NORMAL);
  noFill();
  stroke(200, 100, 0, stroSatI);
  rectMode(CORNER);
  textFont(juraBook);


  // calls all front panels
  panels();
  // calls master control
  master();

  if (scrchshade < 1) {
    if (mainshade > 0) {
      mainshade -= 3;
    } else {
      mainshade = 0;
    }
  } else {
    mainshade = 255;
  }
  noStroke();
  fill(0, mainshade);
  rect(0, 0, windowWidth, windowHeight);

  if (screench == false) {
    scrchshade = 120;
  } else {
    if (scrchshade <= 0) {
      scrchshade = 0;
    } else {
      scrchshade -= 3;
    }
  }

  // screen choose
    rectMode(CENTER);
    fill(200, 120, 0, scrchshade/2-45);
    stroke(200, 100, 0, scrchshade);
    rect(windowWidth/2, windowHeight/2-20, 400, 130, 5, 5, 5, 5);
    noFill();
    if (mouseX >= windowWidth/2-150 && mouseX <= windowWidth/2-50 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(200, 100, 0, scrchshade*2);
    } else {
      stroke(200, 100, 0, scrchshade);
    }
    fill(200, 120, 0, scrchshade/2-45);
    rect(windowWidth/2-100, windowHeight/2, 100, 50, 5, 5, 5, 5);

    if (mouseX >= windowWidth/2+50 && mouseX <= windowWidth/2+150 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(200, 100, 0, scrchshade*2);
    } else {
      stroke(200, 100, 0, scrchshade);
    }
    rect(windowWidth/2+100, windowHeight/2, 100, 50, 5, 5, 5, 5);
    fill(200, 100, 0, scrchshade);
    // stroke(200, 100, 0, scrchshade);
    noStroke();
    textSize(25);
    text(infoData[lenguage].screench, windowWidth/2, windowHeight/2-60)
    textSize(15);
    text(infoData[lenguage].windowed, windowWidth/2-100, windowHeight/2, 100, 50);
    text(infoData[lenguage].fullscreen, windowWidth/2+100, windowHeight/2, 100, 50);

  // loading state
  textAlign(CENTER);
  textFont(juraBook);
  if (loadcomp < track.length) {
    loadshade = 255;
  } else {
    if (loadshade <= 0) {
      loadshade = 0;
    } else {
      loadshade -= 3;
    }
  }
  if (playing == false && info  == false) {
    noStroke();
    fill(100, 50, 0, loadshade);
    textSize(20);
    text(infoData[lenguage].loading, windowWidth/2, windowHeight/2+100);
    textSize(20);
    text("(" + loadcomp + " / " + track.length +")",  windowWidth/2, windowHeight/2+120);
    fill(100, 150-loadshade);
    fill(50, 255-loadshade);
    if (screench == true) {
      text(infoData[lenguage].spacebarBarPress, windowWidth/2, 3*windowHeight/4);
    }
  }
}

function mousePressed() {
  // info
  if (info == false) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[i].mouseover == true) {
        selection = i+1;
      } else if (shapes[i].mouseover == false && selection == i+1)
      selection = 0;
    }
  }

  if (screench == true && overL == true) {
    if (lenguage == 0) {
      lenguage = 1;
    } else {
      lenguage = 0;
    }
  }

  // screench
  if (screench == true) {
    if (overI == true) {
      if (info == false) {
        info = true;
      } else {
        info = false;
      }
    }
  } else {
    if (mouseX >= windowWidth/2-150 && mouseX <= windowWidth/2-50 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      fullscreen(false);
      screench = true;
    } else if (mouseX >= windowWidth/2+50 && mouseX <= windowWidth/2+150 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      fullscreen(true);
      screench = true;
    }
  }
}

function mouseWheel(event) {
  wheel = -event.delta;
}

function keyPressed() {
  // info
  if ((key == 'i' || key == 'I' || keyCode == ESCAPE) && screench == true) {
    if (info == false) {
      info = true;
    } else if (info == true) {
      info = false;
    }
  }

  // selection
  if (key == 0 && key != ' ') {
    if (selection != 10) {
      selection = 10;
    } else {
      selection = 0;
    }
  }
  for (var i = 1; i < shapes.length+1; i++) {
    if (key == i && key != ' ') {
      if (selection != i) {
        selection = i;
      } else {
        selection = 0;
      }
    }
  }

  if (selection != 0) {
    if (key == 'e' || key == 'E') {
      if (shapes[selection-1].eq == false) {
        track[selection-1].disconnect();
        track[selection-1].connect(filter[selection-1]);
        amp[selection-1].setInput(filter[selection-1])
        shapes[selection-1].eq = true;
      } else if (shapes[selection-1].eq == true) {
        track[selection-1].disconnect();
        track[selection-1].connect();
        amp[selection-1].setInput(track[selection-1])
        shapes[selection-1].eq = false;
      }
    }
  }

  // fullscreen
  if (key == 'f' || key == 'F') {
    if (fullscreen(false)) {
      fullscreen(true);
    } else if (fullscreen(true)) {
      fullscreen(false);
    }
    if (screench == false) {
      screench = true;
    }
  }

  // mute
  if (selection != 0) {
    if (key == 'm' || key == 'M') {
      if (shapes[selection-1].muted == false) {
        shapes[selection-1].muted = true;
        shapes[selection-1].redval = 50;
        shapes[selection-1].grenval = 50;
        shapes[selection-1].blueval = 50;
      } else if (shapes[selection-1].muted == true) {
        shapes[selection-1].muted = false;
        shapes[selection-1].redval = shapes[selection-1].redvalon;
        shapes[selection-1].grenval = shapes[selection-1].grenvalon;
        shapes[selection-1].blueval = shapes[selection-1].bluevalon;
      }
    }
  }

  // solo
  if (selection != 0) {
    if (key == 's' || key == 'S') {
      if (shapes[selection-1].solo == false) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].solo = false;
            shapes[i].muted = true;
            shapes[i].redval = 50;
            shapes[i].grenval = 50;
            shapes[i].blueval = 50;
        }
        shapes[selection-1].solo = true;
        shapes[selection-1].muted = false;
        shapes[selection-1].redval = shapes[selection-1].redvalon;
        shapes[selection-1].grenval = shapes[selection-1].grenvalon;
        shapes[selection-1].blueval = shapes[selection-1].bluevalon;
      } else if (shapes[selection-1].solo == true) {
        for (var i = 0; i < shapes.length; i++) {
            shapes[i].muted = false;
            shapes[i].redval = shapes[i].redvalon;
            shapes[i].grenval = shapes[i].grenvalon;
            shapes[i].blueval = shapes[i].bluevalon;
        }
        shapes[selection-1].solo = false;
      }
    }
  }

  // stop
  if (keyCode == ENTER) {
    for (var i = 0; i < track.length; i++) {
      track[i].stop();
      playing = false;
      bossfader = 255;
    }
  }

  // hardReset: metadata
  if (key == 'r' || key == 'R') {
    for (var i = 0; i < track.length; i++) {
      reset();
    }
  }

  // jump to test
  for (var i = 0; i < track.length; i++) {
    if (key == 'u' || key == 'U') {
      track[i].jump(150);
    }
  }

  // play - pause
  if (key == ' ') {
    tooglePlaying();
  }
}

function reset() {
 for (var i = 0; i < shapes.length; i++) {
   shapes[i].metadata();
 }
}

function tooglePlaying() {
  if (loadcomp == numShapes) {
    if (playing == true) {
      for (var i = 0; i < track.length; i++) {
        track[i].pause();
      }
      for (var i = 0; i < track.length; i++) {
        track[i].pauseTime = track[0].pauseTime;
      }
    } else {
      // for firefox
      if (nav == 'ff') {
        for (var i = 0; i < track.length; i++) {
          track[i].play();
        }
      } else if (nav == 'sf') {
        for (var i = 0; i < track.length; i++) {
          track[i].play((6-i)*0.09);
        }
      } else {
        for (var i = 0; i < track.length; i++) {
          track[i].play((6-i)*0.33);
        }
      }
    }
    if (playing == true) {
      playing = false;
    } else if (playing == false) {
      playing = true;
    }
  }
}

function panels() {

  //external canvas
  fill(0);
  noStroke();
  // top
  rect(0, 0, windowWidth, topy);
  // bottom
  rect(0, bottom, windowWidth, windowHeight);

  if (lside > 10 || rside < windowWidth - 10) {
    lateralshad = 220;
  } else {
    lateralshad = 255;
  }
  fill(0, lateralshad)
  // left
  rect(0, 0, lside, windowHeight);
  // right
  rect(rside, 0, windowWidth, windowHeight);

  // panel perimeter
  noFill();
  stroke(200, 100, 0, 150);
  rect(lside, topy, rside-lside, bottom-topy, 5);

  // panel slide: right
  if ((mouseX > rside || info == true) && (mouseIsPressed == false || rside <= windowWidth-200)) {
    if (rside <= windowWidth-200) {
      rside = windowWidth-200
    } else {
      rside -= 10;
    }
  } else {
    if (rside < windowWidth-5) {
      rside += 10;
    } else {
      rside = windowWidth-5;
    }
  }

  // right panel information
  fill(200, 100, 0, 200);
  noStroke();
  // rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textSize(17);
  text(rpi, rside+20, topy+10, 170, bottom-10);
  stroke(200, 100, 0, 150);

  // panel slide: left
  if ((mouseX < lside || info == true) && (mouseIsPressed == false || lside >= 200)) {
    if (lside >= 200) {
      lside = 200
    } else {
      lside += 10;
    }
  } else {
    if (lside > 5) {
      lside -= 10;
    } else {
      lside = 5
    }
  }

  // panel slide: bottom
  if (botlock == false) {
    if ((mouseY > bottom || info == true) && (mouseIsPressed == false || bottom <= windowHeight-50)) {
      if (bottom <= windowHeight-50) {
        bottom = windowHeight-50
      } else {
        bottom -= 5;
      }
    } else {
      if (bottom < windowHeight-10) {
        bottom += 3;
      } else {
        bottom = windowHeight-10;
      }
    }
  } else {
    bottom = windowHeight-50;
  }

  // panel slide: top
  if (botlock == false) {
    if ((mouseY < topy) && (mouseIsPressed == false || topy >= 135)) {
      if (topy >= 135) {
        topy = 135
      } else {
        topy += 7;
      }
    } else {
      if (topy > 10) {
        topy -= 5;
      } else {
        topy = 10;
      }
    }
  } else {
    topy = 135;
  }

}

function timecorrection() {
  for (var i = 1; i < track.length; i++) {
    if (abs(track[i].currentTime()-track[0].currentTime()) >= 0.1) {
      // track[i].jump(100);
      track[i].pauseTime
    }
  }
}
