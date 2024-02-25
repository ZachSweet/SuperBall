class Circle extends Shape{
  constructor(segments){
    super();
    this.type='circle';
    this.segments = segments;
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;
    var segments = this.segments;

    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Draw
    var d = this.size*Math.sqrt(2)/400.0; // delta

    var vertices = [ xy[0], xy[1] ] ;
    for (var angle = 0.0; angle < 360+360/segments; angle += 360.0/segments) {
        vertices.push( xy[0] + Math.cos(angle*Math.PI/180.0)*d );
        vertices.push( xy[1] + Math.sin(angle*Math.PI/180.0)*d );
    }

    drawCircle(vertices);
  }
}

function drawCircle(vertices) {
  var n = vertices.length/2; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  gl.drawArrays(gl.TRIANGLE_FAN, 0, n);
}