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
     "shape": Line,
     "focus": -1,
     "color": new Color(1,0,0),
     "drawmode": false,
     "origin_x": 0,
     "origin_y": 0
}

/* clear and redraw */
function redrawCanvas() {
     gl.clearColor(0.95,0.95,0.95,1);
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
     for (let shape of shapes){
          shape.draw();
          // console.log(shapes.length);
     }
     // console.log("draw!");
}

/* get mouse records */
function recordMouse(e) {
     mouseX = (e.offsetX / canvas.clientWidth) * 2-1;
     mouseY = (1 - (e.offsetY / canvas.clientHeight)) * 2-1;
     // console.log(mouseX + " " + mouseY);
}

redrawCanvas();

current.color = hexToRgb(document.getElementById("color").value);
setShape(document.getElementById("shape").value);

/* look for clicks */
canvas.addEventListener('click', function(e) {
     //change color first before draw a shapes
     current.color = hexToRgb(document.getElementById("color").value);
     if(current.drawmode) {
          current.drawmode = false;
          shapes.push(new current.shape(current.origin_x, current.origin_y, mouseX, mouseY, current.color));
          redrawCanvas();
     }
     else {
          recordMouse(e);
          current.origin_x = mouseX;
          current.origin_y = mouseY;
          current.drawmode = true;
          // console.log("clicked");
     }
     current.focus = shapes.length - 1;
});

// Pen thingy
// var maxNumVertices = 20000;
// var index = 0;
// var delay = 50;
// // var cindex = 0; color
// var t;
// var numPolygons = 0;
// var numIndices = [];
// numIndices[0] = 0;
// var start = [0];
// var penClicked = false;
// if (current.shape == "Pen") {
//      canvas.addEventListener("mousedown", function(e) {
//           penClicked = true;
//           numPolygons++;
//           numIndices[numPolygons] = 0;
//           start[numPolygons] = index;
//      });

//      canvas.addEventListener("mouseup", function(e){
//           penClicked = false;
//      });

//      canvas.addEventListener("mousemove", function(e){
//           if (penClicked) {
//                t = vec2()
//           }
//      }); 
// };

/* Cancel upon right click */
canvas.addEventListener("contextmenu", function(e) {
     if (current.drawmode) {
          e.preventDefault();
          // triangle_mode = false;
          current.drawmode = false;
          redrawCanvas();
     }
 });

 /* look for moves if drawing then redraw */
 canvas.addEventListener("mousemove",function(e) {
     if (current.drawmode) {
          recordMouse(e);
          redrawCanvas();
          (new current.shape(current.origin_x,current.origin_y,mouseX,mouseY,current.color,[mouseX,mouseY])).draw();
     }
 });

 /* Toolbox code */
function hexToRgb(hex) {
     var c;
     if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
          c = hex.substring(1).split('');
          if (c.length == 3) {
               c = [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c = '0x' + c.join('');
          return new Color(((c >> 16) & 255) / 255.0, ((c >> 8) & 255) / 255.0, (c & 255) / 255.0)
     }
     throw new Error('Bad Hex');
}

// Upon an unrecognized shape, draw a line for some reason
function setShape(shape) {
     current.shape = shape == "Line" ? Line :
          shape == "Square" ? Square :
          shape == "Rectangle" ? Rectangle :
          shape == "Pen" ? Pen :
          (console.log("NO SUCH SHAPE"), Line);
}
document.getElementById("shape").addEventListener("click", function(e) {
     shape = document.getElementById("shape").value
     // shape == "basic" ?
     //     document.getElementById("sides").removeAttribute("hidden") :
     //     document.getElementById("sides").setAttribute("hidden", true);
     setShape(shape);
});
// Pop last shape
document.getElementById("delLast").addEventListener("click", function(e) {
     shapes.pop();
     current.focus = shapes.length - 1
     current.draw_mode = false
     redrawCanvas();
});

// document.getElementById("delPen").addEventListener("click", function(e) {
//      index = 0;
//      numPolygons = 0;
//      numIndices = [];
//      numIndices[0] = 0;
//      start = [0];
// });