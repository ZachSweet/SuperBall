class Cubic extends Level {
  constructor() {
    super();
    this.num = 9;
    this.name = "CUBIC" ;
    this.color = [.172, .172, .847];
    this.color2 = [0,0,1];
    this.bumperColor = [0, 1, .470];
    this.goalColor = [1, 1, 0];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/cool.mp3';
    
    this.ballPos = new Vector3([.5,1,1]);
    this.lightPos = new Vector3([7.139,-.379,26]);
    this.cameraPos = new Vector3([.5,1.6,-2]);
    this.spinCntr = new Vector3([2,0,14]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Cubic();
  }
  
  nextLevel() {
    return new Exam();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Flat 1
    this.blocks = this.blocks.concat(new Cube()); // Down 1
    this.blocks = this.blocks.concat(new Cube()); // Down 1
    this.blocks = this.blocks.concat(new Cube()); // Flat 2
    this.blocks = this.blocks.concat(new Cube()); // Up 1
    this.blocks = this.blocks.concat(new Cube()); // Up 1
    this.blocks = this.blocks.concat(new Cube()); // Flat 3
    this.blocks = this.blocks.concat(new Cube()); // Down 2
    this.blocks = this.blocks.concat(new Cube()); // Down 2
    this.blocks = this.blocks.concat(new Cube()); // Flat 4
    this.blocks = this.blocks.concat(new Cube()); // Up 2
    this.blocks = this.blocks.concat(new Cube()); // Up 2
    this.blocks = this.blocks.concat(new Cube()); // Flat 5
    this.blocks = this.blocks.concat(new Cube()); // Down 3
    this.blocks = this.blocks.concat(new Cube()); // Down 3
    this.blocks = this.blocks.concat(new Cube()); // Flat 6
    this.blocks = this.blocks.concat(new Cube()); // Up 3
    this.blocks = this.blocks.concat(new Cube()); // Up 3
    this.blocks = this.blocks.concat(new Cube()); // Flat 7
    this.blocks = this.blocks.concat(new Cube()); // Down 4
    
    // blocks[0]: Flat 1
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(0,0,0);
    this.blocks[0].matrix.scale(4, -.1, 2);
    
    // blocks[1]: Down 1
    this.blocks[1].color = this.color2;
    this.blocks[1].textureNum = -1;
    this.blocks[1].matrix.setTranslate(4,0,0);
    this.blocks[1].matrix.rotate(-6.333,0,0,1);
    this.blocks[1].matrix.elements[2] = 2/3; // Shear
    this.blocks[1].matrix.scale(3,-.1,2);

    // blocks[2]: Down 1
    this.blocks[2].color = this.color2;
    this.blocks[2].textureNum = -1;
    this.blocks[2].matrix.setTranslate(4,0,4);
    this.blocks[2].matrix.rotate(-6.333,0,0,1);
    this.blocks[2].matrix.elements[2] = -2/3;
    this.blocks[2].matrix.scale(3,-.1,2);
    
    // blocks[3]: Flat 2
    this.blocks[3].color = this.color;
    this.blocks[3].matrix.setTranslate(0,0,4);
    this.blocks[3].matrix.scale(4,-.1,2);
    
    // blocks[4]: Up 1
    this.blocks[4].color = this.color2;
    this.blocks[4].textureNum = -1;
    this.blocks[4].matrix.setTranslate(0,0,4);
    this.blocks[4].matrix.rotate(-12.666,0,0,1);
    this.blocks[4].matrix.elements[2] = -2/3;
    this.blocks[4].matrix.scale(-3,-.1,2);
    
    // blocks[5]: Up 1
    this.blocks[5].color = this.color2;
    this.blocks[5].textureNum = -1;
    this.blocks[5].matrix.setTranslate(0,0,8);
    this.blocks[5].matrix.rotate(-12.666,0,0,1);
    this.blocks[5].matrix.elements[2] = 2/3;
    this.blocks[5].matrix.scale(-3,-.1,2);
    
    // blocks[6]: Flat 3
    this.blocks[6].color = this.color;
    this.blocks[6].matrix.setTranslate(0,0,8);
    this.blocks[6].matrix.scale(4,-.1,2);
    
    // blocks[7]: Down 2
    this.blocks[7].color = this.color2;
    this.blocks[7].textureNum = -1;
    this.blocks[7].matrix.setTranslate(4,0,8);
    this.blocks[7].matrix.rotate(-12.666,0,0,1);
    this.blocks[7].matrix.elements[2] = 2/3; // Shear
    this.blocks[7].matrix.scale(3,-.1,2);

    // blocks[8]: Down 2
    this.blocks[8].color = this.color2;
    this.blocks[8].textureNum = -1;
    this.blocks[8].matrix.setTranslate(4,0,12);
    this.blocks[8].matrix.rotate(-12.666,0,0,1);
    this.blocks[8].matrix.elements[2] = -2/3;
    this.blocks[8].matrix.scale(3,-.1,2);
    
    // blocks[9]: Flat 4
    this.blocks[9].color = this.color;
    this.blocks[9].matrix.setTranslate(0,0,12);
    this.blocks[9].matrix.scale(4, -.1,2);
    
    // blocks[10]: Up 2
    this.blocks[10].color = this.color2;
    this.blocks[10].textureNum = -1;
    this.blocks[10].matrix.setTranslate(0,0,12);
    this.blocks[10].matrix.rotate(-25.333,0,0,1);
    this.blocks[10].matrix.elements[2] = -2/3;
    this.blocks[10].matrix.scale(-3,-.1,2);
    
    // blocks[11]: Up 2
    this.blocks[11].color = this.color2;
    this.blocks[11].textureNum = -1;
    this.blocks[11].matrix.setTranslate(0,0,16);
    this.blocks[11].matrix.rotate(-25.333,0,0,1);
    this.blocks[11].matrix.elements[2] = 2/3;
    this.blocks[11].matrix.scale(-3,-.1,2);
    
    // blocks[12]: Flat 5
    this.blocks[12].color = this.color;
    this.blocks[12].matrix.setTranslate(0,0,16);
    this.blocks[12].matrix.scale(4,-.1,2);
    
    // blocks[13]: Down 3
    this.blocks[13].color = this.color2;
    this.blocks[13].textureNum = -1;
    this.blocks[13].matrix.setTranslate(4,0,16);
    this.blocks[13].matrix.rotate(-19,0,0,1);
    this.blocks[13].matrix.elements[2] = 2/3;
    this.blocks[13].matrix.scale(3,-.1,2);
    
    // blocks[14]: Down 3
    this.blocks[14].color = this.color2;
    this.blocks[14].textureNum = -1;
    this.blocks[14].matrix.setTranslate(4,0,20);
    this.blocks[14].matrix.rotate(-19,0,0,1);
    this.blocks[14].matrix.elements[2] = -2/3;
    this.blocks[14].matrix.scale(3,-.1,2);
    
    // blocks[15]: Flat 6
    this.blocks[15].color = this.color;
    this.blocks[15].matrix.setTranslate(0,0,20);
    this.blocks[15].matrix.scale(4,-.1,2);
    
    // blocks[16]: Up 3
    this.blocks[16].color = this.color2;
    this.blocks[16].textureNum = -1;
    this.blocks[16].matrix.setTranslate(0,0,20);
    this.blocks[16].matrix.rotate(-38,0,0,1);
    this.blocks[16].matrix.elements[2] = -2/3;
    this.blocks[16].matrix.scale(-3,-.1,2);
    
    // blocks[17]: Up 3
    this.blocks[17].color = this.color2;
    this.blocks[17].textureNum = -1;
    this.blocks[17].matrix.setTranslate(0,0,24);
    this.blocks[17].matrix.rotate(-38,0,0,1);
    this.blocks[17].matrix.elements[2] = 2/3;
    this.blocks[17].matrix.scale(-3,-.1,2);
    
    // blocks[18]: Flat 7
    this.blocks[18].color = this.color;
    this.blocks[18].matrix.setTranslate(0,0,24);
    this.blocks[18].matrix.scale(4,-.1,2);
    
    // blocks[19]: Down 4
    this.blocks[19].color = this.color2;
    this.blocks[19].textureNum = -1;
    this.blocks[19].matrix.setTranslate(4,0,24);
    this.blocks[19].matrix.rotate(-25.33,0,0,1);
    let goalMat = new Matrix4(this.blocks[19].matrix);
    this.blocks[19].matrix.elements[2] = 2/3;
    this.blocks[19].matrix.scale(3,-.1,2);
    
    this.goal.color = this.goalColor;
    this.goal.matrix = goalMat;
    this.goal.matrix.translate(3, 0, 3);
    this.goal.matrix.rotate(90,0,1,0);
    this.goal.setMatrices();
  }
    
}