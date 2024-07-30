import * as THREE from "three";

import { sceneSetup } from "@/constants";
import { createProgram, createShader } from "@webGl/helpers";

const varyingTriangle = (
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  // create GLSL shaders, upload the GLSL source, compile the shaders
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  if (!vertexShader || !fragmentShader) {
    return;
  }

  // Link the two shaders into a program
  let program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) {
    return;
  }

  // look up where the vertex data needs to go.
  var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // lookup uniforms
  var matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer.
  var positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Set Geometry.
  setGeometry(gl);

  var translation = [200, 150];
  var angleInRadians = 0;
  var scale = [1, 1];

  drawScene();

  // Setup a ui.
  //   webglLessonsUI.setupSlider("#x", {
  //     value: translation[0],
  //     slide: updatePosition(0),
  //     max: gl.canvas.width,
  //   });
  //   webglLessonsUI.setupSlider("#y", {
  //     value: translation[1],
  //     slide: updatePosition(1),
  //     max: gl.canvas.height,
  //   });
  //   webglLessonsUI.setupSlider("#angle", { slide: updateAngle, max: 360 });
  //   webglLessonsUI.setupSlider("#scaleX", {
  //     value: scale[0],
  //     slide: updateScale(0),
  //     min: -5,
  //     max: 5,
  //     step: 0.01,
  //     precision: 2,
  //   });
  //   webglLessonsUI.setupSlider("#scaleY", {
  //     value: scale[1],
  //     slide: updateScale(1),
  //     min: -5,
  //     max: 5,
  //     step: 0.01,
  //     precision: 2,
  //   });

  //   function updatePosition(index: number) {
  //     return function (event, ui) {
  //       translation[index] = ui.value;
  //       drawScene();
  //     };
  //   }

  //   function updateAngle(event, ui) {
  //     var angleInDegrees = 360 - ui.value;
  //     angleInRadians = (angleInDegrees * Math.PI) / 180;
  //     drawScene();
  //   }

  //   function updateScale(index) {
  //     return function (event, ui) {
  //       scale[index] = ui.value;
  //       drawScene();
  //     };
  //   }

  // Draw the scene.
  function drawScene() {
    // webglUtils.resizeCanvasToDisplaySize(gl.canvas);

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT);

    if (!program) {
      return;
    }

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 2; // 2 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Compute the matrix using THREE.Matrix4
    var projectionMatrix = new THREE.Matrix4().makeOrthographic(
      0,
      gl.canvas.width,
      gl.canvas.height,
      0,
      -1,
      1
    );

    var translationMatrix = new THREE.Matrix4().makeTranslation(
      translation[0],
      translation[1],
      0
    );

    var rotationMatrix = new THREE.Matrix4().makeRotationZ(angleInRadians);

    var scalingMatrix = new THREE.Matrix4().makeScale(scale[0], scale[1], 1);

    // Combine matrices in the order: projection * translation * rotation * scaling
    var combinedMatrix = new THREE.Matrix4();
    combinedMatrix.multiplyMatrices(projectionMatrix, translationMatrix);
    combinedMatrix.multiply(rotationMatrix);
    combinedMatrix.multiply(scalingMatrix);

    // Convert the Matrix4 to a 3x3 Float32Array
    var matrix3 = new THREE.Matrix3().setFromMatrix4(combinedMatrix);
    var matrixArray = matrix3.toArray();

    console.log(matrixArray);

    // Set the matrix uniform
    gl.uniformMatrix3fv(matrixLocation, false, matrixArray);

    // Compute the matrix
    // var matrix = m3.projection(gl.canvas.width, gl.canvas.height);
    // matrix = m3.translate(matrix, translation[0], translation[1]);
    // matrix = m3.rotate(matrix, angleInRadians);
    // matrix = m3.scale(matrix, scale[0], scale[1]);

    // Set the matrix.
    // gl.uniformMatrix3fv(matrixLocation, false, matrix);

    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 3;
    gl.drawArrays(primitiveType, offset, count);
  }
};

// Fill the buffer with the values that define a triangle.
// Note, will put the values in whatever buffer is currently
// bound to the ARRAY_BUFFER bind point
function setGeometry(gl: WebGLRenderingContext) {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, -100, 150, 125, -175, 100]),
    gl.STATIC_DRAW
  );
}

export default varyingTriangle;
