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
  fill(colours[colsel].maincol1, colours[colsel].maincol2, colours[colsel].maincol3, 150);
  stroke(colours[colsel].red1, colours[colsel].green1, colours[colsel].blue1, 150);
  rect(lside+30, bottom + 20, lside+38+(rside-48-lside), bottom + 30, 3, 3, 3, 3);
  noStroke();
  fill(colours[colsel].red2, colours[colsel].green2, colours[colsel].blue2, 150);
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
}
