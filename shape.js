// NIM  : 13519200
// Nama : Muhammad Dehan Al Kautsar
// Tugas Ca-Gaib 2021
// https://github.com/Property404/paint/blob/master/shapes.js

// rgb color class
class Color {
     constructor(red, green, blue) {
          this.red = red;
          this.green = green;
          this.blue = blue;
     }
}

// shape superclass
class Shape {
     constructor(x1,y1,x2,y2,color,extraparam=false) {
          this.x1 = x1;
          this.x2 = x2;
          this.y1 = y1;
          this.y2 = y2;
          this.color = color;
          this.theta = false;
          //Assert filled is exactly true or exactly false
          this.filled = (filled === true || filled === false) ? filled : (console.log("NOT A VALID FILLED CONDITION"), false);
     }

     materialized(points /* doesnt include color*/, gl_shape) {
          /*include color*/
          var cvertices = [];
          for (let point of points){
               cvertices.push(point[0],point[1],this.color.red, this.color,green, this.color.blue);
          }

          //magic!
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cvertices), gl.STATIC_DRAW);
          //draw array
          var vertCount = Math.floor(points.length);
          gl.drawArrays(gl_shape,0,vertCount);
     }
}

//line class
class Line extends Shape {
     constructor(x1,y1,x2,y2,color,dummy) {
          super(x1,y1,x2,y2,color,false);
     }
     draw() {
          let x1 = this.x1;
          let x2 = this.x2;
          let y1 = this.y1;
          let y2 = this.y2;
          this.materialized([x1,y1],[x2,y2],gl.LINE_STRIP);
     }
}

//rectangle class
class Rectangle extends Shape {
     constructor(x1,y1,x2,y2,color,dummy) {
          super(x1,y1,x2,y2,color);
     }
     draw() {
          let x1 = this.x1;
          let x2 = this.x2;
          let y1 = this.y1;
          let y2 = this.y2;
          this.materialized([x1,y1],[x1,y2],[x2,y2],[x2,y1],gl.LINE_LOOP);
     }
}