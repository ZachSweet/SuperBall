class Level {
  constructor() {
    this.lastLevel = false;
    
    //this.floorTex
    
    this.ballPos = new Vector3([0,0,0]);
    this.blastZone = -10;
    this.v_n = new Array();
    this.v_f = new Vector3();
    
    this.ball ;
    this.blocks = new Array();
    this.bumpers = new Array();
    this.goal = new Goal();
  }
  
  render() {
    //console.log(this.ballPos.elements);
    gl.uniform3fv(u_ballPos, this.ballPos.elements);
    
    this.ball.render();
    this.goal.render();
    
    for (let block of this.blocks) {
      block.render();
    }
    for (let bumper of this.bumpers) {
      bumper.render();
    }
  }
  
  normal() {
    this.v_n = new Array();
    this.v_f = new Vector3([0,0,0]);
    
    let stage_normal = new Array();
    
    for (let block of this.blocks) {
      let N_b = block.normal(this.ballPos);
      stage_normal = stage_normal.concat(N_b);
      let v_n = new Vector3(N_b.elements);
      v_n.normalize();
      v_n = v_n.mul(Vector3.dot(v_n, block.velocity));
      this.v_n = this.v_n.concat(v_n);
      if (N_b.magnitude() > 0) {
        let v_f = new Vector3(block.velocity.elements);
        v_f.sub(v_n);
        this.v_f.add(v_f);
      }
    }
    for (let bumper of this.bumpers) {
      let bump = bumper.normal(this.ballPos);
      stage_normal = stage_normal.concat(bump);
      stage_normal = stage_normal.concat(bump);
      let v_n = new Vector3(bump.elements);
      v_n.normalize();
      v_n = v_n.mul(Vector3.dot(v_n, bumper.velocity));
      let v_f = new Vector3(bumper.velocity.elements);
      v_f.sub(v_n);
      this.v_n = this.v_n.concat(v_n);
      this.v_n = this.v_n.concat(v_n);
      if (bump.magnitude() > 0) {
        let v_f = new Vector3(bumper.velocity.elements);
        v_f.sub(v_n);
        this.v_f.add(v_f);
        this.v_f.add(v_f);
      }
    }
    stage_normal = stage_normal.concat(this.goal.normal(this.ballPos));
    this.v_n = this.v_n.concat(new Vector3([0,0,0]));
    this.v_n = this.v_n.concat(new Vector3([0,0,0]));
    
    return stage_normal;
  }
  
  win() {
    return this.goal.win(this.ballPos);
  }
  
  lose() {
    if (this.ballPos.elements[1] < this.blastZone) { return true; }
    else { return false; }
  }
}