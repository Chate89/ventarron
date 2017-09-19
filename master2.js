function master() {
  // when finish
  if (track[0].currentTime() > endTime) {
    for (var i = 0; i < track.length; i++) {
      track[i].pause();
      // track[i].pauseTime = 0;
    }
    playing = false;
    bossfader = 255;
    for (var i = 0; i < track.length; i++) {
      track[i].pauseTime = 0;
    }
    resetNodesTrigger();
  }
  rectMode(CORNERS);
  fill(mainCol, 150);
  ellipse(lside+15, bottom+25, 16)
  fill(70, 30, 0, 255);
  noStroke();
  if (loadcomp == shapes.length) {
    if (track[0]._playing == false) {
      triangle(lside+13, bottom+21, lside+19, bottom+25, lside+13, bottom+29);
    } else {
      rectMode(CORNER);
      rect(lside+12, bottom+21, 2, 7);
      rect(lside+16, bottom+21, 2, 7);
      rectMode(CORNERS);
    }
  }
  fill(mainCol, 150);
  stroke(200, 100, 0, 50);
  rect(lside+30, bottom + 20, lside+38+(rside-48-lside), bottom + 30, 3, 3, 3, 3);
  fill(70, 30, 0, 255);
  rect(lside+30, bottom + 20, lside+38+(rside-48-lside)*(track[0].currentTime()/endTime), bottom + 30, 3, 3, 3, 3);
  // text(int(track[0].currentTime()), lside+11+(rside-10)*(track[0].currentTime()/endTime), windowHeight-20)
  rectMode(CORNER);

  // over info button
  if (mouseX >= lside+30-15 && mouseX <= lside+30+15 &&
  mouseY >= topy+30-15 && mouseY <= topy+30+15) {
      overI = true;
    } else {
      overI = false;
  }

  // over leng button
  if (mouseX >= lside+45-30 && mouseX <= lside+45+30 &&
  mouseY >= bottom-30-15 && mouseY <= bottom-30+15) {
      overL = true;
    } else {
      overL = false;
  }

  // waveform display

  // noStroke();
  // imageMode(CORNERS);
  // if (playing == false) {
  //   tint(150);
  // } else {
  //   if (selection != 0) {
  //     if (shapes[selection-1].muted == false) {
  //       tint(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
  //     } else {
  //       tint(150);
  //     }
  //   }
  // }
  // if (selection != 0) {
  //   image(waveimg[selection-1], lside+1, topy-waveimg[0].height, rside-1, topy-1)
  //   rectMode(CORNERS);
  //   fill(0, 200);
  //   rect(lside+1+int((rside-lside)*(track[0].currentTime()/endTime)), topy-waveimg[0].height, rside-1, topy-1);
  //   rectMode(CORNER);
  // }
  //
  // // time
  // if (playing == false) {
  //   fill(150);
  // } else {
  //   if (selection != 0) {
  //     if (shapes[selection-1].muted == false) {
  //       fill(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
  //     } else {
  //       fill(150);
  //     }
  //   }
  // }
  //
  // if (playing == false) {
  //   stroke(150);
  // } else {
  //   if (selection != 0) {
  //     if (shapes[selection-1].muted == false) {
  //       stroke(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
  //     } else {
  //       stroke(150);
  //     }
  //   }
  // }
  // line(lside+1+int((rside-lside)*(track[0].currentTime()/endTime)), topy-45,
  // lside+1+int((rside-lside)*(track[0].currentTime()/endTime)), topy-11);
  //
  // noStroke();
  // textSize(15);
  // textAlign(LEFT)
  // if (lside+1+int((rside-lside)*(track[0].currentTime()/endTime)) < rside - 40) {
  //   text((track[0].currentTime()).toFixed(1), lside+3+int((rside-lside)*(track[0].currentTime()/endTime)), topy - 10)
  // } else {
  //   text((track[0].currentTime()).toFixed(1), rside - 40, topy - 10)
  // }


}
