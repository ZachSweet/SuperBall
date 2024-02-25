class Basic extends Level {
  constructor() {
    super();
    this.num = 1;
    this.name = "BASIC" ;
    this.color = [.847,.172,.172];
    this.goalColor = [0,1,1];
    //this.floorTex
    this.bg = 'data/textures/forest.jpeg'
    this.song = 'data/sounds/songs/corporate.mp3';
    
    this.ballPos = new Vector3([0,1,-9]);
    this.lightPos = new Vector3([0,1,8]);
    this.cameraPos = new Vector3([0,1.6,-12]);
    this.spinCntr = new Vector3([0,0,0]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Basic();
  }
  
  nextLevel() {
    return new Ramps();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Stage
    
    // blocks[0]: Stage
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(-5, -1, -10);
    this.blocks[0].matrix.scale(10, 1, 20);
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(0, 0, 9);
    this.goal.setMatrices();
  }
    
}