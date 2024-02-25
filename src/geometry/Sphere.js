class Sphere extends Shape {
  constructor(size, color=[1,1,1,1]) {
    super();
    this.type='sphere';
    this.matrix = new Matrix4();
    this.color = color;
    let cartesian_points = this.generatePoints(size);
    this.vertices = this.generateVertices(cartesian_points, size);
  }
  
  render() {
    gl.uniform1i(u_whichTexture, -1);
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);
    
    let normalMatrix = new Matrix4();
    normalMatrix.setInverseOf(this.matrix);
    normalMatrix.transpose();
    gl.uniformMatrix4fv(u_NormalMatrix, false, normalMatrix.elements);
    
    drawTriangle3D(this.vertices);
  }
  
  generatePoints(size) {
    let cartesian_points = new Array(size);
    
    for (let i = 0; i <= size; i++) {
      let lat = Math.PI * i / size;
      cartesian_points[i] = new Array(size);
      
      for (let j = 0; j <= size; j++) {
        let long = 2*Math.PI * j / size;
        cartesian_points[i][j] = this.sph2car(lat, long);
      }
    }
    
    return cartesian_points;
  }
  
  sph2car(lat, long) {
    let x = Math.sin(lat) * Math.cos(long) ;
    let y = Math.sin(lat) * Math.sin(long) ;
    let z = Math.cos(lat);
    
    return [x,y,z];
  }
  
  generateVertices(points, size) {
    let rgba = this.color;
    let white = [1,1,1,1];
    
    let vertices = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let half = rgba;
        if (j >=size/2) { half = white; }
        vertices = vertices.concat(points[i][j]); // Position
        vertices = vertices.concat(half);         // Color
        vertices = vertices.concat([0.0,0.0]);    // UV
        vertices = vertices.concat(points[i][j]); // Normal
  
        vertices = vertices.concat(points[i][j+1]);
        vertices = vertices.concat(half);
        vertices = vertices.concat([0.0,0.0]);
        vertices = vertices.concat(points[i][j+1]);
  
        vertices = vertices.concat(points[i+1][j]);
        vertices = vertices.concat(half);
        vertices = vertices.concat([0.0,0.0]);
        vertices = vertices.concat(points[i+1][j]);
  
  
        vertices = vertices.concat(points[i][j+1]);
        vertices = vertices.concat(half);
        vertices = vertices.concat([0.0,0.0]);
        vertices = vertices.concat(points[i][j+1]);
  
        vertices = vertices.concat(points[i+1][j+1]);
        vertices = vertices.concat(half);
        vertices = vertices.concat([0.0,0.0]);
        vertices = vertices.concat(points[i+1][j+1]);
  
        vertices = vertices.concat(points[i+1][j]);
        vertices = vertices.concat(half);
        vertices = vertices.concat([0.0,0.0]);
        vertices = vertices.concat(points[i+1][j]);
      }
    }
    
    return new Float32Array(vertices);
  }
}