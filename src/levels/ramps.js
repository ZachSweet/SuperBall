class Ramps extends Level {
  constructor() {
    super();
    this.num = 2;
    this.name = "RAMPS" ;
    this.color = [.847, .611, .172];
    this.color2 = [1,.607,0];
    this.goalColor = [0,.329,1];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/upbeat.mp3';
    
    this.ballPos = new Vector3([7,1,-9]);
    this.lightPos = new Vector3([-8,1,7]);
    this.cameraPos = new Vector3([7,1.6,-12]);
    this.spinCntr = new Vector3([0,0,0]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit

    
    this.load();
  }
  
  
  resetLevel() {
    return new Ramps();
  }
  
  nextLevel() {
    return new Slide();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
  }
    
  

  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Start
    this.blocks = this.blocks.concat(new Cube()); // Up Ramp
    this.blocks = this.blocks.concat(new Cube()); // High Plat
    this.blocks = this.blocks.concat(new Cube()); // Down Ramp
    this.blocks = this.blocks.concat(new Cube()); // End
    
    // blocks[0]: Stage
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(10, -1, -10);
    this.blocks[0].matrix.scale(-6, 1, 7);
    
    // blocks[1]: Up Ramp
    this.blocks[1].color = this.color2;
    this.blocks[1].matrix.setTranslate(10, 0, -3);
    this.blocks[1].matrix.rotate(-15,1,0,0);
    this.blocks[1].matrix.scale(-6, -1, 7.247); 
    
    // blocks[2]: High Plat
    this.blocks[2].color = this.color;
    this.blocks[2].matrix.setTranslate(10, 1.876, 4);
    this.blocks[2].matrix.scale(-6, -1, 6);
    
    // blocks[3]: Down Ramp
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix.setTranslate(4, 1.876, 4);
    this.blocks[3].matrix.rotate(15,0,0,1);
    this.blocks[3].matrix.scale(-7.247, -1, 6);
    
    // blocks[4]: End
    this.blocks[4].color = this.color;
    this.blocks[4].matrix.setTranslate(-3,-1,4);
    this.blocks[4].matrix.scale(-7,1,6);
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(-9, 0, 7);
    this.goal.matrix.rotate(90,0,1,0);
    this.goal.setMatrices();
  }
    
}