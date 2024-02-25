class Exam extends Level {
  constructor() {
    super();
    this.num = 10;
    this.name = "EXAM" ;
    this.lastLevel = true;
    this.color = [.258, .078, .388];
    this.color2 = [.278,0,478];
    this.bumperColor = [0, .439, .478];
    this.goalColor = [.2, .478, 0];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/extreme.mp3';
    
    this.ballPos = new Vector3([0,1,0]);
    this.lightPos = new Vector3([12.567,1,-.2]);
    this.cameraPos = new Vector3([0,2,-3]);
    this.spinCntr = new Vector3([6,0,7]) ;
    this.spinRad = 20;
    this.spinHeight = 15;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Exam();
  }
  
  nextLevel() {
    return false;
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Start
    this.blocks = this.blocks.concat(new Cube()); // Hill 1
    this.blocks = this.blocks.concat(new Cube()); // Floor 2 Start
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard3
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard3
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard3
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard3
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Checkerboard5
    this.blocks = this.blocks.concat(new Cube()); // Floor 2 End
    this.blocks = this.blocks.concat(new Cube()); // Hill 2
    this.blocks = this.blocks.concat(new Cube()); // Floor 3 Start
    this.blocks = this.blocks.concat(new Cube()); // Jolt
    this.blocks = this.blocks.concat(new Cube()); // Square Bridge
    this.blocks = this.blocks.concat(new Cube()); // Square Front
    this.blocks = this.blocks.concat(new Cube()); // Square Top
    this.blocks = this.blocks.concat(new Cube()); // Square Bottom
    this.blocks = this.blocks.concat(new Cube()); // Square Back
    this.blocks = this.blocks.concat(new Cube()); // Square Bridge 2
    this.blocks = this.blocks.concat(new Cube()); // Jolt 2
    this.blocks = this.blocks.concat(new Cube()); // Floor 3 End
    this.blocks = this.blocks.concat(new Cube()); // Hill 3
    this.blocks = this.blocks.concat(new Cube()); // Floor 4 Start
    this.blocks = this.blocks.concat(new Cube()); // Bridge Up
    this.blocks = this.blocks.concat(new Cube()); // Bridge Down
    this.blocks = this.blocks.concat(new Cube()); // Floor 4 Mid
    this.blocks = this.blocks.concat(new Cube()); // Ramp
    this.blocks = this.blocks.concat(new Cube()); // Floor 4 End
    this.blocks = this.blocks.concat(new Cube()); // Step 1
    this.blocks = this.blocks.concat(new Cube()); // Step 2
    this.blocks = this.blocks.concat(new Cube()); // Step 3
    this.blocks = this.blocks.concat(new Cube()); // Step 4
    this.blocks = this.blocks.concat(new Cube()); // Step 5
    this.blocks = this.blocks.concat(new Cube()); // Downhill
    this.blocks = this.blocks.concat(new Cube()); // Slow 1
    this.blocks = this.blocks.concat(new Cube()); // Slow 2
    this.blocks = this.blocks.concat(new Cube()); // Slow 3
    this.blocks = this.blocks.concat(new Cube()); // Slow 4
    this.blocks = this.blocks.concat(new Cube()); // Slow 5
    this.blocks = this.blocks.concat(new Cube()); // Finale
    
    
    // blocks[0]: Start
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(-1.2,0,-1.2);
    let hill1 = new Matrix4(this.blocks[0].matrix);
    this.blocks[0].matrix.scale(2.4,-.3,2.4);
    
    // blocks[1]: Hill 1
    this.blocks[1].color = this.color2;
    this.blocks[1].matrix = hill1;
    this.blocks[1].matrix.translate(.9,0,2.4);
    this.blocks[1].matrix.rotate(-5, 1,0,0);
    let floor2 = new Matrix4(this.blocks[1].matrix);
    this.blocks[1].matrix.scale(.6, -.1, 15);
    
    // blocks[2]: Floor 2 Start
    this.blocks[2].color = this.color;
    this.blocks[2].matrix = floor2;
    this.blocks[2].matrix.translate(-2.1,0,15);
    this.blocks[2].matrix.rotate(5, 1,0,0);
    let checkerboard = new Matrix4(this.blocks[2].matrix);
    this.blocks[2].matrix.scale(3.6, -.3, 2.4);
    
    // blocks[3-6]: Checkerboard3
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix = new Matrix4(checkerboard);
    this.blocks[3].matrix.translate(-.8,0,.8);
    this.blocks[3].matrix.scale(.8,-.1,.8);
    
    this.blocks[4].color = this.color2;
    this.blocks[4].matrix = new Matrix4(checkerboard);
    this.blocks[4].matrix.translate(-1.6,0,0);
    this.blocks[4].matrix.scale(.8,-.1,.8);
    
    this.blocks[5].color = this.color2;
    this.blocks[5].matrix = new Matrix4(checkerboard);
    this.blocks[5].matrix.translate(-1.6,0,1.6);
    this.blocks[5].matrix.scale(.8,-.1,.8);
    
    this.blocks[6].color = this.color2;
    this.blocks[6].matrix = new Matrix4(checkerboard);
    this.blocks[6].matrix.translate(-2.4,0,.8);
    this.blocks[6].matrix.scale(.8,-.1,.8);
    
    // blocks[7-14]: Checkerboard5
    this.blocks[7].color = this.color2;
    this.blocks[7].matrix = new Matrix4(checkerboard);
    this.blocks[7].matrix.translate(-2.88,0,.96);
    this.blocks[7].matrix.scale(.48,-.1,.48);
    
    this.blocks[8].color = this.color2;
    this.blocks[8].matrix = new Matrix4(checkerboard);
    this.blocks[8].matrix.translate(-3.36,0,.48);
    this.blocks[8].matrix.scale(.48,-.1,.48);
    
    this.blocks[9].color = this.color2;
    this.blocks[9].matrix = new Matrix4(checkerboard);
    this.blocks[9].matrix.translate(-3.36,0,1.44);
    this.blocks[9].matrix.scale(.48,-.1,.48);
    
    this.blocks[10].color = this.color2;
    this.blocks[10].matrix = new Matrix4(checkerboard);
    this.blocks[10].matrix.translate(-3.84,0,0);
    this.blocks[10].matrix.scale(.48,-.1,.48);
    
    this.blocks[11].color = this.color2;
    this.blocks[11].matrix = new Matrix4(checkerboard);
    this.blocks[11].matrix.translate(-3.84,0,1.92);
    this.blocks[11].matrix.scale(.48,-.1,.48);
    
    this.blocks[12].color = this.color2;
    this.blocks[12].matrix = new Matrix4(checkerboard);
    this.blocks[12].matrix.translate(-4.32,0,.48);
    this.blocks[12].matrix.scale(.48,-.1,.48);
    
    this.blocks[13].color = this.color2;
    this.blocks[13].matrix = new Matrix4(checkerboard);
    this.blocks[13].matrix.translate(-4.32,0,1.44);
    this.blocks[13].matrix.scale(.48,-.1,.48);
    
    this.blocks[14].color = this.color2;
    this.blocks[14].matrix = new Matrix4(checkerboard);
    this.blocks[14].matrix.translate(-4.8,0,.96);
    this.blocks[14].matrix.scale(.48,-.1,.48);
    
    // blocks[15]: Floor 2 End
    this.blocks[15].color = this.color;
    this.blocks[15].matrix = new Matrix4(checkerboard);
    this.blocks[15].matrix.translate(-8.4,0,-.6);
    let hill2 = new Matrix4(this.blocks[15].matrix);
    this.blocks[15].matrix.scale(3.6,-.3,3.6);
    
    // blocks[16]: Hill 2
    this.blocks[16].color = this.color2;
    this.blocks[16].matrix = hill2;
    this.blocks[16].matrix.translate(.975,0,0);
    this.blocks[16].matrix.rotate(10, 1,0,0);
    this.blocks[16].matrix.scale(1,1,-1);
    let floor3 = new Matrix4(this.blocks[16].matrix);
    this.blocks[16].matrix.scale(.45,-.1,15);
    
    // blocks[17]: Floor 3 Start
    this.blocks[17].color = this.color;
    this.blocks[17].matrix = floor3;
    this.blocks[17].matrix.translate(-.975,0,15);
    this.blocks[17].matrix.rotate(10, 1,0,0);
    let jolt = new Matrix4(this.blocks[17].matrix);
    this.blocks[17].matrix.scale(4.8,-.3,2.4);
    
    // blocks[18]: Jolt
    this.blocks[18].color = this.color2;
    this.blocks[18].textureNum = -1;
    this.blocks[18].matrix = jolt;
    this.blocks[18].matrix.translate(5.55,0,0);
    let square = new Matrix4(this.blocks[18].matrix);
    this.blocks[18].matrix.scale(.6,-.1,2.4);

    // blocks[19]: Square Bridge Start
    this.blocks[19].color = this.color2;
    this.blocks[19].textureNum = -1;
    this.blocks[19].matrix = new Matrix4(square);
    this.blocks[19].matrix.translate(.6,0,.9);
    this.blocks[19].matrix.scale(1.8,-.1,.6);
    
    // blocks[20]: Square Front
    this.blocks[20].color = this.color2;
    this.blocks[20].textureNum = -1;
    this.blocks[20].matrix = new Matrix4(square);
    this.blocks[20].matrix.translate(2.4,0,0);
    this.blocks[20].matrix.scale(.6,-.1,2.4);

    // blocks[21]: Square Top
    this.blocks[21].color = this.color2;
    this.blocks[21].textureNum = -1;
    this.blocks[21].matrix = new Matrix4(square);
    this.blocks[21].matrix.translate(2.4,0,1.8);
    this.blocks[21].matrix.scale(2.4,-.1,.6);
    
    // blocks[22]: Square Bottom
    this.blocks[22].color = this.color2;
    this.blocks[22].textureNum = -1;
    this.blocks[22].matrix = new Matrix4(square);
    this.blocks[22].matrix.translate(2.4,0,0);
    this.blocks[22].matrix.scale(2.4,-.1,.6);
    
    // blocks[23]: Square Back
    this.blocks[23].color = this.color2;
    this.blocks[23].textureNum = -1;
    this.blocks[23].matrix = new Matrix4(square);
    this.blocks[23].matrix.translate(4.2,0,0);
    this.blocks[23].matrix.scale(.6,-.1,2.4);
    
    // blocks[24]: Square Bridge End
    this.blocks[24].color = this.color2;
    this.blocks[24].textureNum = -1;
    this.blocks[24].matrix = new Matrix4(square);
    this.blocks[24].matrix.translate(4.8,0,.9);
    this.blocks[24].matrix.scale(1.8,-.1,.6);
    
    // blocks[25]: Jolt 2
    this.blocks[25].color = this.color2;
    this.blocks[25].textureNum = -1;
    this.blocks[25].matrix = new Matrix4(square);
    this.blocks[25].matrix.translate(6.6,0,0);
    this.blocks[25].matrix.scale(.6,-.1,2.4);
    
    // blocks[26]: Floor 3 End
    this.blocks[26].color = this.color;
    this.blocks[26].matrix = new Matrix4(square);
    this.blocks[26].matrix.translate(7.95,0,0);
    let hill3 = new Matrix4(this.blocks[26].matrix);
    this.blocks[26].matrix.scale(2.4,-.3,2.4);
    
    // blocks[27]: Hill 3
    this.blocks[27].color = this.color2;
    this.blocks[27].matrix = hill3;
    this.blocks[27].matrix.translate(2.4,0,1.05);
    this.blocks[27].matrix.rotate(15, 0,0,1);
    let floor4 = new Matrix4(this.blocks[27].matrix);
    this.blocks[27].matrix.scale(15,-.1,.3);
    
    // blocks[28]: Floor 4 Start
    this.blocks[28].color = this.color;
    this.blocks[28].matrix = floor4;
    this.blocks[28].matrix.translate(15,0,1.35);
    this.blocks[28].matrix.rotate(-15, 0,0,1);
    this.blocks[28].matrix.scale(1,1,-1);
    let bridge = new Matrix4(this.blocks[28].matrix);
    this.blocks[28].matrix.scale(2.4,-.3,4.8);
    
    // blocks[29]: Bridge Up
    this.blocks[29].color = this.color2;
    this.blocks[29].matrix = bridge;
    this.blocks[29].matrix.translate(1.05,0,4.8);
    this.blocks[29].matrix.rotate(-30, 1,0,0);
    let bridgeD = new Matrix4(this.blocks[29].matrix);
    this.blocks[29].matrix.scale(.3,-.1,1.75);
    
    // blocks[30]: Bridge Down
    this.blocks[30].color = this.color2;
    this.blocks[30].matrix = bridgeD;
    this.blocks[30].matrix.translate(0,0,1.75);
    this.blocks[30].matrix.rotate(60, 1,0,0);
    let floor4mid = new Matrix4(this.blocks[30].matrix);
    this.blocks[30].matrix.scale(.3,-.1,1.75);
    
    // blocks[31]: Floor 4 Mid
    this.blocks[31].color = this.color;
    this.blocks[31].matrix = floor4mid;
    this.blocks[31].matrix.translate(-1.05,0,1.75);
    this.blocks[31].matrix.rotate(-30, 1,0,0);
    let ramp = new Matrix4(this.blocks[31].matrix);
    let floor4end = new Matrix4(this.blocks[31].matrix);
    this.blocks[31].matrix.scale(2.4,-.3,4.8);
    
    // blocks[32]: Ramp
    this.blocks[32].color = this.color2;
    this.blocks[32].matrix = ramp;
    this.blocks[32].matrix.translate(.6,0,4.8);
    this.blocks[32].matrix.rotate(-45, 1,0,0);
    this.blocks[32].matrix.scale(1.2,-.1,1.25);
    
    // blocks[33]: Floor 4 End
    this.blocks[33].color = this.color;
    this.blocks[33].matrix = floor4end;
    this.blocks[33].matrix.translate(0,0,6.05);
    let step1 = new Matrix4(this.blocks[33].matrix);
    this.blocks[33].matrix.scale(2.4,-.3,4.8);
    
    // blocks[34]: Step 1
    this.blocks[34].color = this.color2;
    this.blocks[34].matrix = step1;
    this.blocks[34].matrix.translate(1.445,0,4.8);
    this.blocks[34].matrix.scale(-1,1,1);
    let step2 = new Matrix4(this.blocks[34].matrix);
    this.blocks[34].matrix.scale(.45,-.3,1.2);
    
    // blocks[35]: Step2
    this.blocks[35].color = this.color2;
    this.blocks[35].matrix = step2;
    this.blocks[35].matrix.translate(0,-.075,1.2);
    this.blocks[35].matrix.rotate(45, 0,1,0);
    let step3 = new Matrix4(this.blocks[35].matrix);
    this.blocks[35].matrix.scale(.45,-.3,2.4);
    
    // blocks[36]: Step3
    this.blocks[36].color = this.color2;
    this.blocks[36].matrix = step3;
    this.blocks[36].matrix.translate(0,-.15,2.4);
    this.blocks[36].matrix.rotate(45, 0,1,0);
    let step4 = new Matrix4(this.blocks[36].matrix);
    this.blocks[36].matrix.scale(.45,-.3,3.6);
    
    // blocks[37]: Step4
    this.blocks[37].color = this.color2;
    this.blocks[37].matrix = step4;
    this.blocks[37].matrix.translate(0,-.225,3.6);
    this.blocks[37].matrix.rotate(45, 0,1,0);
    let step5 = new Matrix4(this.blocks[37].matrix);
    this.blocks[37].matrix.scale(.45,-.3,4.8);
    
    // blocks[38]: Step5
    this.blocks[38].color = this.color2;
    this.blocks[38].matrix = step5;
    this.blocks[38].matrix.translate(0,-.3,4.8);
    this.blocks[38].matrix.rotate(45, 0,1,0);
    let downhill = new Matrix4(this.blocks[38].matrix);
    this.blocks[38].matrix.scale(.45,-.3,6);
    
    // blocks[39]: Downhill
    this.blocks[39].color = this.color2;
    this.blocks[39].matrix = downhill;
    this.blocks[39].matrix.translate(.075,0,6);
    this.blocks[39].matrix.rotate(45, 1,0,0);
    let slow1 = new Matrix4(this.blocks[39].matrix);
    this.blocks[39].matrix.scale(.3,-.3,7.616);
    
    // blocks[40]: Slow 1
    this.blocks[40].color = this.color2;
    this.blocks[40].matrix = slow1;
    this.blocks[40].matrix.translate(0,0,7.616);
    this.blocks[40].matrix.rotate(-5, 1,0,0);
    let slow2 = new Matrix4(this.blocks[40].matrix);
    this.blocks[40].matrix.scale(.3,-.3,1);
    
    // blocks[41]: Slow 2
    this.blocks[41].color = this.color2;
    this.blocks[41].matrix = slow2;
    this.blocks[41].matrix.translate(0,0,1);
    this.blocks[41].matrix.rotate(-10, 1,0,0);
    let slow3 = new Matrix4(this.blocks[41].matrix);
    this.blocks[41].matrix.scale(.3,-.3,1);
    
    // blocks[42]: Slow 3
    this.blocks[42].color = this.color2;
    this.blocks[42].matrix = slow3;
    this.blocks[42].matrix.translate(0,0,1);
    this.blocks[42].matrix.rotate(-10, 1,0,0);
    let slow4 = new Matrix4(this.blocks[42].matrix);
    this.blocks[42].matrix.scale(.3,-.3,1);
    
    // blocks[43]: Slow 4
    this.blocks[43].color = this.color2;
    this.blocks[43].matrix = slow4;
    this.blocks[43].matrix.translate(0,0,1);
    this.blocks[43].matrix.rotate(-10, 1,0,0);
    let slow5 = new Matrix4(this.blocks[43].matrix);
    this.blocks[43].matrix.scale(.3,-.3,1);
    
    // blocks[44]: Slow 6
    this.blocks[44].color = this.color2;
    this.blocks[44].matrix = slow5;
    this.blocks[44].matrix.translate(0,0,1);
    this.blocks[44].matrix.rotate(-10, 1,0,0);
    let finale = new Matrix4(this.blocks[44].matrix);
    this.blocks[44].matrix.scale(.3,-.3,.413);
    
    // blocks[45]: Finale
    this.blocks[45].color = this.color;
    this.blocks[45].matrix = finale;
    this.blocks[45].matrix.translate(-1.05,0,.413);
    let goalMat = new Matrix4(this.blocks[45].matrix);
    this.blocks[45].matrix.scale(2.4,-.3,2.4);
    
    this.goal.color = this.goalColor;
    this.goal.matrix = goalMat;
    this.goal.matrix.translate(1.2, 0, 2.4);
    this.goal.setMatrices();
  }
    
}