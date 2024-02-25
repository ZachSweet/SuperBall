class Slide extends Level {
  constructor() {
    super();
    this.num = 3;
    this.name = "SLIDE" ;
    this.color = [.847, .611, .172];
    this.color2 = [1,.607,0];
    this.goalColor = [0,.329,1];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/upbeat.mp3';
    
    this.ballPos = new Vector3([0,1,-19]);
    this.lightPos = new Vector3([0,1,18]);
    this.cameraPos = new Vector3([0,1.6,-22]);
    this.spinCntr = new Vector3([0,0,0]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Slide();
  }
  
  nextLevel() {
    return new Obstruction();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
    // blocks[1]: First Move
    this.blocks[1].color = this.color2;
    this.blocks[1].matrix.setTranslate(-2.5, -.3, -10+2.5*(Math.sin(time/2500)+1));
    this.blocks[1].matrix.scale(5, .3, 5);
    this.blocks[1].velocity = new Vector3([0, 0, 20*Math.cos(time/2500)]);
    
    // blocks[2]: Second Move
    this.blocks[2].color = this.color2;
    this.blocks[2].matrix.setTranslate(-2.5, -.3, 5-2.5*(Math.sin(time/2500)+1));
    this.blocks[2].matrix.scale(5, .3, 5);
    this.blocks[2].velocity = new Vector3([0, 0, -20*Math.cos(time/2500)]);
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Start
    this.blocks = this.blocks.concat(new Cube()); // First Move
    this.blocks = this.blocks.concat(new Cube()); // Second Move
    this.blocks = this.blocks.concat(new Cube()); // End
    
    
    // blocks[0]: Start
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(-2.5, -1, -20);
    this.blocks[0].matrix.scale(5, 1, 10);
    
    // blocks[3]: End
    this.blocks[3].color = this.color;
    this.blocks[3].matrix.setTranslate(-2.5, -1, 10);
    this.blocks[3].matrix.scale(5, 1, 10);
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(0, 0, 19);
    this.goal.setMatrices();
    
  }
    
}