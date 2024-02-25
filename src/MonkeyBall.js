// ColoredPoint.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  attribute vec4 a_Color;
  attribute vec4 a_Normal;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;
  void main() {
    
    vec4 position =  u_ModelMatrix * a_Position;
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * position;
    v_Position = vec3(position[0], position[1], position[2]);
    v_Color = a_Color;
    v_Normal = vec3(u_NormalMatrix * a_Normal);
    
    float x = length(u_ModelMatrix[0])/2.0;
    float z = length(u_ModelMatrix[2])/2.0;
    
    v_UV = vec2(a_UV[0]*x, a_UV[1]*z);
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec3 v_Position;
  uniform vec3 u_ballPos;
  varying vec2 v_UV;
  varying vec4 v_Color;
  uniform sampler2D u_Sampler0;
  varying vec3 v_Normal;
  uniform int u_whichTexture;
  uniform vec3 u_LightPos;
  uniform vec3 u_CameraPos;
  
  void main() {
    vec3 N = normalize(v_Normal);
    vec3 C = normalize(u_CameraPos-v_Position);

    vec3 k_d = vec3(v_Color[0], v_Color[1], v_Color[2]);
    vec3 ambient = k_d/2.0;

    vec3 L = normalize(u_LightPos-v_Position);
    vec3 mag = vec3(1.5,1.5,1);
    vec3 R = reflect(-L, N);   
    
    vec3 diffuse = k_d * max(dot(L, N), 0.0) * mag;
    vec3 specular = k_d * pow(max(dot(R, C), 0.0),8.0) * mag;
    
    vec2 dist = vec2(u_ballPos[0]-v_Position[0], u_ballPos[2]-v_Position[2]);
    vec4 final;
    if (length(dist) < .4 && v_Position[1]<u_ballPos[1]-.15) {
      final = vec4(ambient+(diffuse+specular)*length(dist)*length(dist)/.16,1.0);
    } else {
      final = vec4(ambient+diffuse+specular,1.0);
    }
    if (u_whichTexture < 0) {
      gl_FragColor = final;
    } else {
      gl_FragColor = (texture2D(u_Sampler0, v_UV)+19.0*final)/20.0;
    }
    //gl_FragColor = vec4(v_UV,1.0,1.0);
  }`

// Global Variables
let canvas;
let gl;
let a_Position;
let a_UV;
let u_ballPos;
let u_Sampler0;
let a_Color;
let a_Normal;
let u_ModelMatrix;
let u_NormalMatrix;
let u_LightPos;
let u_CameraPos;
let u_ViewMatrix;
let u_ProjectionMatrix;
let u_whichTexture;

function setupWebGL(){
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');

  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preservedDrawingBuffer: true});
  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
  

}
 
function connectVariablesToGLSL(){
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, 'a_UV');
  if (a_UV < 0) {
    console.log('Failed to get the storage location of a_UV');
    return;
  }
  
  // Get the storage location of u_ballPos
  u_ballPos = gl.getUniformLocation(gl.program, 'u_ballPos');
  if (u_ballPos < 0) {
    console.log('Failed to get the storage location of u_ballPos');
    return;
  }

  // Get the storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, 'u_Sampler0');
  if (!u_Sampler0) {
    console.log('Failed to get the storage location of u_Sampler0');
    return;
  }

  // Get the storage location of a_Color
  a_Color = gl.getAttribLocation(gl.program, 'a_Color');
  if (!a_Color) {
    console.log('Failed to get the storage location of a_Color');
    return;
  }
  
  // Get the storage location of a_Normal
  a_Normal = gl.getAttribLocation(gl.program, 'a_Normal');
  if (!a_Normal) {
    console.log('Failed to get the storage location of a_Normal');
    return;
  }
  
  // Get the storage location of u_ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, 'u_ModelMatrix');
  if (!u_ModelMatrix) {
    console.log('Failed to get the storage location of u_ModelMatrix');
    return;
  }

  // Get the storage location of u_NormalMatrix
  u_NormalMatrix = gl.getUniformLocation(gl.program, 'u_NormalMatrix');
  if (!u_NormalMatrix) {
    console.log('Failed to get the storage location of u_NormalMatrix');
    return;
  }

  // Get the storage location of u_whichTexture
  u_whichTexture = gl.getUniformLocation(gl.program, 'u_whichTexture');
  if (!u_whichTexture) {
    console.log('Failed to get the storage location of u_whichTexture');
    return;
  }
  
  // Get the storage location of u_LightPos
  u_LightPos = gl.getUniformLocation(gl.program, 'u_LightPos');
  if (!u_LightPos) {
    console.log('Failed to get the storage location of u_LightPos');
    return;
  } 
  
  // Get the storage location of u_CameraPos
  u_CameraPos = gl.getUniformLocation(gl.program, 'u_CameraPos');
  if (!u_CameraPos) {
    console.log('Failed to get the storage location of u_CameraPos');
    return;
  }
    
  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix');
  if (!u_ViewMatrix) {
    console.log('Failed to get the storage location of u_ViewMatrix');
    return;
  }
  
  // Get the storage location of u_GlobalRotateMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, 'u_ProjectionMatrix');
  if (!u_ProjectionMatrix) {
    console.log('Failed to get the storage location of u_ProjectionMatrix');
    return;
  }


}

function initTextures(file) {
  var image = new Image();
  if (!image) {
    console.log('Failed to create the image object');
    return false;
  }
  // Register the event handler to be called on loading an image
  image.onload = function() { loadTexture(image); }
  
  image.src = file;
}

function loadTexture(image) {
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  
  var texture = gl.createTexture(); // Create a texture object
  if (!texture) {
    console.log('Failed to create the texture object');
    return false;
  }
  
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);  // Flip the image's y axis
  
  var u_Sampler;

  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);
  
  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);
  
  // Set the texture unit 0 to the sampler
  gl.uniform1i(u_Sampler0, 0);
}


// Set up actions for the HTML UI elements
var g_skip = false;
function addActionsForHtmlUI() {
  
  document.getElementById('start').onclick = titleScreen;
  
  document.getElementById('skip').onclick = function() { g_skip=true;};
  
}

var level;
var velocity;
var spin;
var audio;
var background;
var dynamic;
function main() {
  
  // Set up canvas and gl variables
  setupWebGL();
  // Set up GLSL shader programs and connect GLSL variables
  connectVariablesToGLSL();

  // Set up actions for the HTML UI elements
  addActionsForHtmlUI();

  

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  velocity = new Vector3([0,0,0]);
  spin = new Matrix4();
  
  audio = new Audio();
}
function donothing() {
}
function playMusic() {
  let tempAudio = new Audio(level.song);
  if (!(tempAudio.src === audio.src)) {
    audio.pause();
    audio = tempAudio;
    audio.loop = true;
    audio.play();
  }
}

function titleScreen() {
  g_startTime = performance.now();
  
  document.getElementById("start").style.display = "none";
  level = new Basic();
  document.getElementById("nextLevel").style.visibility = "visible";
  playMusic();
  audio.volume = 0;
  initTextures('data/textures/checker.png');
  
  background = document.getElementById("background");
  dynamic = document.getElementById("dynamic");
  background.style.opacity = "0";
  background.style.backgroundSize = "800px 600px";
  background.style.backgroundImage = "url('data/backgrounds/title.jpg')";
  document.getElementById("dup-background").style.backgroundImage = "url('data/backgrounds/alt_title.jpg')";
  document.getElementById("dup-background").style.opacity = "0";
  document.getElementById("dup-background").style.backgroundSize = "800px 600px";
  
  requestAnimationFrame(altTitleScreen);
}

var g_fade = false;
function altTitleScreen() {
  let time = performance.now() - g_startTime ;
  if (time < 2000) {
    audio.volume = time/2000;
    background.style.opacity = time/2000;
  } else if (time % 1000 > 500) {
    document.getElementById("dup-background").style.opacity = "0";
    document.onclick = function() {g_fade = true;}
  } else {
    document.getElementById("dup-background").style.opacity = "1";
    document.onclick = function() {g_fade = true;}
  }
  if (g_fade) { 
    g_startTime = performance.now();
    document.getElementById("dup-background").style.opacity = "0";
    document.onclick = donothing; 
    requestAnimationFrame(fadeTitleScreen); 
  } else {requestAnimationFrame(altTitleScreen); }
}

function fadeTitleScreen() {
  let time = performance.now() - g_startTime ;
  if (time < 1000) {
    background.style.opacity = 1-time/1000;
    requestAnimationFrame(fadeTitleScreen);
  }
  else {
    levelStartSet();
    return;
  }
}



function levelStartSet() {
  velocity = new Vector3([0,0,0]);
  playMusic();
  background.style.backgroundImage = "none";
  background.style.opacity = 0;
  dynamic.style.webkitTextFillColor = "yellow";
  sendTextToHTML("FLOOR " + level.num + "\n~" + level.name + "~", "dynamic");
  if (level.lastLevel) { sendTextToHTML("FINAL STAGE", "finalStage"); }
  g_startTime = performance.now();
  g_readyGo = false;
  requestAnimationFrame(levelStart);
}

function levelStart() {
  let time = performance.now() - g_startTime;
  if (time < 1000) {
    background.style.opacity = time/1000;
  } else if (time < 2000) {
    background.style.opacity = 1;
  } else if (time < 7000) {
    background.style.opacity = 1-(time-2000)/5000;
  } else {
    background.style.opacity = 0;
    readyGoSet();
    return;
  }
  
  
  let d = new Vector3([level.spinRad*Math.cos(time*Math.PI/5000), level.spinHeight, level.spinRad*Math.sin(time*Math.PI/5000)]);
  g_eye = new Vector3(d.add(level.spinCntr).elements) ;
  d.sub(level.spinCntr);
  let cntr = new Vector3(level.spinCntr.elements);
  g_at = cntr.sub(d);
  level.setMatrices(time, spin); 
  renderAllShapes();
  requestAnimationFrame(levelStart);
}



function readyGoSet() {
  background.style.opacity = 0;
  
  g_eye = level.cameraPos;
  velocity = new Vector3([0,0,0]);
  spin = new Matrix4();
  tiltX(0); tiltY(0);
  document.onclick = donothing;
  
  dynamic.style.webkitTextFillColor = "red";
  sendTextToHTML("READY?", "dynamic");
  background.style.opacity = 1;
  g_startTime = performance.now();
  requestAnimationFrame(readyGo);
}

function readyGo() {
  let time = performance.now() - g_startTime;
  if (time < 1000) {
    level.setMatrices(time, spin); 
    renderAllShapes();
    requestAnimationFrame(readyGo);
  } else {
    g_tempSecs = performance.now();
    document.onkeydown = keydown;
    document.onkeyup = keyup;
    sendTextToHTML("GO!", "dynamic");
    requestAnimationFrame(tick);
  }
}



var g_startTime=performance.now();
var g_totalTime = performance.now()-g_startTime;
var g_seconds=performance.now()-g_startTime;
var g_tempSecs=performance.now()-g_startTime;
var g_camX=0;
var g_currCamX=0;
var g_camY=0;
var g_currCamY=0;

function tick() {
  g_totalTime = performance.now() - g_startTime;
  if (g_totalTime > 2000) {
    sendTextToHTML("", "dynamic");
  }
  let time = performance.now()-g_tempSecs ;
  g_tempSecs = performance.now();
  
  physics(time) ;
  
  if (level.lose()) { fallOutSet(); return; }
  
  if (level.win() || g_skip) { victorySet(); return; }
  
  g_seconds = g_seconds + time;
  if(g_seconds>1000/24) {
    level.setMatrices(g_totalTime, spin);  // TIME = performance.now() - g_startTime ???
    if (g_currCamX<g_camX) {g_currCamX = Math.min(g_currCamX+time/100,g_camX);}
    else if (g_currCamX>g_camX) {g_currCamX = Math.max(g_currCamX-time/100,g_camX);}
    tiltX(5*g_currCamX);
    
    let tempY = Math.max(-5, Math.min(g_camY+velocity.elements[1]/25, 5));
    g_currCamY += (tempY-g_currCamY)/15;
    tiltY(5*g_currCamY);
    g_seconds = g_seconds % (1000/30) ;
    renderAllShapes();
  }

  
  requestAnimationFrame(tick);
}

function physics(time) {
  
  let grav = setGravity(g_camX, g_camY);
  
  level.setMatrices(g_totalTime, spin);  // TIME = performance.now() - g_startTime ???
  let normal_set = level.normal();
  let stage_normal = new Vector3([0,0,0]);
  
  let max_v_n = new Vector3([0,0,0]);
  for (let n in normal_set) {
    let normal = new Vector3(normal_set[n].elements);
    if (normal.magnitude() > 0) { velocity.sub(normal.mul(20000/time*(.3-normal.magnitude()))); }
    stage_normal.add(normal.normalize());
    let v_b = normal.mul(Math.max(0,Vector3.dot(velocity.sub(level.v_n[n]), normal)));
    v_b.mul(-3/2);
    velocity.add(v_b);
  }
  stage_normal.normalize();
  
  let N = stage_normal.mul(Vector3.dot(grav, stage_normal));
  let F_g = grav.sub(N);
  velocity.add(F_g.mul(time/5));
  
  let v_f = new Vector3(velocity.elements) ;
  v_f.sub(level.v_f);
  let F_f = new Vector3([0,0,0]);
  if (v_f.magnitude() != 0) {
    F_f = v_f.mul(N.magnitude()/500) ;
  }
  velocity.sub(F_f.mul(time/5));
  
  let v_a = new Vector3(velocity.elements) ;
  let F_a = new Vector3([0,0,0]);
  if (v_a.magnitude() != 0) {
    let mag = v_a.magnitude();
    v_a.normalize();
    F_a = v_a.mul(mag*mag/250000) ;
  }
  velocity.sub(F_a.mul(time/5).mul(Math.min(1,velocity.magnitude()/F_a.magnitude())));
  
  
  var newSpin = new Matrix4();
  newSpin.rotate(-Vector3.dot(velocity, new Vector3([1,0,0]))/10,0,0,1);
  newSpin.rotate(Vector3.dot(velocity, new Vector3([0,0,1]))/10,1,0,0);
  spin = newSpin.concat(spin);
  let v = new Vector3(velocity.elements) ;
  level.ballPos.add(v.mul(time/20/1000));
}


function fallOutSet() {
  dynamic.style.webkitTextFillColor = "purple";
  sendTextToHTML("FALL OUT", "dynamic");
  background.style.opacity = 1;
  
  document.onkeydown = donothing;
  document.onkeyup = donothing;
  
  g_startTime = performance.now();
  requestAnimationFrame(fallOut);
}

function fallOut() {
  let time = performance.now() - g_tempSecs;
  g_totalTime += time;
  g_tempSecs = performance.now();
  
  physics(time) ;
  
  g_seconds = g_seconds + time;
  if(g_seconds>1000/30) {
    let d = new Vector3(level.ballPos.elements) ;
    d.elements[1] += 0.6;
    let ballPos = new Vector3(g_eye.elements);
    d.sub(ballPos);
    d.normalize();
    g_at = ballPos.add(d.mul(1000));
    renderAllShapes();
    g_seconds = g_seconds % (1000/30) ;
  }
  
  if (performance.now() - g_startTime > 5000) {
    level = level.resetLevel();
    readyGoSet();
    return;
  } else {
    requestAnimationFrame(fallOut);
  }
}


function victorySet() {
  g_skip = false;
  dynamic.style.backgroundImage = "linear-gradient(to left, violet, indigo, blue, green, yellow, orange, red)";
  dynamic.style.webkitBackgroundClip = "text";
  dynamic.style.webkitTextFillColor = "transparent";
  sendTextToHTML("GOAL!!", "dynamic");
  g_startTime = performance.now();
  requestAnimationFrame(victory);
}

function victory() {
  let time = performance.now() - g_startTime; 
  if (time > 5000) {
    if (level.lastLevel) {
      audio.pause();
      audio = new Audio("data/sounds/songs/congrats.mp3");
      audio.volume = 1;
      audio.loop = true;
      audio.play();
      gl.clear(gl.COLOR_BUFFER_BIT);
      dynamic.style.fontSize = "60px";
      sendTextToHTML("CONGRATULATIONS!!!", "dynamic");
      sendTextToHTML("", "finalStage");
      sendTextToHTML("MUSIC CREDIT:", "mph");
      sendTextToHTML("MusicToday80", "floor");
      return;
    } else {
      level = level.nextLevel();
      dynamic.style.backgroundImage = "none" ;
      dynamic.style.webkitBackgroundClip = "none" ;
      spin = new Matrix4();
      levelStartSet();
      return;
    }
  }
  requestAnimationFrame(victory); 
}
  

var g_camRight = 0;
var g_camLeft = 0;
var g_camUp = 0;
var g_camDown = 0;
function keydown(ev) {
  switch(ev.keyCode) {
    case 87:  // W
      g_camUp=1;
      break;
    case 65:  // A
      g_camLeft=1;
      break;
    case 83:  // S
      g_camDown=1;
      break;
    case 68:  // D
      g_camRight=1;
      break;
    case 81:  // Q
      console.log(spin);
      break;
    case 69:  // E
      rotateRight();
      break;
  }
  g_camX = g_camRight-g_camLeft;
  g_camY = g_camUp-g_camDown;
}

function keyup(ev) {
  switch(ev.keyCode) {
    case 87:  // W
      g_camUp=0;
      break;
    case 65:  // A
      g_camLeft=0;
      break;
    case 83:  // S
      g_camDown=0;
      break;
    case 68:  // D
      g_camRight=0;
      break;
  }
  g_camX = g_camRight-g_camLeft;
  g_camY = g_camUp-g_camDown;
}

// Extract the event click and return it in WebGL coordinates
function convertCoordinatesEventToGL(ev){
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x,y]);
}

var g_eye = new Vector3([0,.6,1]);
var g_at = new Vector3([0,.3,-100]);
var g_up = new Vector3([0,1,0]);

// Draw every shape that is supposed to be in the canvas

function renderAllShapes(){
  
  var projMat = new Matrix4();
  projMat.setPerspective(90, canvas.width/canvas.height, .1, 100);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);
  
  var viewMat = new Matrix4();
  viewMat.setLookAtArray(g_eye.elements, g_at.elements, g_up.elements);  // (eye, at, up)
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);
  
  var lightPos = level.lightPos;
  gl.uniform3fv(u_LightPos, lightPos.elements);
  gl.uniform3fv(u_CameraPos, g_eye.elements);
  
  
  
  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);
  
  
  level.render();
  

  // Check the time at the end of the function and show on webpage
  var duration = performance.now() - g_startTime;
  sendTextToHTML((Math.max(velocity.magnitude()/3-1,0)).toFixed(0) + " mph", "mph"); 
  sendTextToHTML(level.num + " " + level.name, "floor"); 
  //sendTextToHTML("ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration)/10, "numdot");
  //g_startTime = performance.now();

}
  
function tiltY(angle) {
  var d = new Vector3(g_eye.elements);
  var ballPos = new Vector3(level.ballPos.elements);
  ballPos.elements[1] += 1;
  d.sub(ballPos);
  let mag = d.magnitude();
  let v = new Vector3(velocity.elements).normalize();
  if (mag < 2) { d.sub(v.div(25)); }
  d.normalize();
  
  d.elements[1] = Math.tan(-angle*Math.PI/180) ;
  d.normalize().mul(2);
  g_eye.elements = d.add(ballPos).elements ;
  ballPos.sub(d).normalize();
  var d1 = new Vector3(d.elements);
  g_at.elements = d1.add(ballPos.mul(102)).elements;
}
    
function tiltX(angle) {
  var d = new Vector3(level.ballPos.elements);
  var u = new Vector3([0,1,0]);
  d.sub(g_eye);
  d = Vector3.cross(u,d);
  d.normalize();
  d.mul(Math.tan(angle*Math.PI/180));
  g_up.elements = u.add(d).elements;
}

function setGravity(xAngle, yAngle) {
  var d = new Vector3(g_eye.elements);
  var ballPos = new Vector3(level.ballPos.elements);
  var grav = new Vector3([0,-1.5,0]);
  d.sub(ballPos);
  d.elements[1] = 0;
  d.normalize();
  grav.sub(d.mul(yAngle/2));
  
  d = new Vector3(level.ballPos.elements);
  var u = new Vector3([0,1,0]);
  d.sub(g_eye);
  d = Vector3.cross(d,u);
  d.normalize();
  grav.add(d.mul(xAngle/2));
  
  return grav;
}
  


function moveForward() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  d.normalize();
  d.div(16);
  g_eye.add(d);
  g_at.add(d);
}

function moveBack() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  d.normalize();
  d.div(16);
  g_eye.sub(d);
  g_at.sub(d);
}

function moveRight() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  d.normalize();
  d = Vector3.cross(d, g_up);
  d.normalize();
  d.div(16);
  g_eye.add(d);
  g_at.add(d);
}

function moveLeft() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  d = Vector3.cross(g_up, d);
  d.normalize();
  d.div(16);
  g_eye.add(d);
  g_at.add(d);
}

function rotateLeft() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  var r = Math.sqrt(d.elements[0]**2+d.elements[1]**2+d.elements[2]**2);
  if (d.elements[0] < 0) {r *= -1; }
  var theta = Math.atan(d.elements[2]/d.elements[0]);
  theta -= Math.PI/90;
  d.elements[0] = r * Math.cos(theta);
  d.elements[2] = r * Math.sin(theta);
  
  g_at = d.add(g_eye);
}

function rotateRight() {
  var d = new Vector3(g_at.elements);
  d.sub(g_eye);
  var r = Math.sqrt(d.elements[0]**2+d.elements[1]**2+d.elements[2]**2);
  if (d.elements[0] < 0) {r *= -1; }
  var theta = Math.atan(d.elements[2]/d.elements[0]);
  theta += Math.PI/90;
  d.elements[0] = r * Math.cos(theta);
  d.elements[2] = r * Math.sin(theta);
  g_at = d.add(g_eye);
}

// Set the text of an HTML element
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}
