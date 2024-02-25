class Obstruction extends Level {
  constructor() {
    super();
    this.num = 4;
    this.name = "OBSTRUCTION" ;
    this.color = [.847, .847, .172];
    this.color2 = [1,1,0];
    this.bumperColor = [0,1,.470];
    this.goalColor = [0,0,1];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/funk.mp3';
    
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
    return new Obstruction();
  }
  
  nextLevel() {
    return new Bumps();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
    
    // blocks[3]: Push 1
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix.setTranslate(3, 0, 2.5);
    this.blocks[3].matrix.rotate(90,0,0,1);
    this.blocks[3].matrix.scale(1.2, 1, 2.5);
    if (time%5000 < 1000) {
      this.blocks[3].matrix.scale(1,.5,1);
      this.blocks[3].velocity = new Vector3([0,0,0]);
    } else if (time%5000 < 1500) {
      this.blocks[3].matrix.scale(1,.5+5*(time%5000-1000)/500, 1);
      this.blocks[3].velocity = new Vector3([200,0,0]);
    } else if (time%5000 < 2000) {
      this.blocks[3].matrix.scale(1,5.5,1);
      this.blocks[3].velocity = new Vector3([0,0,0]);
    } else {
      this.blocks[3].matrix.scale(1, 5.5-5*(time%5000-2000)/3000, 1);
      this.blocks[3].velocity = new Vector3([-100/3,0,0]);
    }
    
    // blocks[4]: Push 2
    this.blocks[4].color = this.color2;
    this.blocks[4].matrix.setTranslate(-3, 0, 7.5);
    this.blocks[4].matrix.rotate(-90,0,0,1);
    this.blocks[4].matrix.scale(-1.2, 1, 2.5);
    if (time%5000 < 500) {
      this.blocks[4].matrix.scale(1,.5+5*(time%5000)/500, 1);
      this.blocks[4].velocity = new Vector3([-200,0,0]);
    } else if (time%5000 < 1000) {
      this.blocks[4].matrix.scale(1,5.5,1);
      this.blocks[4].velocity = new Vector3([0,0,0]);
    } else if (time%5000 < 4000) {
      this.blocks[4].matrix.scale(1, 5.5-5*(time%5000-1000)/3000, 1);
      this.blocks[4].velocity = new Vector3([100/3,0,0]);
    } else {
      this.blocks[4].matrix.scale(1,.5,1);
      this.blocks[4].velocity = new Vector3([0,0,0]);
    }
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Base
    this.blocks = this.blocks.concat(new Cube()); // Block 1
    this.blocks = this.blocks.concat(new Cube()); // Block 2
    this.blocks = this.blocks.concat(new Cube()); // Push 1
    this.blocks = this.blocks.concat(new Cube()); // Push 2
    this.bumpers = this.bumpers.concat(new Cube()); // Bumper 1
    this.bumpers = this.bumpers.concat(new Cube()); // Bumper 2
    
    // blocks[0]: Base
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(-2.5, -1, -20);
    this.blocks[0].matrix.scale(5, 1, 40);
    
    // blocks[1]: Block 1
    this.blocks[1].color = this.color2;
    this.blocks[1].matrix.setTranslate(0, 0, -7.5);
    this.blocks[1].matrix.scale(2.5, 1.2, 2.5);
    
    // bumper[0]: Bumper 1
    this.bumpers[0].color = this.bumperColor;
    this.bumpers[0].matrix.setTranslate(-1.25, 0, -6.35);
    this.bumpers[0].matrix.scale(.2, .5, .2);
    
    // blocks[2]: Block 2
    this.blocks[2].color = this.color2;
    this.blocks[2].matrix.setTranslate(-2.5, 0, -2.5);
    this.blocks[2].matrix.scale(2.5, 1.2, 2.5);
    
    // bumper[1]: Bumper 2
    this.bumpers[1].color = this.bumperColor;
    this.bumpers[1].matrix.setTranslate(1.15, 0, -1.35);
    this.bumpers[1].matrix.scale(.2, .5, .2);
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(0, 0, 19);
    this.goal.setMatrices();
  }
    
}