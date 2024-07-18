import { useEffect, useRef } from "react";

import {
  createProgram,
  createShader,
  getMatrix,
  resizePixelRatio,
} from "../../../helpers";
import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { ControlsState } from "./useControls";

export const WebGLMain = (canvas: HTMLCanvasElement, props: ControlsState) => {
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
  const positionAttributeLocation = gl.getAttribLocation(program, "position");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, "matrix");

  // Create a buffer.
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Set Geometry.
  // Fill the buffer with the values that define a triangle.
  // Note, will put the values in whatever buffer is currently
  // bound to the ARRAY_BUFFER bind point
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(vertices.webGlVertices),
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

  // Compute the matrix
  let matrix;

  if ("clientWidth" in gl.canvas && "clientHeight" in gl.canvas) {
    matrix = getMatrix({
      width: gl.canvas.clientWidth,
      height: gl.canvas.clientHeight,
      ...props,
    });
  } else {
    return;
  }

  // Set the matrix.
  gl.uniformMatrix3fv(matrixLocation, false, matrix);

  // Draw the geometry.
  const primitiveType = gl.TRIANGLES;
  const count = 3;
  console.count("webgl");
  gl.drawArrays(primitiveType, offset, count);
};

export const WebGLVaryingTriangleExample = (props: ControlsState) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      WebGLMain(ref.current, props);
    }
  });

  return <canvas ref={ref}></canvas>;
};
