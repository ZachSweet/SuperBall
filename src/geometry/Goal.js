class Goal {
  constructor() {
    this.color = [1,1,1,1];
    this.matrix = new Matrix4();
    this.left = new Cube();
    this.right = new Cube();
    this.tape = new Cube();
  }

  normal(xyz) {
    let stage_normal = new Array();
    stage_normal = stage_normal.concat(this.left.normal(xyz));
    stage_normal = stage_normal.concat(this.right.normal(xyz));
    
    return stage_normal;
  }

  
  render() {
    this.left.render();
    this.right.render();
    this.tape.render();
  }
  
  setMatrices() {
    let leftMatrix = new Matrix4(this.matrix);
    let rightMatrix = new Matrix4(this.matrix);
    let tapeMatrix = new Matrix4(this.matrix);
    
    this.left.color = this.color;
    this.left.matrix = leftMatrix;
    this.left.matrix.translate(-.7, 0, -.1);
    this.left.matrix.scale(.2, 1, .2);
  
    this.right.color = this.color;
    this.right.matrix = rightMatrix;
    this.right.matrix.translate(.5, 0, -.1);
    this.right.matrix.scale(.2, 1, .2);
    
    this.tape.color = [1,1,1,1];
    this.tape.matrix = tapeMatrix;
    this.tape.matrix.translate(-.5, .2, -.05);
    this.tape.matrix.scale(1, .2, .1);
  }
  
  win(xyz) {
    if (this.tape.normal(xyz).magnitude() > 0) { return true; }
    else { return false; }
  }
}