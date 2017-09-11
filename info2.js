var xpos = 50;
var ypos = 0;
var fillSatI = 255;
var stroSatI = 0;

var xinfo = 0;
var yinfo = 0;
var xinfo2 = 0;
var yinfo2 = 0;
var zomrel = 0.8;

var octavespect = [];
var spectrumshow = 0;




function information() {
  // textFont("Helvetica");
  if (stroSatI > 150) {
    stroSatI ++;
  } else {
    stroSatI = 150;
  }

  if (windowHeight > 680) {
    ypos = bottom-550;
  } else {
    ypos = bottom-465;
  }

  if (loadcomp < numShapes) {
    bossfader = 255;
  } else {
    if (bossfader <= shad) {
      bossfader = shad
    } else {
      bossfader -= 0.1
    }
  }

  // controls
  fill(0);
  rectMode(CENTER);
  stroke(200, 100, 0, stroSatI);

  // mouse

  //spacebar
  if (playing == true) {
    fill(70, 30, 0, 255);
  } else {
    fill (0)
  }
  rect(windowWidth/2-115+xpos, bottom-40, 270, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  textSize(14);
  text("spacebar", windowWidth/2-115+xpos, bottom-35);
  noFill();
  stroke(200, 100, 0, stroSatI);
  // arrows
  if (keyIsDown(LEFT_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+200+xpos, bottom-40, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("L", windowWidth/2+188+xpos, bottom-25);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(DOWN_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+250+xpos, bottom-40, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("Down", windowWidth/2+250+xpos, bottom-25);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(RIGHT_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+300+xpos, bottom-40, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("R", windowWidth/2+288+xpos, bottom-25);
  noFill();
  stroke(200, 100, 0, 150);

  if (keyIsDown(UP_ARROW)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2+250+xpos, bottom-90, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("Up", windowWidth/2+250+xpos, bottom-75);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // numbers
  for (var i = 0; i < shapes.length; i++) {
    if (selection-1 == i) {
      fill(70, 30, 0, 255);
    } else {
      fill(0);
    }
    rect(windowWidth/2-350+(i*50)+xpos, bottom-235, 40, 40, 5);
    fill(200, 100, 0, 200);
    noStroke();
    if (i < shapes.length-1) {
      text((i+1), windowWidth/2-360+(i*50)+xpos, bottom-220);
    } else {
      text(0, windowWidth/2-360+(i*50)+xpos, bottom-220);
    }
    noFill();
    stroke(200, 100, 0, stroSatI);
  }
  // ctrl and shift (size)
  if (keyIsDown(SHIFT)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2-330+xpos, bottom-90, 80, 40, 5);
  rect(windowWidth/2+100+xpos, bottom-90, 80, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("Shift", windowWidth/2-353+xpos, bottom-75);
  text("Shift", windowWidth/2+77+xpos, bottom-75);
  noFill();
  stroke(200, 100, 0, stroSatI);

  if (keyIsDown(CONTROL)) {
    fill(70, 30, 0, 255);
  } else {
    fill(0);
  }
  rect(windowWidth/2-350+xpos, bottom-40, 40, 40, 5);
  rect(windowWidth/2+120+xpos, bottom-40, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("Ctrl", windowWidth/2-357+xpos, bottom-25);
  text("Ctrl", windowWidth/2+113+xpos, bottom-25);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // solo
  fill(0);
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].solo == true) {
        fill(70, 30, 0, 255);
      } else {
        fill(0);
      }
    }
  }
  rect(windowWidth/2-280+xpos, bottom-140, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("S", windowWidth/2-290+xpos, bottom-125);
  fill(0);
  stroke(200, 100, 0, stroSatI);

  // mute
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].muted == true) {
        fill(70, 30, 0, 255);
      } else {
        fill(0);
      }
    }
  }
  rect(windowWidth/2+xpos, bottom-90, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("M", windowWidth/2-10+xpos, bottom-75);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // eq
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].eq == true) {
        fill(70, 30, 0, 255);
      } else {
        fill(0);
      }
    }
  }
  rect(windowWidth/2-240+xpos, bottom-190, 40, 40, 5);
  fill(200, 100, 0, 200);
  noStroke();
  text("E", windowWidth/2-250+xpos, bottom-175);
  noFill();
  stroke(200, 100, 0, stroSatI);

  // mute & solo (letters)
  // noFill();
  // for (var i = 0; i < shapes.length; i++) {
  //   if (shapes[i].solo == false) {
  //     if (shapes[i].muted == true) {
  //       textSize(8);
  //       stroke(100, 50, 0, 255);
  //       textAlign(CENTER);
  //       text('M', windowWidth/2-350+(i*50)+xpos, windowHeight/2-95+ypos)
  //     }
  //   } else {
  //     textSize(10);
  //     textAlign(CENTER);
  //     fill(160, 150, 0);
  //     stroke(160, 150, 0);
  //     text('S', windowWidth/2-350+(i*50)+xpos, windowHeight/2-95+ypos)
  //     fill(70, 30, 0, 255);
  //     stroke(100, 50, 0, 255);
  //   }
  // }

  // selected shape

  // yinfo = 10+(bottom - 20)/3;
  if (windowHeight > 680) {
    yinfo = ((bottom - 20)/3)-10;
    zomrel = 0.45
  } else {
    yinfo = ((bottom - 20)/3)-20;
    zomrel = 0.25
  }
  xinfo = (rside+lside)/2;
  // xinfo = 2*(rside+lside)/3;

  // main box
  fill(0, 200);
  rectMode(CENTER);
  if (windowHeight > 680) {
    rect(xinfo+200, yinfo, 400, 350, 10, 10, 10, 10)
  } else {
    rect(xinfo+200, yinfo, 400, 280, 7, 7, 7, 7)
  }

  // EQ box
  fill(0, 200);
  rectMode(CENTER);
  if (windowHeight > 680) {
    rect(xinfo-253, yinfo, 200, 280, 10, 10, 10, 10)
  } else {
    rect(xinfo-253, yinfo, 200, 280, 7, 7, 7, 7)
  }

  for (var i = 0; i < shapes.length; i++) {
    fill(0);
    ellipse(xinfo-253-100, map(shapes[i].y, windowHeight-20, 20, yinfo+130, yinfo-130), 15, 15);
  }

  if (selection != 0 && loadcomp == numShapes) {
    fill(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
    noStroke();
    ellipse(xinfo-253-100, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+130, yinfo-130), 15, 15);
    text(int(shapes[selection-1].freq)+' Hz', xinfo-253-140, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+130, yinfo-130)+5);
    fill(0);
    text(int(shapes[selection-1].selection+1), xinfo-253-101, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+130, yinfo-130)+4);
  }



  // fft analyse
  // fft.analyze();

  // eq bars
  rectMode(CORNER);
  noStroke();
  for (var i = 0; i < numShapes; i++) {
    octavespect[i] = ffts[i].logAverages(ffts[i].getOctaveBands());
  }
  if (selection != 0 && loadcomp == numShapes) {
    for (var j = 0; j < numShapes; j++) {
      fill(20, 20, 20);
      for (var i = 0; i < octavespect[j].length; i++){
        var y = map(i, 0, octavespect[j].length, yinfo+130, yinfo-150);
        var w = -85 + map(octavespect[j][i], 0, 255, 85, 5);
        rect(xinfo-253, y, w, 3);
      }
      for (var i = 0; i < octavespect[j].length; i++){
        var y = map(i, 0, octavespect[j].length, yinfo+130, yinfo-150);
        var w = 85 + map(octavespect[j][i], 0, 255, -85, 5);
        rect(xinfo-253, y, w, 3);
      }
    }
    fill(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
    for (var i = 0; i < octavespect[selection-1].length; i++){
      var y = map(i, 0, octavespect[selection-1].length, yinfo+130, yinfo-150);
      var w = -85 + map(octavespect[selection-1][i], 0, 255, 85, 5);
      rect(xinfo-253, y, w, 3);
    }
    for (var i = 0; i < octavespect[selection-1].length; i++){
      var y = map(i, 0, octavespect[selection-1].length, yinfo+130, yinfo-150);
      var w = 85 + map(octavespect[selection-1][i], 0, 255, -85, 5);
      rect(xinfo-253, y, w, 3);
    }
  } else {
    for (var j = 0; j < numShapes; j++) {
      fill(150, 60, 0);
      for (var i = 0; i < octavespect[j].length; i++){
        var y = map(i, 0, octavespect[j].length, yinfo+130, yinfo-150);
        var w = -85 + map(octavespect[j][i], 0, 255, 85, 5);
        rect(xinfo-253, y, w, 3);
      }
      for (var i = 0; i < octavespect[j].length; i++){
        var y = map(i, 0, octavespect[j].length, yinfo+130, yinfo-150);
        var w = 85 + map(octavespect[j][i], 0, 255, -85, 5);
        rect(xinfo-253, y, w, 3);
      }
    }
  }


  rectMode(CENTER);
  stroke(200, 100, 0, stroSatI);
  // channel volume
  fill(0, 200);
  if (windowHeight > 680) {
    rect(xinfo-220+200, yinfo, 15, 350, 5, 5, 5, 5);
    rect(xinfo+220+200, yinfo, 15, 350, 5, 5, 5, 5);
  } else {
    rect(xinfo-220+200, yinfo, 15, 280, 5, 5, 5, 5);
    rect(xinfo+220+200, yinfo, 15, 280, 5, 5, 5, 5);
  }

  rectMode(CORNERS);
  fill(200, 100, 0);

  if (selection != 0 && loadcomp == numShapes) {
    if (windowHeight > 680) {
      if (shapes[selection-1].pan < 0) {
        rect(xinfo-223+200, yinfo+170, xinfo-217+200, yinfo+170-shapes[selection-1].amp*(1+abs(shapes[selection-1].pan))*zomrel);
        rect(xinfo+223+200, yinfo+170, xinfo+217+200, yinfo+170-shapes[selection-1].amp*(1-abs(shapes[selection-1].pan))*zomrel);
      } else {
        rect(xinfo-223+200, yinfo+170, xinfo-217+200, yinfo+170-shapes[selection-1].amp*(1-abs(shapes[selection-1].pan))*zomrel);
        rect(xinfo+223+200, yinfo+170, xinfo+217+200, yinfo+170-shapes[selection-1].amp*(1+abs(shapes[selection-1].pan))*zomrel);
      }
    } else {
      if (shapes[selection-1].pan < 0) {
        rect(xinfo-223+200, yinfo+135, xinfo-217+200, yinfo+135-shapes[selection-1].amp*(1+abs(shapes[selection-1].pan))*zomrel);
        rect(xinfo+223+200, yinfo+135, xinfo+217+200, yinfo+135-shapes[selection-1].amp*(1-abs(shapes[selection-1].pan))*zomrel);
      } else {
          rect(xinfo-223+200, yinfo+135, xinfo-217+200, yinfo+135-shapes[selection-1].amp*(1-abs(shapes[selection-1].pan))*zomrel);
          rect(xinfo+223+200, yinfo+135, xinfo+217+200, yinfo+135-shapes[selection-1].amp*(1+abs(shapes[selection-1].pan))*zomrel);
      }
    }
  }

  rectMode(CENTER);




  // visualisation
  if (selection != 0) {
    stroke(shapes[selection-1].redval, shapes[selection-1].grenval, shapes[selection-1].blueval);

    // background
    fill(0);
    beginShape();
    for (var i = 0; i < PI*4; i += PI/(shapes[selection-1].nodes/2)) {
      xinfo2 = xinfo+200 + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*sin(i+shapes[selection-1].rotation)/2;
      yinfo2 = yinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*cos(i+shapes[selection-1].rotation)/2;
      shapes[selection-1].sat = 50+shapes[selection-1].amp/2;
      curveVertex (xinfo2, yinfo2);
    }
    endShape();

    // colour
    fill(shapes[selection-1].redval, shapes[selection-1].grenval, shapes[selection-1].blueval, shapes[selection-1].sat);
    beginShape();
    for (var i = 0; i < PI*4; i += PI/(shapes[selection-1].nodes/2)) {
      xinfo2 = xinfo+200 + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*sin(i+shapes[selection-1].rotation)/2;
      yinfo2 = yinfo + (shapes[selection-1].amp/5+shapes[selection-1].size*zomrel)*cos(i+shapes[selection-1].rotation)/2;
      shapes[selection-1].sat = 50+shapes[selection-1].amp/2;
      curveVertex (xinfo2, yinfo2);
    }
    endShape();
  }




  // left panel information
  noStroke();
  fill(255);
  for (var i = 0; i < track.length; i++) {
    text((track[i].currentTime()).toFixed(4), lside - 100, 100+i*30);
  }
  var promlat = (track[0].currentTime())-(track[track.length-1].currentTime());

  text(abs(promlat).toFixed(4), lside-100, 600);
  text('navigator: '+nav, lside-100, 620);




  noFill();
  rectMode(CORNER);
}
