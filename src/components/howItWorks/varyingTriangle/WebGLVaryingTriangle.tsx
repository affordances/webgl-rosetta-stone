import { useEffect, useRef } from "react";

import {
  createProgram,
  createShader,
  projection,
  resizePixelRatio,
  rotate,
  scale,
  translate,
} from "../../../helpers";
import { fragmentShaderSource, vertexShaderSource } from "./constants";

export const WebGLMain = (canvas: HTMLCanvasElement) => {
  const gl = canvas.getContext("webgl");

  if (!gl) {
    return;
  }

  resizePixelRatio(canvas);

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
  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) {
    return;
  }

  // look up where the vertex data needs to go.
  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");

  // Create a buffer.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Set Geometry.
  // Fill the buffer with the values that define a triangle.
  // Note, will put the values in whatever buffer is currently
  // bound to the ARRAY_BUFFER bind point
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([0, -100, 150, 125, -175, 100]),
    gl.STATIC_DRAW
  );

  if (!program) {
    return;
  }

  // Tell WebGL how to convert from clip space to pixels
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

  // Clear the canvas.
  gl.clear(gl.COLOR_BUFFER_BIT);

  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the attribute
  gl.enableVertexAttribArray(positionAttributeLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const size = 2; // 2 components per iteration
  const type = gl.FLOAT; // the data is 32bit floats
  const normalize = false; // don't normalize the data
  const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const offset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionAttributeLocation,
    size,
    type,
    normalize,
    stride,
    offset
  );

  const translation = [200, 150];
  const angleInRadians = 0;
  const _scale = [1, 1];

  // Compute the matrix
  let matrix;

  if ("clientWidth" in gl.canvas && "clientHeight" in gl.canvas) {
    matrix = projection(gl.canvas.clientWidth, gl.canvas.clientHeight);
  } else {
    return;
  }

  matrix = translate(matrix, translation[0], translation[1]);
  matrix = rotate(matrix, angleInRadians);
  matrix = scale(matrix, _scale[0], _scale[1]);

  // Set the matrix.
  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  const count = 3;
  gl.drawArrays(primitiveType, offset, count);

  // Setup a ui.
  // webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  // webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
  // webglLessonsUI.setupSlider("#angle", {slide: updateAngle, max: 360});
  // webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
  // webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});

  // function updatePosition(index) {
  //   return function(event, ui) {
  //     translation[index] = ui.value;
  //     drawScene();
  //   };
  // }

  // function updateAngle(event, ui) {
  //   const angleInDegrees = 360 - ui.value;
  //   angleInRadians = angleInDegrees * Math.PI / 180;
  //   drawScene();
  // }

  // function updateScale(index) {
  //   return function(event, ui) {
  //     scale[index] = ui.value;
  //     drawScene();
  //   };
  // }

  // Draw the scene.
};

export const WebGLVaryingTriangleExample = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      WebGLMain(ref.current);
    }
  });

  return <canvas ref={ref}></canvas>;
};
