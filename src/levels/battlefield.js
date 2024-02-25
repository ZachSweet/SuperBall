class Battlefield extends Level {
  constructor() {
    super();
    this.num = 6;
    this.name = "BATTLEFIELD" ;
    this.color = [.078, .380, .078];
    this.color2 = [0,.470,0];
    this.goalColor = [.470, 0, .470];
    //this.floorTex
    //this.bg
    this.song = 'data/sounds/songs/rock.mp3';
    
    this.ballPos = new Vector3([0,6.24,0]);
    this.lightPos = new Vector3([0,1,0]);
    this.cameraPos = new Vector3([-3,6.84,0]);
    this.spinCntr = new Vector3([0,3.12,0]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10.88;
    //this.timeLimit
    
    this.load();
  }
  
  
  resetLevel() {
    return new Battlefield();
  }
  
  nextLevel() {
    return new Circus();
  }


  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Main Stage
    this.blocks = this.blocks.concat(new Cube()); // Top Platform
    this.blocks = this.blocks.concat(new Cube()); // Left Platform
    this.blocks = this.blocks.concat(new Cube()); // Right Platform
    
    // blocks[0]: Main Stage
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(-6.84, -1, -.7);
    this.blocks[0].matrix.scale(13.68, 1, 1.4);
    
    // blocks[1]: Top Platform
    this.blocks[1].color = this.color2;
    this.blocks[1].matrix.setTranslate(-1.88, 5.34, -.7);
    this.blocks[1].matrix.scale(3.76, .1, 1.4); 
    
    // blocks[2]: Left Platform
    this.blocks[2].color = this.color2;
    this.blocks[2].matrix.setTranslate(-5.76, 2.62, -.7);
    this.blocks[2].matrix.scale(3.76, .1, 1.4);
    
    // blocks[3]: Right Platform
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix.setTranslate(2, 2.62, -.7);
    this.blocks[3].matrix.scale(3.76, .1, 1.4);
    
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setRotate(90,0,1,0);
    this.goal.setMatrices();
  }
    
}