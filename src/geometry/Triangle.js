class Triangle extends Shape{
  constructor(){
    super();
    this.type='triangle';
  }

  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the color of a point to u_FragColor variable
    //gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    
    // Draw
    var d = this.size/200.0; // delta
    //drawTriangle( [xy[0]-.759*d, xy[1]-.438*d,
    //               xy[0]+.759*d, xy[1]-.438*d,
    //               xy[0],        xy[1]+.877*d] );
    drawTriangle( [xy[0]-.612*d, xy[1]-.353*d,
                   xy[0]+.632*d, xy[1]-.353*d,
                   xy[0],        xy[1]+.707*d] );
  }
}

g_vertexBuffer=null;
function initTriangle3D() {
  // Create a buffer object
  g_vertexBuffer = gl.createBuffer();
  if (!g_vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 48, 0);
  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 48, 12);
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 48, 28);
  gl.vertexAttribPointer(a_Normal, 3, gl.FLOAT, false, 48, 36);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  gl.enableVertexAttribArray(a_Color);
  gl.enableVertexAttribArray(a_UV);
  gl.enableVertexAttribArray(a_Normal);
}

function drawTriangle(vertices) {
  var n = 3; // The number of vertices

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

  gl.drawArrays(gl.TRIANGLES, 0, n);
}


function drawTriangle3D(vertices) {
  var n = vertices.length/12; // The number of vertices

  if (g_vertexBuffer == null) {
    initTriangle3D();
  }
  
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.DYNAMIC_DRAW);

  gl.drawArrays(gl.TRIANGLES, 0, n);
}
