// NIM  : 13519200
// Nama : Muhammad Dehan Al Kautsar
// Tugas Ca-Gaib 2021
// reference : https://github.com/Property404/paint/blob/master/graphics.js

//init
var canvas = document.getElementById('canvas');
var gl = canvas.getContext('webgl', {
     preserveDrawingBuffer: true});

//if webgl cant load the context
if (!gl) {
     console.log('WebGl not supported, falling back on experimental WebGL');
     gl = canvas.getContext('experimental-webgl');
} if (!gl) {
     alert('Your browser does not support WebGL');
}

var program;
var vertexShader;
var fragmentShader;
var vertexShaderText;
var fragmentShaderText;

function initWebGL() {
     gl.viewport(0,0,canvas.width,canvas.height);
     gl.clearColor(0.9,0.9,0.9,1.0);
     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

     //create shaders
     vertexShader = gl.createShader(gl.VERTEX_SHADER);
     fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

     //create text for shaders
     vertexShaderText =
     [
          'precision mediump float;',
          '',
          'attribute vec2 vertPosition;',
          'attribute vec3 vertColor;',
          'varying vec3 fragColor;',
          '',
          'void main()',
          '{',
          '    fragColor = vertColor;',
          '    gl_Position = vec4(vertPosition, 0.0, 1.0);',
          '}'
     ].join('\n');

     fragmentShaderText = 
     [
          'precision mediump float;',
          '',
          'varying vec3 fragColor;',
          'void main()',
          '{',
          '    gl_FragColor = vec4(fragColor, 1.0);',
          '}' 
     ].join('\n');

     gl.shaderSource(vertexShader,vertexShaderText);
     gl.shaderSource(fragmentShader,fragmentShaderText);

     gl.compileShader(vertexShader);
     if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
          return;
     }
     gl.compileShader(fragmentShader);
     if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
          console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
          return;
     }

     program = gl.createProgram();
     gl.attachShader(program, vertexShader);
     gl.attachShader(program, fragmentShader);
     gl.linkProgram(program);
     if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error('ERROR linking program!', gl.getProgramInfoLog(program));
          return;
     }

     gl.validateProgram(program)
     if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
          console.error('ERROR validating program!', gl.getProgramInfoLog(program));
          return;
     } else {
          console.log("all good until validating program");
     }
};

//init webGL
initWebGL();

//create buffer
var vertexBufferObject = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
// gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

//get attribute location
var positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
var colorAttribLocation = gl.getAttribLocation(program, 'vertColor');

// tell WebGL how to read raw data
gl.vertexAttribPointer(
     positionAttribLocation, //Attribute location
     2, // number of elements per attribute
     gl.FLOAT, //type of elements
     gl.FALSE,
     5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
     0// Offset from the beginning of a single vertex to this attribute
);

gl.vertexAttribPointer(
     colorAttribLocation, //Attribute location
     3, // number of elements per attribute
     gl.FLOAT, //type of elements
     gl.FALSE,
     5 * Float32Array.BYTES_PER_ELEMENT,// Size of an individual vertex
     2 * Float32Array.BYTES_PER_ELEMENT// Offset from the beginning of a single vertex to this attribute
);

gl.enableVertexAttribArray(positionAttribLocation);
gl.enableVertexAttribArray(colorAttribLocation);

gl.useProgram(program);