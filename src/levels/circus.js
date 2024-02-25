class Circus extends Level {
  constructor() {
    super();
    this.num = 7;
    this.name = "CIRCUS" ;
    this.color = [.078, .380, .078];
    this.color2 = [0,.470,0];
    this.bumperColor = [0, .235, .470];
    this.goalColor = [.470, 0, .470];
    this.song = 'data/sounds/songs/rock.mp3';
    
    this.ballPos = new Vector3([.5,1,1]);
    this.lightPos = new Vector3([.7,8.504,2]);
    this.cameraPos = new Vector3([-3,1.6,1]);
    this.spinCntr = new Vector3([10,7.5,10]) ;
    this.spinRad = 10;
    this.spinHeight = 10;
    this.blastZone = -10;
    //this.timeLimit
    
    
    this.load();
  }
  
  resetLevel() {
    return new Circus();
  }
  
  nextLevel() {
    return new Spiral();
  }
  

  setMatrices(time, spin) {
    this.ball.matrix.setTranslate(this.ballPos.elements[0], this.ballPos.elements[1], this.ballPos.elements[2]);
    this.ball.matrix.scale(.3,.3,.3);
    this.ball.matrix.concat(spin);
    
    // blocks[1]: Launch
    this.blocks[1].color = this.bumperColor;
    this.blocks[1].textureNum = -1;
    this.blocks[1].matrix.setTranslate(2, -1.995, 0.005);
    if (time%3000 < 10) {
      this.blocks[1].matrix.scale(1.995, 2+.3*(time%3000)/10, 1.99);
      this.blocks[1].velocity = new Vector3([0, 600, 0]);
    } else if (time%3000 < 2010) {
      this.blocks[1].matrix.scale(1.995, 2.3-.3*(time%3000-10)/2000, 1.99);
      this.blocks[1].velocity = new Vector3([0, -3, 0]);
    } else {
      this.blocks[1].matrix.scale(1.995,2,1.99);
      this.blocks[1].velocity = new Vector3([0,0,0]);
    }
    
    // blocks[6]: Trapeze 1
    this.blocks[6].color = this.color2;
    let t = Math.sqrt(9.8/20)*time/2500;
    let theta = .428*Math.sin(t);
    this.blocks[6].matrix.setTranslate(18.772, 25.6-20*Math.cos(theta), 10+20*Math.sin(theta));
    this.blocks[6].velocity = new Vector3([0,47.936*Math.sin(theta)*Math.cos(t), 47.936*Math.cos(theta)*Math.cos(t)]);
    this.blocks[6].matrix.scale(1.4, .1, 1.4);
    
    // blocks[7]: Trapeze 2
    this.blocks[7].color = this.color2;
    theta = .617*Math.sin(t);
    this.blocks[7].matrix.setTranslate(8.696+15*Math.sin(theta),19.633-15*Math.cos(theta), 18.3);
    this.blocks[7].velocity = new Vector3([51.828*Math.cos(theta)*Math.cos(t), 51.828*Math.sin(theta)*Math.cos(t), 0]);
    this.blocks[7].matrix.scale(1.4, .1, 1.4);
    
    // blocks[8]: Trapeze 3
    this.blocks[8].color = this.color2;
    theta = .863*Math.sin(t);
    this.blocks[8].matrix.setTranslate(0, 13.903-10*Math.cos(theta), 9.3-10*Math.sin(theta));
    this.blocks[8].velocity = new Vector3([0, 48.328*Math.sin(theta)*Math.cos(t), -48.328*Math.cos(theta)*Math.cos(t)]);
    this.blocks[8].matrix.scale(1.4, .1, 1.4);
    
    
  }
    
  
  load() {
    this.ball = new Sphere(20, [1,0,0,1])
    this.blocks = this.blocks.concat(new Cube()); // Start
    this.blocks = this.blocks.concat(new Cube()); // Launch
    this.blocks = this.blocks.concat(new Cube()); // Wall
    this.blocks = this.blocks.concat(new Cube()); // Rope 1
    this.blocks = this.blocks.concat(new Cube()); // Rope 2
    this.blocks = this.blocks.concat(new Cube()); // Platform
    this.blocks = this.blocks.concat(new Cube()); // Trapeze 1
    this.blocks = this.blocks.concat(new Cube()); // Trapeze 2
    this.blocks = this.blocks.concat(new Cube()); // Trapeze 3
    this.blocks = this.blocks.concat(new Cube()); // End
    
    // blocks[0]: Start
    this.blocks[0].color = this.color;
    this.blocks[0].matrix.setTranslate(0,-2,0);
    this.blocks[0].matrix.scale(4, 2, 2);
    
    
    // blocks[2]: Wall
    this.blocks[2].color = this.color;
    this.blocks[2].matrix.setTranslate(4, -2, 0);
    this.blocks[2].matrix.scale(.1, 7, 2);
    
    // blocks[3]: Rope 1
    this.blocks[3].color = this.color2;
    this.blocks[3].matrix.setTranslate(4, 4.9, .75);
    this.blocks[3].matrix.rotate(10, 0,0,1);
    this.blocks[3].matrix.rotate(45, 1,0,0);
    this.blocks[3].matrix.scale(15, .1, -.3);
     
    // blocks[4]: Rope 2
    this.blocks[4].color = this.color2;
    this.blocks[4].matrix.setTranslate(4, 4.9, 1.25);
    this.blocks[4].matrix.rotate(10, 0,0,1);
    this.blocks[4].matrix.rotate(-45, 1,0,0);
    this.blocks[4].matrix.scale(15, .1, .3);
    
    // blocks[5]: Platform
    this.blocks[5].color = this.color;
    this.blocks[5].matrix.setTranslate(18.772, 7.404, .3);
    this.blocks[5].matrix.scale(1.4, .1, 1.4);
    
    // blocks[9]: End
    this.blocks[9].color = this.color;
    this.blocks[9].matrix.setTranslate(0, 7.404, .3);
    this.blocks[9].matrix.scale(1.4, .1, 1.4);
    
    
    this.goal.color = this.goalColor;
    this.goal.matrix.setTranslate(.7, 7.504, 1);
    this.goal.setMatrices();
  }
    
}