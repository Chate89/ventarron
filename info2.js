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
var modules = [
  [
      "Vocal",
      "Electric Guitar 1",
      "Electric Guitar 2",
      "Electric Guitar 3",
      "Electric Guitar 4",
      "Keyboard",
      "FX and Sequencer",
      "Pad",
      "Acoustic Guitar",
      "Drumm and Bass"
  ],
  [
      "Voz",
      "Guitarra Eléctrica 1",
      "Guitarra Eléctrica 2",
      "Guitarra Eléctrica 3",
      "Guitarra Eléctrica 4",
      "Teclado",
      "FX y Sequencer",
      "Pad",
      "Guitarra Acústica",
      "Bajo y Batería"
  ]
]
var infoData = [
  {
    "screench": "Choose the screen mode",
    "loading": "Loading Tracks",
    "windowed": "windowed",
    "fullscreen": "fullscreen",
    "spacebar": "The spacebar will toogle between play and pause: if the music is playing will pause it, if the music is paused will play it.",
    "spacebarBar": "spacebar",
    "spacebarBarPress": "Press the  Spacebar",
    "infobuttominfo": "i    key for info",
    "shiftCtrl": "Shift key will increase the selected instrument volume, Ctrl key will decrease the selected instrument volume. The volume also can be managed scrolling with the mousewheel or the touchpad.",
    "arrowsL": "Left Arrow key will pan the selected instrument to the left: the volume will decrease on the left speaker (right channel or R) and increase on the right speaker (left channel or L).",
    "arrowsD": "Down Arrow key will decrease the selected instrument filter (eq) frequency. This value will afect the sound only if the filter (eq) is 'active' on the selected instrument.",
    "arrowsR": "Right Arrow key will pan the selected instrument to the right: the volume will decrease on the left speaker (left channel or L) and increase on the right speaker (right channel or R).",
    "arrowsU": "Up Arrow key will increase the selected instrument filter (eq) frequency. This value will afect the sound only if the filter (eq) is 'active' on the selected instrument.",
    "mute": "the 'M' key will mute or unmute the selected instrument. Muted instruments has no volume but still playing.",
    "solo": "the 'S' key will solo or unsolo the selected instrument. When an instrument is 'solo', the other instrument are still be playing but 'muted'.",
    "eq": "the 'E' key will connect or disconnect the selected instrument to a BandPass filter. The BandPass frequency can be modify with the arrow keys (up and down) or with the mouse. A band-pass filter (also spelled bandpass) is a device that passes frequencies within a certain range and rejects (attenuates) frequencies outside that range.",
    "numbers": "Numbers represent the instruments or layers of the music. You can select an instrument with the number keys on the keyboard or with the mouse",
    "info": "The 'I' key will toogle the 'info' window on and off. You can press the key on the keyboard or the the button on the top left corner.",
    "fullscreenKey": "The 'F' key will toogle the screen mode between windowed or fullscreen",
    "lenguage": "This button will toogle the lenguage between ENGLISH and SPANISH. Este Boton cambiará el idioma entre ESPAÑOL e INGLES.",
    "reset": "The 'R' key will set the mix in the original state.",
    "contact": "Contact: gastonchatelet@gmail.com",
    "song": "Song: ",
    "songName": "Ventarrón",
    "artist": "Artist: ",
    "artistName": "Gaston Chatelet",
    "album": "Album: ",
    "albumName": "Viento Soy",
  },
  {
    "screench": "Seleccione el modo de pantalla",
    "windowed": "ventana",
    "fullscreen": "pantalla completa",
    "loading": "Cargando Pistas",
    "spacebar": "La barra espaciadora iniciará la reproducción en caso de que la música este pausada, y pausara la producción en caso de que se esté reproduciendo.",
    "spacebarBar": "barra espaciadora",
    "spacebarBarPress": "Presiona la  Barra Espaciadora",
    "infobuttominfo": "tecla    i    para informacion",
    "shiftCtrl": "La tecla Shift incrementará el volumen del instrumento seleccionado, la tecla Ctrl lo disminuirá. El control de volumen también puede manejarse con la rueda del mouse (mouse wheel) o desde el panel táctil (touchpad).",
    "arrowsL": "La tecla de navegación 'L' paneará el instrumento seleccionado hacia la izquierda: el volumen disminuirá en el parlante derecho (canal derecho o R) y se incrementará en el parlante izquierdo (canal izquierdo o L).",
    "arrowsD": "La tecla de navegación 'Down' disminuirá la frecuencia del filtro (eq) del instrumento seleccionado. Este valor afectará al sonido únicamente si el filtro (eq) esta 'activo' en el instrumento seleccionado.",
    "arrowsR": "La tecla de navegación 'R' paneará el instrumento seleccionado hacia la derecha: el volumen disminuirá en el parlante izquierdo (canal izquierdo o L) y se incrementará en el parlante derecho (canal derecho o R).",
    "arrowsU": "La tecla de navegación 'Up' incrementará la frecuencia del filtro (eq) del instrumento seleccionado. Este valor afectará al sonido únicamente si el filtro (eq) esta 'activo' en el instrumento seleccionado.",
    "mute": "La tecla 'M' muteará o desmuteará el instrumento seleccionado. Los instrumentos muteados no tienen volumen, pero siguen reproduciéndose.",
    "solo": "La tecla 'S' solerá (dejará sonando de forma única) o des-soleará el instrumento seleccionado. Cuando un instrumento esta 'soleado', los demás instrumentos siguen reproduciéndose, pero 'muteados'.",
    "eq": "La tecla 'E' conectará o desconectará el instrumento seleccionado a un filtro 'paso banda' (BandPass). La frecuencia del filtro puede ser modificada con las teclas de navegación ('up' y 'down') o con el mouse. Un filtro paso banda es un tipo de filtro electrónico que deja pasar un determinado rango de frecuencias de una señal y atenúa el paso del resto.",
    "numbers": "Los números representan los instrumentos o capas que conforman la música. Puedes seleccionar un instrumento con las teclas numéricas del teclado o con el mouse",
    "info": "La tecla 'I' abrirá o cerrará la ventana de información. Podes presionar la tecla 'i' en el teclado o el botón que se encuentra en la esquina superior izquierda con el mouse.",
    "fullscreenKey": "La tecla 'F' cambiara el modo de pantalla entre 'pantalla completa' o 'ventana'",
    "lenguage": "Este botón cambiará el idioma entre ESPAÑOL e INGLES. This button will toogle the lenguage between ENGLISH and SPANISH.",
    "reset": "La tecla 'R' seteará la mezcla en su estado original.",
    "contact": "Contacto: gastonchatelet@gmail.com",
    "song": "Canción: ",
    "songName": "Ventarrón",
    "artist": "Artista: ",
    "artistName": "Gaston Chatelet",
    "album": "Album: ",
    "albumName": "Viento Soy"
  }
]

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
    bossfader = 100;
  } else {
    if (bossfader <= shad) {
      bossfader = shad
    } else {
      bossfader -= 0.1
    }
  }

  // controls
  fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  rectMode(CENTER);
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  // mouse

  //spacebar
  if (playing == true) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2-115+xpos, bottom-40, 270, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  textSize(14);
  text(infoData[lenguage].spacebarBar, windowWidth/2-115+xpos, bottom-35);
  noFill();

  // arrows
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  if (keyIsDown(LEFT_ARROW)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2+200+xpos, bottom-40, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("L", windowWidth/2+188+xpos, bottom-30);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);


  if (keyIsDown(DOWN_ARROW)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2+250+xpos, bottom-40, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("Down", windowWidth/2+250+xpos, bottom-30);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);


  if (keyIsDown(RIGHT_ARROW)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2+300+xpos, bottom-40, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("R", windowWidth/2+288+xpos, bottom-30);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  if (keyIsDown(UP_ARROW)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2+250+xpos, bottom-90, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("Up", windowWidth/2+250+xpos, bottom-80);
  noFill();

  // numbers
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].muted) {
      if (selection-1 == i) {
        fill(80, 80, 80);
        stroke(120, 120, 120);
      } else {
        fill(30, 30, 30);
        stroke(80, 80, 80);
      }
    } else {
      stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
      if (selection-1 == i) {
        fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
      } else {
        fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
      }
    }
    rect(windowWidth/2-350+(i*50)+xpos, bottom-235, 40, 40, 5);
    noStroke();

    if (shapes[i].muted) {
      if (selection-1 == i) {
        fill(150, 150, 150);
      } else {
        fill(80, 80, 80);
      }
    } else {
      fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
    }

    if (i < shapes.length-1) {
      text((i+1), windowWidth/2-360+(i*50)+xpos, bottom-225);
    } else {
      text(0, windowWidth/2-360+(i*50)+xpos, bottom-225);
    }
    noFill();
    stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  }

  // number volume
  for (var i = 0; i < shapes.length; i++) {
    stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
    fill(colours[colsel].inforoff/3, colours[colsel].infogoff/3, colours[colsel].infoboff/3);
    rect(windowWidth/2-350+(i*50)+xpos, bottom-260, 40, 10, 5);
    fill(shapes[i].redvalon, shapes[i].grenvalon, shapes[i].bluevalon)
    noStroke();
    rect(windowWidth/2-350+(i*50)+xpos, bottom-259.5, shapes[i].amp/20, 8);
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }

  // ctrl and shift (size)
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  if (keyIsDown(SHIFT)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2-330+xpos, bottom-90, 80, 40, 5);
  rect(windowWidth/2+100+xpos, bottom-90, 80, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("Shift", windowWidth/2-353+xpos, bottom-80);
  text("Shift", windowWidth/2+77+xpos, bottom-80);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  if (keyIsDown(CONTROL)) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  rect(windowWidth/2-350+xpos, bottom-40, 40, 40, 5);
  rect(windowWidth/2+120+xpos, bottom-40, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("Ctrl", windowWidth/2-357+xpos, bottom-30);
  text("Ctrl", windowWidth/2+113+xpos, bottom-30);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  // solo
  fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].solo == true) {
        fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
      } else {
        fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
      }
    }
  }
  rect(windowWidth/2-270+xpos, bottom-140, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("S", windowWidth/2-280+xpos, bottom-130);
  noStroke();
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].solo) {
      fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
      stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
    } else {
      noFill();
      noStroke()
    }
  text('s', windowWidth/2-360+(i*50)+xpos, bottom-245);
  noStroke();
  }

  // mute
  fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].muted == true) {
        fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
      } else {
        fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
      }
    }
  }
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  rect(windowWidth/2+xpos, bottom-90, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("M", windowWidth/2-10+xpos, bottom-80);
  noFill();
  noStroke();
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].muted) {
      if (selection-1 == i) {
        fill(150, 150, 150);
      } else {
        fill(80, 80, 80);
      }
    } else {
      noFill();
    }
  text('m', windowWidth/2-340+(i*50)+xpos, bottom-245);
  }

  // info
  fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  rect(windowWidth/2+20+xpos, bottom-190, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("I", windowWidth/2+30+xpos, bottom-180);

  // eq
  fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  if (selection != 0) {
    for (var i = 0; i < shapes.length; i++) {
      if (shapes[selection-1].eq == true) {
        fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
      } else {
        fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
      }
    }
  }
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  rect(windowWidth/2-240+xpos, bottom-190, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("E", windowWidth/2-250+xpos, bottom-180);
  noFill();
  for (var i = 0; i < shapes.length; i++) {
    if (shapes[i].eq) {
      if (shapes[i].muted) {
        if (selection-1 == i) {
          fill(150, 150, 150);
        } else {
          fill(80, 80, 80);
        }
      } else {
        fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
      }
      text('Eq', windowWidth/2-340+(i*50)+xpos, bottom-225);
    }
  }
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  // fullscreen
  noFill();
  if (fullscreen()) {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  rect(windowWidth/2-180+xpos, bottom-140, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("F", windowWidth/2-190+xpos, bottom-130);
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);

  // reset metadata
  noFill();
  if (keyIsPressed == true && key == 'r') {
    fill(colours[colsel].inforon, colours[colsel].infogon, colours[colsel].infobon);
  } else {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  }
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  rect(windowWidth/2-190+xpos, bottom-190, 40, 40, 5);
  fill(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  noStroke();
  text("R", windowWidth/2-200+xpos, bottom-180);
  noFill();
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);




  // selected shape
  if (windowHeight > 680) {
    yinfo = ((bottom - 20)/3)-10;
    zomrel = 0.45
  } else {
    yinfo = ((bottom - 20)/3)-20;
    zomrel = 0.25
  }
  xinfo = (rside+lside)/2;


  // main box
  fill(colours[colsel].inforoff/3, colours[colsel].inforoff/3, colours[colsel].inforoff/3, 150);
  rectMode(CENTER);
  if (windowHeight > 680) {
    rect(xinfo+200, yinfo, 400, 350, 10, 10, 10, 10)
  } else {
    rect(xinfo+200, yinfo, 400, 280, 7, 7, 7, 7)
  }

  // EQ box
  fill(colours[colsel].inforoff/3, colours[colsel].inforoff/3, colours[colsel].inforoff/3);
  rectMode(CENTER);
  if (windowHeight > 680) {
    rect(xinfo-253, yinfo, 200, 280, 10, 10, 10, 10)
  } else {
    rect(xinfo-253, yinfo, 200, 280, 7, 7, 7, 7)
  }

  for (var i = 0; i < shapes.length; i++) {
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
    ellipse(xinfo-253-100, map(shapes[i].y, windowHeight-20, 20, yinfo+130, yinfo-130), 15, 15);
  }

  if (selection != 0 && loadcomp == numShapes) {
    fill(0, colours[colsel].eqbars*20);
    rect(xinfo-253-140-5, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+125, yinfo-135)+5, 60, 30, 3, 3, 3, 3);
    fill(shapes[selection-1].redvalon, shapes[selection-1].grenvalon, shapes[selection-1].bluevalon);
    noStroke();
    ellipse(xinfo-253-100, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+130, yinfo-130), 15, 15);
    text(int(shapes[selection-1].freq)+' Hz', xinfo-253-140-5, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+125, yinfo-135)+5);
    fill(0);
    text(int(shapes[selection-1].selection+1), xinfo-253-101, map(shapes[selection-1].y, windowHeight-20, 20, yinfo+125, yinfo-135)+4);
  }

  // eq info change
  if (mouseIsPressed && selection != 0) {
    if (mouseX >= xinfo-253-140-5-30 && mouseX <= xinfo-253-140-5+30 &&
      mouseY >= yinfo-145 && mouseY <= yinfo+145) {
      shapes[selection-1].y = map(mouseY, yinfo-140, yinfo+140, topy, bottom)+20;
    }
  }

  // eq bars
  rectMode(CORNER);
  noStroke();
  for (var i = 0; i < numShapes; i++) {
    octavespect[i] = ffts[i].logAverages(ffts[i].getOctaveBands());
  }
  if (selection != 0 && loadcomp == numShapes) {
    for (var j = 0; j < numShapes; j++) {
      fill(colours[colsel].eqbars);
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
  stroke(colours[colsel].inforstr, colours[colsel].infogstr, colours[colsel].infobstr);
  // channel volume
  fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
  if (windowHeight > 680) {
    rect(xinfo-220+200, yinfo, 15, 350, 5, 5, 5, 5);
    rect(xinfo+220+200, yinfo, 15, 350, 5, 5, 5, 5);
  } else {
    rect(xinfo-220+200, yinfo, 15, 280, 5, 5, 5, 5);
    rect(xinfo+220+200, yinfo, 15, 280, 5, 5, 5, 5);
  }

  rectMode(CORNERS);
  noStroke()
  fill(colours[colsel].inforon*1.5, colours[colsel].infogon*1.5, colours[colsel].infobon*1.5);

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
    fill(colours[colsel].inforoff, colours[colsel].infogoff, colours[colsel].infoboff);
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


  // right panel information (mouseover)
  if (mouseX >= windowWidth/2-115+xpos-140 &&
      mouseX <= windowWidth/2-115+xpos+140 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    //mouseoverSpace
    rpi = infoData[lenguage].spacebar
  } else if (mouseX >= windowWidth/2+200+xpos-20 &&
      mouseX <= windowWidth/2+200+xpos+20 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    //mouseoverL
    rpi = infoData[lenguage].arrowsL
  } else if (mouseX >= windowWidth/2+250+xpos-20 &&
      mouseX <= windowWidth/2+250+xpos+20 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    //mouseoverD
    rpi = infoData[lenguage].arrowsD
  } else if (mouseX >= windowWidth/2+300+xpos-20 &&
      mouseX <= windowWidth/2+300+xpos+20 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    //mouseoverR
    rpi = infoData[lenguage].arrowsR
  } else if (mouseX >= windowWidth/2+250+xpos-20 &&
      mouseX <= windowWidth/2+250+xpos+20 &&
      mouseY >= bottom-90-20 &&
      mouseY <= bottom-90+20) {
    //mouseoverU
    rpi = infoData[lenguage].arrowsU
  } else if (mouseX >= windowWidth/2-350+xpos-20 &&
      mouseX <= windowWidth/2-350+((numShapes-1)*50)+xpos+20 &&
      mouseY >= bottom-235-20 &&
      mouseY <= bottom-235+20) {
    //mouseoverNums
    rpi = infoData[lenguage].numbers
  } else if (mouseX >= windowWidth/2-330+xpos-40 &&
      mouseX <= windowWidth/2-330+xpos+40 &&
      mouseY >= bottom-90-20 &&
      mouseY <= bottom-90+20) {
    rpi = infoData[lenguage].shiftCtrl
  } else if (mouseX >= windowWidth/2+100+xpos-40 &&
      mouseX <= windowWidth/2+100+xpos+40 &&
      mouseY >= bottom-90-20 &&
      mouseY <= bottom-90+20) {
    rpi = infoData[lenguage].shiftCtrl
  } else if (mouseX >= windowWidth/2-350+xpos-20 &&
      mouseX <= windowWidth/2-350+xpos+20 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    rpi = infoData[lenguage].shiftCtrl
  } else if (mouseX >= windowWidth/2+120+xpos-20 &&
      mouseX <= windowWidth/2+120+xpos+20 &&
      mouseY >= bottom-40-20 &&
      mouseY <= bottom-40+20) {
    rpi = infoData[lenguage].shiftCtrl
  } else if (mouseX >= windowWidth/2-270+xpos-20 &&
      mouseX <= windowWidth/2-270+xpos+20 &&
      mouseY >= bottom-140-20 &&
      mouseY <= bottom-140+20) {
    // overSolo
    rpi = infoData[lenguage].solo
  } else if (mouseX >= windowWidth/2+xpos-20 &&
      mouseX <= windowWidth/2+xpos+20 &&
      mouseY >= bottom-90-20 &&
      mouseY <= bottom-90+20) {
    // overMute
    rpi = infoData[lenguage].mute
  } else if (mouseX >= windowWidth/2-190+xpos-20 &&
      mouseX <= windowWidth/2-190+xpos+20 &&
      mouseY >= bottom-190-20 &&
      mouseY <= bottom-190+20) {
    // overReset
    rpi = infoData[lenguage].reset
  } else if (mouseX >= windowWidth/2-240+xpos-20 &&
      mouseX <= windowWidth/2-240+xpos+20 &&
      mouseY >= bottom-190-20 &&
      mouseY <= bottom-190+20) {
    // over Eq
    rpi = infoData[lenguage].eq
  } else if (mouseX >= windowWidth/2+20+xpos-20 &&
      mouseX <= windowWidth/2+20+xpos+20 &&
      mouseY >= bottom-190-20 &&
      mouseY <= bottom-190+20) {
    // overInf
    rpi = infoData[lenguage].info
  } else if (overI) {
    rpi = infoData[lenguage].info
  } else if (mouseX >= windowWidth/2-180+xpos-20 &&
      mouseX <= windowWidth/2-180+xpos+20 &&
      mouseY >= bottom-140-20 &&
      mouseY <= bottom-140+20) {
    // overInf
    rpi = infoData[lenguage].fullscreenKey
  } else if (overL) {
    rpi = infoData[lenguage].lenguage
  } else {
    rpi = ''
  }

  for (var i = 0; i < track.length; i++) {
    if (mouseX >= windowWidth/2-350+(i*50)+xpos-20 &&
        mouseX <= windowWidth/2-350+(i*50)+xpos+20 &&
        mouseY >= bottom-235-20 &&
        mouseY <= bottom-235+20) {
      fill(0, 100);
      noStroke();
      rect(mouseX+10, mouseY+30, 130, 20, 5, 5, 5, 5)
      fill(200, 100, 0);
      text(modules[lenguage][i], mouseX+10, mouseY+30);
    }
  }

  // left panel information
  noStroke();
  fill(255);
  for (var i = 0; i < track.length; i++) {
    text((track[i].currentTime()).toFixed(4), lside - 100, 100+i*30);
  }
  var promlat = (track[0].currentTime())-(track[track.length-1].currentTime());

  text("latencia: "+abs(promlat).toFixed(4), lside-100, 500);
  text('navigator: '+nav, lside-100, 520);




  noFill();
  rectMode(CORNER);
}
