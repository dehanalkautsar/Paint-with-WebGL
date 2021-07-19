// NIM  : 13519200
// Nama : Muhammad Dehan Al Kautsar
// Tugas Ca-Gaib 2021
// reference : https://github.com/Property404/paint/blob/master/paint.js

/* WebGL mouse coordinate (not physical coor)*/
var mouseX = 0;
var mouseY = 0;

/* array of DRAWN shapes */
var shapes = [];

/* current states */
var current = {
     "shape": Pen,
     "focus": -1,
     "color": new Color(1,0,0),
     "drawmode": false,
     "origin_x": 0,
     "origin_y": 0
}

/* clear and redraw */
function redrawCanvas() {
     gl.clearColor(0.0,0.0,0.0,1.0);
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
     for (let shape of shapes){
          shape.draw();
     }
}

/* get mouse records */