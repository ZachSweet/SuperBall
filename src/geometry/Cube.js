class Cube extends Shape {
  constructor(bg=false) {
    super();
    this.type='cube';
    this.matrix = new Matrix4();
    this.textureNum = -1;
    if (bg) {
      this.textureNum = 1;
      this.vertices= new Float32Array(
                    [0,0,0,0,0,0,0,0,0,0,0,-1, 0,1,0,0,0,0,0,0,1,0,0,-1, 1,1,0,0,0,0,0,1,1,0,0,-1,  // Front
                     0,0,0,0,0,0,0,0,0,0,0,-1, 1,1,0,0,0,0,0,1,1,0,0,-1, 1,0,0,0,0,0,0,1,0,0,0,-1,
                     0,1,0,0,0,0,0,0,0,0,1,0,  0,1,1,0,0,0,0,0,1,0,1,0,  1,1,1,0,0,0,0,1,1,0,1,0,   // Top
                     0,1,0,0,0,0,0,0,0,0,1,0,  1,1,1,0,0,0,0,1,1,0,1,0,  1,1,0,0,0,0,0,1,0,0,1,0,
                     1,0,1,0,0,0,0,0,0,0,0,1,  1,1,1,0,0,0,0,0,1,0,0,1,  0,1,1,0,0,0,0,1,1,0,0,1,   // Back
                     1,0,1,0,0,0,0,0,0,0,0,1,  0,1,1,0,0,0,0,1,1,0,0,1,  0,0,1,0,0,0,0,1,0,0,0,1, 
                     0,0,1,0,0,0,0,0,0,0,-1,0, 0,0,0,0,0,0,0,0,1,0,-1,0, 1,0,0,0,0,0,0,1,1,0,-1,0,  // Bottom
                     0,0,1,0,0,0,0,0,0,0,-1,0, 1,0,0,0,0,0,0,1,1,0,-1,0, 1,0,1,0,0,0,0,1,0,0,-1,0,
                     1,0,0,0,0,0,0,0,0,1,0,0,  1,1,0,0,0,0,0,0,1,1,0,0,  1,1,1,0,0,0,0,1,1,1,0,0,   // Right
                     1,0,0,0,0,0,0,0,0,1,0,0,  1,1,1,0,0,0,0,1,1,1,0,0,  1,0,1,0,0,0,0,1,0,1,0,0,
                     0,0,1,0,0,0,0,0,0,-1,0,0, 0,1,1,0,0,0,0,0,1,-1,0,0, 0,1,0,0,0,0,0,1,1,-1,0,0,  // Left
                     0,0,1,0,0,0,0,0,0,-1,0,0, 0,1,0,0,0,0,0,1,1,-1,0,0, 0,0,0,0,0,0,0,1,0,-1,0,0]);
    } else {
      this.textureNum = 0;
      this.vertices = new Float32Array(
                    [0,0,0,0,0,0,0,0,0,0,0,-1, 0,1,0,0,0,0,0,0,0,0,0,-1, 1,1,0,0,0,0,0,0,0,0,0,-1,  // Front
                     0,0,0,0,0,0,0,0,0,0,0,-1, 1,1,0,0,0,0,0,0,0,0,0,-1, 1,0,0,0,0,0,0,0,0,0,0,-1,
                     0,1,0,0,0,0,0,0,0,0,1,0,  0,1,1,0,0,0,0,0,1,0,1,0,  1,1,1,0,0,0,0,1,1,0,1,0,   // Top
                     0,1,0,0,0,0,0,0,0,0,1,0,  1,1,1,0,0,0,0,1,1,0,1,0,  1,1,0,0,0,0,0,1,0,0,1,0,
                     1,0,1,0,0,0,0,0,0,0,0,1,  1,1,1,0,0,0,0,0,0,0,0,1,  0,1,1,0,0,0,0,0,0,0,0,1,   // Back
                     1,0,1,0,0,0,0,0,0,0,0,1,  0,1,1,0,0,0,0,0,0,0,0,1,  0,0,1,0,0,0,0,0,0,0,0,1, 
                     0,0,1,0,0,0,0,0,0,0,-1,0, 0,0,0,0,0,0,0,0,1,0,-1,0, 1,0,0,0,0,0,0,1,1,0,-1,0,  // Bottom
                     0,0,1,0,0,0,0,0,0,0,-1,0, 1,0,0,0,0,0,0,1,1,0,-1,0, 1,0,1,0,0,0,0,1,0,0,-1,0,
                     1,0,0,0,0,0,0,0,0,1,0,0,  1,1,0,0,0,0,0,0,0,1,0,0,  1,1,1,0,0,0,0,0,0,1,0,0,   // Right
                     1,0,0,0,0,0,0,0,0,1,0,0,  1,1,1,0,0,0,0,0,0,1,0,0,  1,0,1,0,0,0,0,0,0,1,0,0,
                     0,0,1,0,0,0,0,0,0,-1,0,0, 0,1,1,0,0,0,0,0,0,-1,0,0, 0,1,0,0,0,0,0,0,0,-1,0,0,  // Left
                     0,0,1,0,0,0,0,0,0,-1,0,0, 0,1,0,0,0,0,0,0,0,-1,0,0, 0,0,0,0,0,0,0,0,0,-1,0,0]);
    }
                     
    this.velocity = new Vector3([0,0,0]);
  }

  normal(xyz, buffer=0) {
    let inv = new Matrix4();
    inv.setInverseOf(this.matrix);
    let pos = inv.multiplyVector3(xyz);
    let x = Math.max(0+buffer, Math.min(pos.elements[0], 1-buffer));
    let y = Math.max(0+buffer, Math.min(pos.elements[1], 1-buffer));
    let z = Math.max(0+buffer, Math.min(pos.elements[2], 1-buffer));
    let vec = this.matrix.multiplyVector3(new Vector3([x,y,z]));
    x = vec.elements[0]; y = vec.elements[1]; z = vec.elements[2];
    let distance = Math.sqrt((x-xyz.elements[0])*(x-xyz.elements[0]) +
                           (y-xyz.elements[1])*(y-xyz.elements[1]) +
                           (z-xyz.elements[2])*(z-xyz.elements[2]));
                           
    if (distance == 0) { return this.normal(xyz, buffer=buffer+0.01); }
    else if (distance <= 0.3) {
      return new Vector3([x-xyz.elements[0],y-xyz.elements[1],z-xyz.elements[2]]);
    }
    else { return new Vector3([0,0,0]); }
  }

  render_slow() {
    var rgba = this.color;
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    gl.uniformli(u_whichTexture, this.bg);

    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Front of Cube
    drawTriangle3D( [0,0,0, 1,1,0, 1,0,0 ] );
    drawTriangle3D( [0,0,0, 0,1,0, 1,1,0 ] );

    // Top of Cube
    gl.uniform4f(u_FragColor, rgba[0]*.9, rgba[1]*.9, rgba[2]*.9, rgba[3]);
    drawTriangle3D( [0,1,0, 0,1,1, 1,1,1 ] );
    drawTriangle3D( [0,1,0, 1,1,1, 1,1,0 ] );

    // Back of Cube
    gl.uniform4f(u_FragColor, rgba[0]*.5, rgba[1]*.5, rgba[2]*.5, rgba[3]);
    drawTriangle3D( [0,1,1, 1,0,1, 1,1,1 ] );
    drawTriangle3D( [0,1,1, 0,0,1, 1,0,1 ] );

    // Bottom of Cube
    gl.uniform4f(u_FragColor, rgba[0]*.6, rgba[1]*.6, rgba[2]*.6, rgba[3]);
    drawTriangle3D( [0,0,1, 0,0,0, 1,0,0 ] );
    drawTriangle3D( [0,0,1, 1,0,0, 1,0,1 ] );

    // Right Side of Cube
    gl.uniform4f(u_FragColor, rgba[0]*.8, rgba[1]*.8, rgba[2]*.8, rgba[3]);
    drawTriangle3D( [1,0,0, 1,1,0, 1,1,1 ] );
    drawTriangle3D( [1,0,0, 1,1,1, 1,0,1 ] );

    // Left Side of Cube
    gl.uniform4f(u_FragColor, rgba[0]*.7, rgba[1]*.7, rgba[2]*.7, rgba[3]);
    drawTriangle3D( [0,0,1, 0,1,1, 0,1,0 ] );
    drawTriangle3D( [0,0,1, 0,1,0, 0,0,0 ] );
    
    
  }
  
  render() {
    var rgba = this.color;
    gl.uniform1i(u_whichTexture, this.textureNum);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
    let normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(this.matrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
    
    var send = this.vertices;
    for (var i = 0; i < 36; i++) {
      var x = 12*i+3;
      send[x] = rgba[0];
      send[x+1] = rgba[1];
      send[x+2] = rgba[2];
      send[x+3] = rgba[3];
      
    }
    
    drawTriangle3D(send);
  }
}