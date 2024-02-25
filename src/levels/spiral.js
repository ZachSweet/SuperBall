class Spiral extends Level {
  constructor() {
    super();
    this.num = 8;
    this.name = "SPIRAL" ;
    this.color = [.172, .172, .847];
    this.color2 = [0,0,1];
    this.goalColor = [1, 1, 0];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/cool.mp3';
    
    this.ballPos = new Vector3([.5,1,.5]);
    this.lightPos = new Vector3([-9.445, 1, 11.524]);
    this.cameraPos = new Vector3([.5,1.6,-3]);
    this.spinCntr = new Vector3([-8.5,0,10]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Spiral();
  }
  
  nextLevel() {
    return new Cubic();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // 1.0
    this.blocks = this.blocks.concat(new Cube()); // 0.9
    this.blocks = this.blocks.concat(new Cube()); // 0.8
    this.blocks = this.blocks.concat(new Cube()); // 0.7
    this.blocks = this.blocks.concat(new Cube()); // 0.6
    this.blocks = this.blocks.concat(new Cube()); // 0.5
    this.blocks = this.blocks.concat(new Cube()); // 0.4
    this.blocks = this.blocks.concat(new Cube()); // 0.3
    this.blocks = this.blocks.concat(new Cube()); // 0.2
    this.blocks = this.blocks.concat(new Cube()); // 0.1
    this.blocks = this.blocks.concat(new Cube()); // End
    
    
    // blocks[0]: 1.0
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(0,-1,0);
    let b9 = new Matrix4(this.blocks[0].matrix);
    this.blocks[0].matrix.scale(1, 1, 20);
    
    // blocks[1]: 0.9
    this.blocks[1].color = this.color;
    this.blocks[1].matrix = b9;
    this.blocks[1].matrix.translate(0, 0, 19.1);
    this.blocks[1].matrix.rotate(-90,0,1,0);
    let b8 = new Matrix4(this.blocks[1].matrix) ;
    this.blocks[1].matrix.scale(.9, 1, 18);
    
    // blocks[2]: 0.8
    this.blocks[2].color = this.color;
    this.blocks[2].matrix = b8;
    this.blocks[2].matrix.translate(0, 0, 17.19)
    this.blocks[2].matrix.rotate(-90, 0,1,0);
    let b7 = new Matrix4(this.blocks[2].matrix);
    this.blocks[2].matrix.scale(.81, 1, 16);
    
    // blocks[3]: 0.7
    this.blocks[3].color = this.color;
    this.blocks[3].matrix = b7;
    this.blocks[3].matrix.translate(0, 0, 15.271);
    this.blocks[3].matrix.rotate(-90,0,1,0);
    let b6 = new Matrix4(this.blocks[3].matrix);
    this.blocks[3].matrix.scale(.729, 1, 14);
    
    // blocks[4]: 0.6
    this.blocks[4].color = this.color;
    this.blocks[4].matrix = b6;
    this.blocks[4].matrix.translate(0, 0, 13.344);
    this.blocks[4].matrix.rotate(-90,0,1,0);
    let b5 = new Matrix4(this.blocks[4].matrix);
    this.blocks[4].matrix.scale(.656, 1, 12);
    
    // blocks[5]: 0.5
    this.blocks[5].color = this.color;
    this.blocks[5].matrix = b5;
    this.blocks[5].matrix.translate(0,0,11.410);
    this.blocks[5].matrix.rotate(-90,0,1,0);
    let b4 = new Matrix4(this.blocks[5].matrix);
    this.blocks[5].matrix.scale(.590, 1, 10);
    
    // blocks[6]: 0.4
    this.blocks[6].color = this.color;
    this.blocks[6].matrix = b4;
    this.blocks[6].matrix.translate(0,0,9.469);
    this.blocks[6].matrix.rotate(-90,0,1,0);
    let b3 = new Matrix4(this.blocks[6].matrix);
    this.blocks[6].matrix.scale(.531, 1, 8);
    
    // blocks[7]: 0.3
    this.blocks[7].color = this.color;
    this.blocks[7].matrix = b3;
    this.blocks[7].matrix.translate(0, 0, 7.522);
    this.blocks[7].matrix.rotate(-90, 0,1,0);
    let b2 = new Matrix4(this.blocks[7].matrix);
    this.blocks[7].matrix.scale(.478, 1, 6);
    
    // blocks[8]: 0.2
    this.blocks[8].color = this.color;
    this.blocks[8].matrix = b2;
    this.blocks[8].matrix.translate(0, 0, 5.570);
    this.blocks[8].matrix.rotate(-90, 0,1,0);
    let b1 = new Matrix4(this.blocks[8].matrix);
    this.blocks[8].matrix.scale(.430, 1, 4);
    
    // blocks[9]: 0.1
    this.blocks[9].color = this.color;
    this.blocks[9].matrix = b1;
    this.blocks[9].matrix.translate(0, 0, 3.613);
    this.blocks[9].matrix.rotate(-90,0,1,0);
    let end = new Matrix4(this.blocks[9].matrix);
    this.blocks[9].matrix.scale(.387, 1, 2);
    
    // blocks[10]: End
    this.blocks[10].color = this.color;
    this.blocks[10].matrix = end;
    this.blocks[10].matrix.translate(-.506,0,2);
    let goalMat = new Matrix4(this.blocks[10].matrix);
    this.blocks[10].matrix.scale(1.4, 1, 1.4);
    
    
    this.goal.color = this.goalColor;
    this.goal.matrix = goalMat;
    this.goal.matrix.translate(.7, 1, .7);
    this.goal.setMatrices();
  }
    
}