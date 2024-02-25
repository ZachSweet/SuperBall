class Bumps extends Level {
  constructor() {
    super();
    this.num = 5;
    this.name = "BUMPS" ;
    this.color = [.847, .847, .172];
    this.color2 = [1,1,0];
    this.goalColor = [0,0,1];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/funk.mp3';
    
    this.ballPos = new Vector3([0,1,-15*Math.sqrt(2)/2]);
    this.lightPos = new Vector3([0,1.45,10.320]);
    this.cameraPos = new Vector3([0,1.6,-14]);
    this.spinCntr = new Vector3([0,0,0]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Bumps();
  }
  
  nextLevel() {
    return new Battlefield();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Base
    this.blocks = this.blocks.concat(new Cube()); // R1
    this.blocks = this.blocks.concat(new Cube()); // L1
    this.blocks = this.blocks.concat(new Cube()); // R2
    this.blocks = this.blocks.concat(new Cube()); // L2
    this.blocks = this.blocks.concat(new Cube()); // R3
    this.blocks = this.blocks.concat(new Cube()); // L3
    this.blocks = this.blocks.concat(new Cube()); // R4
    this.blocks = this.blocks.concat(new Cube()); // L4
    this.blocks = this.blocks.concat(new Cube()); // End
    
    // blocks[0]: Base
    this.blocks[0].color = this.color2;
    this.blocks[0].matrix.setTranslate(0, -1, -17.5*Math.sqrt(2)/2);
    this.blocks[0].matrix.rotate(-45,0,1,0);
    let R1 = new Matrix4(this.blocks[0].matrix);
    let L1 = new Matrix4(this.blocks[0].matrix);
    this.blocks[0].matrix.scale(2.5, 1, 2.5);
    
    // blocks[1]: R1
    this.blocks[1].color = this.color;
    this.blocks[1].matrix = R1;
    this.blocks[1].matrix.translate(0, 0, 2.5);
    let R2 = new Matrix4(this.blocks[1].matrix) ;
    this.blocks[1].matrix.scale(2.5, 1.03, 5);
    
    // blocks[2]: L1
    this.blocks[2].color = this.color;
    this.blocks[2].matrix = L1;
    this.blocks[2].matrix.rotate(90, 0,1,0);
    this.blocks[2].matrix.translate(-2.5, 0, 2.5);
    let L2 = new Matrix4(this.blocks[2].matrix);
    this.blocks[2].matrix.scale(2.5, 1.03, 5);
    
    // blocks[3]: R2
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix = R2;
    this.blocks[3].matrix.translate(0, 0, 7.5);
    this.blocks[3].matrix.rotate(90,0,1,0);
    let R3 = new Matrix4(this.blocks[3].matrix);
    this.blocks[3].matrix.scale(2.5, 1.09, 7.5);
    
    // blocks[4]: L2
    this.blocks[4].color = this.color2;
    this.blocks[4].matrix = L2;
    this.blocks[4].matrix.translate(2.5, 0, 5);
    this.blocks[4].matrix.rotate(-90,0,1,0);
    let L3 = new Matrix4(this.blocks[4].matrix);
    this.blocks[4].matrix.scale(2.5, 1.09, 7.5);
    
    // blocks[5]: R3
    this.blocks[5].color = this.color;
    this.blocks[5].matrix = R3;
    this.blocks[5].matrix.translate(0,0,7.5);
    let R4 = new Matrix4(this.blocks[5].matrix);
    this.blocks[5].matrix.scale(2.5, 1.18, 7.5);
    
    // blocks[6]: L3
    this.blocks[6].color = this.color;
    this.blocks[6].matrix = L3;
    this.blocks[6].matrix.translate(0,0,10);
    let L4 = new Matrix4(this.blocks[6].matrix);
    this.blocks[6].matrix.scale(2.5, 1.18, 5);
    
    // blocks[7]: R4
    this.blocks[7].color = this.color2;
    this.blocks[7].matrix = R4;
    this.blocks[7].matrix.translate(2.5, 0, 7.5);
    this.blocks[7].matrix.rotate(-90, 0,1,0);
    let end = new Matrix4(this.blocks[7].matrix);
    this.blocks[7].matrix.scale(2.5, 1.3, 7.5);
    
    // blocks[8]: L4
    this.blocks[8].color = this.color2;
    this.blocks[8].matrix = L4;
    this.blocks[8].matrix.translate(0, 0, 7.5);
    this.blocks[8].matrix.rotate(90, 0,1,0);
    this.blocks[8].matrix.scale(2.5, 1.3, 7.5);
    
    // blocks[9]: End
    this.blocks[9].color = this.color;
    this.blocks[9].matrix = end;
    this.blocks[9].matrix.translate(0, 0, 7.5);
    this.blocks[9].matrix.scale(2.5, 1.45, 2.5);
    
    
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(0, .45, 17.5*Math.sqrt(2)/2-.7);
    this.goal.setMatrices();
  }
    
}