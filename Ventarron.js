// internal canvas
var topy, bottom, lside, rside;
var bossfader = 255;
var shad = 100;
// shapes
var numShapes = 10;
var shapes = [];
var selection = 0;
var anyOver = 0;
// tracks
var track = [];
var inter;
var loadcomp = 0;
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
var botLockTop = false;
var botLockBottom = false;
var loadshade;
var overI = false;
var overL = false
var wheel = 0;
var masterpos = [false, 0, 1];

//fullscreen choose
var screench = false;
var scrchshade = 255;
var mainshade = 255;
var loadingtotal = 0;
var nav;

var lenguage = 0; // 0=eng, 1=esp
var lengSel = false;
var rpi = '';
var reseter = true;
var porcentOK = 0;
var colsel = 0;
var colours = [
  {
    "maincol1": 0,
    "maincol2": 0,
    "maincol3": 0,
    "red1": 200,
    "green1": 100,
    "blue1": 0,
    "red2": 100,
    "green2": 50,
    "blue2": 0,
    "red3": 70,
    "green3": 30,
    "blue3": 0,
    "grey1": 50,
    "grey2": 100,
    "panels1": 0,
    "panels2": 0,
    "panels3": 0,
    "sstart1": 200,
    "fstart1": 100,
    "inforon": 70,
    "infogon": 30,
    "infobon": 0,
    "inforoff": 0,
    "infogoff": 0,
    "infoboff": 0,
    "inforstr": 200 ,
    "infogstr": 100,
    "infobstr": 0,
    "eqbars": 20,
  },
  {
    "maincol1": 230,
    "maincol2": 230,
    "maincol3": 230,
    "red1": 0,
    "green1": 0,
    "blue1": 0,
    "red2": 20,
    "green2": 20,
    "blue2": 20,
    "red3": 180,
    "green3": 180,
    "blue3": 180,
    "grey1": 50,
    "grey2": 100,
    "panels1": 180,
    "panels2": 180,
    "panels3": 180,
    "sstart1": 0,
    "fstart1": 50,
    "inforon": 150,
    "infogon": 150,
    "infobon": 150,
    "inforoff": 100,
    "infogoff": 100,
    "infoboff": 100,
    "inforstr": 10,
    "infogstr": 10,
    "infobstr": 10,
    "eqbars": 10,
  }
];


var snows = [];

function preload() {
  juraBook = loadFont('data/Jura-Book.ttf');
  metadata = loadStrings('data/metadata.json');
  // inter = loadSound();
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // internal canvas
  topy = 10;
  bottom = windowHeight - 10;
  lside = 5;
  rside = windowWidth - 5;
  mouseX = windowWidth/2;
  mouseY = windowWidth/2;
  masterpos[1] = windowWidth/2+100;

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
  }

  track[0] = loadSound("data/Module0" + (0) + "/00_" + raTr[0] + '.ogg', loaded, null, progress0);
  track[1] = loadSound("data/Module0" + (1) + "/00_" + raTr[1] + '.ogg', loaded, null, progress1);
  track[2] = loadSound("data/Module0" + (2) + "/00_" + raTr[2] + '.ogg', loaded, null, progress2);
  track[3] = loadSound("data/Module0" + (3) + "/00_" + raTr[3] + '.ogg', loaded, null, progress3);
  track[4] = loadSound("data/Module0" + (4) + "/00_" + raTr[4] + '.ogg', loaded, null, progress4);
  track[5] = loadSound("data/Module0" + (5) + "/00_" + raTr[5] + '.ogg', loaded, null, progress5);
  track[6] = loadSound("data/Module0" + (6) + "/00_" + raTr[6] + '.ogg', loaded, null, progress6);
  track[7] = loadSound("data/Module0" + (7) + "/00_" + raTr[7] + '.ogg', loaded, null, progress6);
  track[8] = loadSound("data/Module0" + (8) + "/00_" + raTr[8] + '.ogg', loaded, null, progress8);
  track[9] = loadSound("data/Module0" + (9) + "/00_" + raTr[9] + '.ogg', loaded, null, progress9);

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

function progress0(evt) {
  shapes[0].loadedPorc = evt+0.01;
}
function progress1(evt) {
  shapes[1].loadedPorc = evt+0.01;
}
function progress2(evt) {
  shapes[2].loadedPorc = evt+0.01;
}
function progress3(evt) {
  shapes[3].loadedPorc = evt+0.01;
}
function progress4(evt) {
  shapes[4].loadedPorc = evt+0.01;
}
function progress5(evt) {
  shapes[5].loadedPorc = evt+0.01;
}
function progress6(evt) {
  shapes[6].loadedPorc = evt+0.01;
}
function progress7(evt) {
  shapes[7].loadedPorc = evt+0.01;
}
function progress8(evt) {
  shapes[8].loadedPorc = evt+0.01;
}
function progress9(evt) {
  shapes[9].loadedPorc = evt+0.01;
}

function draw() {
  background (colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3);
  noStroke();

  porcentOK = shapes[0].loadedPorc+shapes[0].loadedPorc+shapes[0].loadedPorc+
    shapes[0].loadedPorc+shapes[0].loadedPorc+shapes[0].loadedPorc+
    shapes[0].loadedPorc+shapes[0].loadedPorc+shapes[0].loadedPorc+
    shapes[0].loadedPorc;


  // trigger nodeSources reseter
  if (loadcomp == track.length && playing == false && reseter == true && track[0].currentTime() > 0) {
    resetNodesTrigger();
    reseter = false;
  } else if (playing == true) {
    reseter = true;
  }

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
      shapes[i].module = i;
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

  // play trigger
  for (var i = 0; i < shapes.length; i++) {
    if (playing == false) {
      shapes[i].redval = colours[colsel].grey1;
      shapes[i].grenval = colours[colsel].grey1;
      shapes[i].blueval = colours[colsel].grey1;
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
    fill(colours[colsel].red3, colours[colsel].green3, colours[colsel].blue3, 255);
  } else {
    fill(colours[colsel].panels1);
  }
  if (overI == true) {
    stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 255);
  } else {
    stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 60);
  }
  rectMode(CENTER)
  rect(lside+30, topy+30, 30, 30, 5);
  fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1);
  noStroke();
  textSize(12);
  textFont('Arial');
  textStyle(ITALIC);
  text("Info", lside+30, topy+30);
  textStyle(NORMAL);
  noFill();
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, stroSatI);
  rectMode(CORNER);
  textFont(juraBook);

  // leng buttom
  if (overL == true) {
    stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 255);
  } else {
    stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 60);
  }
  rectMode(CENTER)
  fill(colours[colsel].panels1);
  rect(lside+45, bottom-30, 60, 30, 5);
  fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1);
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
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, stroSatI);
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
  fill(colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3, mainshade);
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
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, scrchshade/2-45);
    stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, scrchshade);
    rect(windowWidth/2, windowHeight/2-20, 400, 130, 5, 5, 5, 5);
    // noFill();
    if (mouseX >= windowWidth/2-150 && mouseX <= windowWidth/2-50 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, scrchshade*2);
    } else {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, scrchshade);
    }
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, scrchshade/2-45);
    rect(windowWidth/2-100, windowHeight/2, 100, 50, 5, 5, 5, 5);

    if (mouseX >= windowWidth/2+50 && mouseX <= windowWidth/2+150 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, scrchshade*2);
    } else {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, scrchshade);
    }
    rect(windowWidth/2+100, windowHeight/2, 100, 50, 5, 5, 5, 5);
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, scrchshade);
    // stroke(200, 100, 0, scrchshade);
    noStroke();
    textSize(25);
    text(infoData[lenguage].screench, windowWidth/2, windowHeight/2-60)
    textSize(15);
    text(infoData[lenguage].windowed, windowWidth/2-100, windowHeight/2, 100, 50);
    text(infoData[lenguage].fullscreen, windowWidth/2+100, windowHeight/2, 100, 50);

    // lenguage selector
    if (lengSel == false) {
    rectMode(CENTER);
    fill(colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3);
    rect(windowWidth/2, windowHeight/2-20, 410, 140, 5, 5, 5, 5);
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, 120/2-45);
    stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, 120);
    rect(windowWidth/2, windowHeight/2-20, 400, 130, 5, 5, 5, 5);
    noFill();
    if (mouseX >= windowWidth/2-150 && mouseX <= windowWidth/2-50 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, 120*2);
    } else {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, 120);
    }
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, 120/2-45);
    rect(windowWidth/2-100, windowHeight/2, 100, 50, 5, 5, 5, 5);
    if (mouseX >= windowWidth/2+50 && mouseX <= windowWidth/2+150 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, 120*2);
    } else {
      stroke(colours[colsel].sstart1, colours[colsel].sstart1, colours[colsel].sstart1, 120);
    }
    rect(windowWidth/2+100, windowHeight/2, 100, 50, 5, 5, 5, 5);
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, 120);
    // stroke(200, 100, 0, scrchshade);
    noStroke();
    textSize(25);
    text('Lenguage / Idioma', windowWidth/2, windowHeight/2-60);
    textSize(15);
    text('English', windowWidth/2-100, windowHeight/2, 100, 50);
    text('Español', windowWidth/2+100, windowHeight/2, 100, 50);
  }

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
    fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, loadshade);
    textSize(20);
    text(infoData[lenguage].loading, windowWidth/2, windowHeight/2+100);
    textSize(20);
    text("(" + loadcomp + " / " + track.length +")",  windowWidth/2, windowHeight/2+120);
    fill(colours[colsel].grey1, 150-loadshade);
    fill(colours[colsel].grey1, 255-loadshade);
    if (loadshade != 0) {
      rectMode(CORNER)
      fill(colours[colsel].fstart1, colours[colsel].fstart1, colours[colsel].fstart1, loadshade);
      if (porcentOK != 0) {
        rect(windowWidth/2-150, windowHeight/2+150-5, 300*((porcentOK/10)).toFixed(3), 10, 5, 5, 5, 5);
      }
      if (loadcomp != 0) {
        rect(windowWidth/2-150, windowHeight/2+170-5, 300*(loadcomp/track.length), 10, 5, 5, 5, 5);
      }
      rectMode(CENTER);
    }
    noStroke();
    if (screench == true && loadcomp == track.length) {
      fill(colours[colsel].grey1, 150-loadshade);
      stroke(colours[colsel].grey2, 255-loadshade);
      if (lenguage == 0) {
        rect(windowWidth/2+48, windowHeight/2+3, 93, 30, 3, 3, 3, 3);
        rect(windowWidth/2-60, windowHeight/2+30+3, 30, 30, 3, 3, 3, 3);
      } else {
        rect(windowWidth/2+55, windowHeight/2+3, 175, 30, 3, 3, 3, 3);
        rect(windowWidth/2-54, windowHeight/2+30+3, 30, 30, 3, 3, 3, 3);
      }
      fill(colours[colsel].grey2, 255-loadshade);
      noStroke();
      text(infoData[lenguage].spacebarBarPress, windowWidth/2, windowHeight/2);
      text(infoData[lenguage].infobuttominfo, windowWidth/2, windowHeight/2+30);
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

  // lenguage
  if (lengSel == false) {
    if (mouseX >= windowWidth/2-150 && mouseX <= windowWidth/2-50 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      lenguage = 0;
      lengSel = true;
    } else if (mouseX >= windowWidth/2+50 && mouseX <= windowWidth/2+150 &&
    mouseY >= windowHeight/2-25 && mouseY <= windowHeight/2+25) {
      lenguage = 1;
      lengSel = true;
    }
  } else {

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

  // numbers-shape-instrument mouse selector
  if (info && lengSel && screench) {
    for (var i = 0; i < track.length; i++) {
      if (mouseX >= windowWidth/2-350+(i*50)+xpos-20 &&
          mouseX <= windowWidth/2-350+(i*50)+xpos+20 &&
          mouseY >= bottom-235-20 && mouseY <= bottom-235+20) {
        if (selection == i+1) {
          selection = 0;
        } else {
          selection = i+1;
        }
      }
    }
  }

  // info buttons
  if (info) {
    if (mouseX >= windowWidth/2-115+xpos-140 &&
        mouseX <= windowWidth/2-115+xpos+140 &&
        mouseY >= bottom-40-20 &&
        mouseY <= bottom-40+20) {
      //play toogle
      tooglePlaying();
    } else if (mouseX >= windowWidth/2-270+xpos-20 &&
        mouseX <= windowWidth/2-270+xpos+20 &&
        mouseY >= bottom-140-20 &&
        mouseY <= bottom-140+20) {
      // solo
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
    } else if (mouseX >= windowWidth/2+xpos-20 &&
        mouseX <= windowWidth/2+xpos+20 &&
        mouseY >= bottom-90-20 &&
        mouseY <= bottom-90+20) {
      // mute
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
    } else if (mouseX >= windowWidth/2-240+xpos-20 &&
        mouseX <= windowWidth/2-240+xpos+20 &&
        mouseY >= bottom-190-20 &&
        mouseY <= bottom-190+20) {
      // Eq
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
    } else if (mouseX >= windowWidth/2-190+xpos-20 &&
        mouseX <= windowWidth/2-190+xpos+20 &&
        mouseY >= bottom-190-20 &&
        mouseY <= bottom-190+20) {
      // overReset
      reset();
    } else if (mouseX >= windowWidth/2+20+xpos-20 &&
        mouseX <= windowWidth/2+20+xpos+20 &&
        mouseY >= bottom-190-20 &&
        mouseY <= bottom-190+20) {
      // info
      if (info == true) {
        info = false;
      } else {
        info = true;
      }
    } else if (mouseX >= windowWidth/2-180+xpos-20 &&
        mouseX <= windowWidth/2-180+xpos+20 &&
        mouseY >= bottom-140-20 &&
        mouseY <= bottom-140+20) {
      // overInf
      if (fullscreen(false)) {
        fullscreen(true);
      } else if (fullscreen(true)) {
        fullscreen(false);
      }
    }
  }
  if (mouseX >= windowWidth/2+270-10 && mouseX <= windowWidth/2+270+10 &&
  mouseY >= topy-30-10 && mouseY <= topy-30+10) {
    botLockTop = !botLockTop;
  }
  if (mouseX >= lside+15-10 && mouseX <= lside+15+10 &&
  mouseY >= bottom+25-10 && mouseY <= bottom+25+10) {
    botLockBottom = !botLockBottom;
  }
}

function mouseWheel(event) {
  if (nav == 'ff') {
    wheel = -event.delta;
  } else {
    wheel = -event.delta/33*2;
  }
}

function keyPressed() {
  if ((key == 'c' || key == 'C')) {
    colsel = floor(random(0, colours.length))
  }

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

  // eq
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
    selection = 0;
    for (var i = 0; i < track.length; i++) {
      track[i].pause();
      track[i].stop();
      playing = false;
      bossfader = 255;
    }
    resetNodesTrigger();
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
          track[i].play();
        }
      } else {
        for (var i = 0; i < track.length; i++) {
          track[i].play();
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

function resetNodesTrigger() {
  for (var i = 0; i < track.length; i++) {
    track[i].resetNodes();
    // console.log('reseted');
  }
  // selection = 0;
}

function panels() {

  //external canvas
  fill(colours[colsel].panels1, colours[colsel].panels2, colours[colsel].panels3);
  noStroke();
  // top
  rect(0, 0, windowWidth, topy);
  // bottom
  rect(0, bottom, windowWidth, windowHeight);

  // left
  rect(0, 0, lside, windowHeight);
  // right
  rect(rside, 0, windowWidth, windowHeight);

  // panel perimeter
  noFill();
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
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
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 200);
  noStroke();
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  // rectMode(CORNER);
  textAlign(CENTER, CENTER);
  textSize(17);
  if (!info) {
    rpi = infoData[lenguage].info
  }
  text(rpi, rside+20, topy+10, 170, bottom-10);
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);

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

  // Left panel information
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 200);
  noStroke();
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  // rectMode(CORNER);
  textAlign(LEFT);
  textSize(14);
  text(infoData[lenguage].song+infoData[lenguage].songName, lside-190, windowHeight/2-30);
  text(infoData[lenguage].artist+infoData[lenguage].artistName, lside-190, windowHeight/2);
  text(infoData[lenguage].producer+infoData[lenguage].producerName, lside-190, windowHeight/2+30);
  text(infoData[lenguage].album+infoData[lenguage].albumName, lside-190, windowHeight/2+60);

  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  textAlign(CENTER, CENTER);

  // panel slide: bottom
  if (botLockBottom == false) {
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
  rectMode(CENTER, CENTER);
  noStroke()
  if (mouseX >= lside+15-10 && mouseX <= lside+15+10 &&
  mouseY >= bottom+25-10 && mouseY <= bottom+25+10) {
    fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  } else {
    fill(colours[colsel].red2, colours[colsel].green2, colours[colsel].blue2, 150);
  }
  rect(lside+15, bottom+25, 16, 16, 3, 3, 3, 3);
  strokeWeight(2);
  stroke(colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3)
  if (botLockBottom) {
    arc(lside+15, bottom+25-2, 6, 6, PI, TWO_PI);
  } else {
    arc(lside+15, bottom+25-2, 6, 6, PI, TWO_PI-QUARTER_PI);
  }
  noFill()
  rect(lside+15, bottom+25+2, 8, 6, 0, 0, 1, 1);
  strokeWeight(1);
  rectMode(CORNER);

  // panel slide: top
  if (botLockTop == false) {
    if (((mouseY < topy) && (mouseIsPressed == false || topy >= 60) || masterpos[0])) {
      if (topy >= 60) {
        topy = 60
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
    topy = 60;
  }

  // master control
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  rectMode(CENTER, CENTER);
  fill(colours[colsel].panels1-100, colours[colsel].panels2-100, colours[colsel].panels3-100,);
  rect(windowWidth/2, topy-30, 400, 6, 3, 3, 3, 3);
  fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  noStroke();
  rect(windowWidth/2+150, topy-30, 100, 6, 0, 3, 3, 0);
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  fill(colours[colsel].panels1, colours[colsel].panels2, colours[colsel].panels3);
  rect(windowWidth/2+230, topy-30, 40, 20, 3, 3, 3, 3);
  fill(colours[colsel].red3, colours[colsel].green3, colours[colsel].blue3);
  rect(masterpos[1], topy-30, 10, 20, 3, 3, 3, 3);
  rectMode(CORNER);
  fill(colours[colsel].panels1, colours[colsel].panels2, colours[colsel].panels3);
  if (((mouseX >= windowWidth/2-200 && mouseX <= windowWidth/2+200 &&
  mouseY >= topy-30-12 && mouseY <= topy-30+12) && mouseIsPressed) || masterpos[0]){
    masterpos[1] = mouseX;
    masterpos[0] = true;
  }
  if (!mouseIsPressed) {
    masterpos[0] = false;
  }
  if (masterpos[1] <= windowWidth/2-200) {
    masterpos[1] = windowWidth/2-200;
  } else if (masterpos[1] >= windowWidth/2+200) {
    masterpos[1] = windowWidth/2+200;
  }
  if (masterpos[0]) {
    selection = 0;
  }
  noStroke()
  fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  if (masterpos[1] < windowWidth/2+100) {
    masterpos[2] = (map(masterpos[1], windowWidth/2-200, windowWidth/2+100, 0, 1)*100).toFixed(0);
  } else {
    masterpos[2] = (map(masterpos[1], windowWidth/2+100, windowWidth/2+200, 1, 2)*100).toFixed(0);
  }
  text(masterpos[2], windowWidth/2+230, topy-30);
  if (loadcomp == track.length) {
    masterVolume(masterpos[2]/100);
  }
  // botLockTop
  rectMode(CENTER, CENTER);
  if (mouseX >= windowWidth/2+270-10 && mouseX <= windowWidth/2+270+10 &&
  mouseY >= topy-30-10 && mouseY <= topy-30+10) {
    fill(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  } else {
    fill(colours[colsel].red2, colours[colsel].green2, colours[colsel].blue2, 150);
  }
  rect(windowWidth/2+270, topy-30, 16, 16, 3, 3, 3, 3);
  strokeWeight(2);
  stroke(colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3)
  if (botLockTop) {
    arc(windowWidth/2+270, topy-32, 6, 6, PI, TWO_PI);
  } else {
    arc(windowWidth/2+270, topy-32, 6, 6, PI, TWO_PI-QUARTER_PI);
  }
  noFill()
  rect(windowWidth/2+270, topy-28, 8, 6, 0, 0, 1, 1);
  strokeWeight(1);
  rectMode(CORNER);

}

function timecorrection() {
  for (var i = 1; i < track.length; i++) {
    if (abs(track[i].currentTime()-track[0].currentTime()) >= 0.1) {
      // track[i].jump(100);
      track[i].pauseTime
    }
  }
}
