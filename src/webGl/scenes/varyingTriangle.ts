import * as THREE from "three";
import { createProgram, createShader } from "@webGl/helpers";
import { createSlider } from "@/components/Slider";
import { exampleDimensions } from "@/constants";

const varyingTriangle = (
  gl: WebGLRenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
) => {
  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = createShader(
    gl,
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );

  if (!vertexShader || !fragmentShader) return;

  const program = createProgram(gl, vertexShader, fragmentShader);
  if (!program) return;

  const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  setGeometry(gl);

  let translation = [200, 150];
  let angleInRadians = 0;
  let scale = [1, 1];

  const container = document.getElementById("scene-container");
  if (!container) return;

  const uiContainer = document.createElement("div");
  uiContainer.id = "ui-container";
  container.appendChild(uiContainer);

  createSlider(uiContainer, "X", {
    value: translation[0],
    slide: updatePosition(0),
    max: exampleDimensions.width,
  });
  createSlider(uiContainer, "Y", {
    value: translation[1],
    slide: updatePosition(1),
    max: exampleDimensions.height,
  });
  createSlider(uiContainer, "Angle", { slide: updateAngle, max: 360 });
  createSlider(uiContainer, "Scale X", {
    value: scale[0],
    slide: updateScale(0),
    min: -5,
    max: 5,
    step: 0.01,
  });
  createSlider(uiContainer, "Scale Y", {
    value: scale[1],
    slide: updateScale(1),
    min: -5,
    max: 5,
    step: 0.01,
  });

  function updatePosition(index: number) {
    return (value: number) => {
      translation[index] = value;
      drawScene();
    };
  }

  function updateAngle(value: number) {
    angleInRadians = (value * Math.PI) / 180;
    drawScene();
  }

  function updateScale(index: number) {
    return (value: number) => {
      scale[index] = value;
      drawScene();
    };
  }

  function drawScene() {
    // Resize the canvas to match the display size
    // gl.canvas.width = gl.canvas.clientWidth;
    // gl.canvas.height = gl.canvas.clientHeight;

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (!program) {
      return;
    }

    // Tell WebGL to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    const size = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.vertexAttribPointer(
      positionAttributeLocation,
      size,
      type,
      normalize,
      stride,
      offset
    );

    // Compute the matrices
    // Compute the matrices (adjust as necessary)
    const projectionMatrix = new THREE.Matrix3().set(
      2 / gl.canvas.width,
      0,
      0,
      0,
      -2 / gl.canvas.height,
      0,
      -1,
      1,
      1
    );
    const translationMatrix = new THREE.Matrix3().set(
      1,
      0,
      0,
      0,
      1,
      0,
      translation[0],
      translation[1],
      1
    );
    const rotationMatrix = new THREE.Matrix3().set(
      Math.cos(angleInRadians),
      -Math.sin(angleInRadians),
      0,
      Math.sin(angleInRadians),
      Math.cos(angleInRadians),
      0,
      0,
      0,
      1
    );
    const scalingMatrix = new THREE.Matrix3().set(
      scale[0],
      0,
      0,
      0,
      scale[1],
      0,
      0,
      0,
      1
    );

    // Combine the matrices in the correct order
    const combinedMatrix = new THREE.Matrix3();
    combinedMatrix.multiplyMatrices(projectionMatrix, translationMatrix);
    combinedMatrix.multiply(rotationMatrix);
    combinedMatrix.multiply(scalingMatrix);

    // Create a Float32Array to store the matrix data
    const matrixArray = new Float32Array(9); // 3x3 matrix has 9 elements
    combinedMatrix.toArray(matrixArray);

    // Set the matrix uniform
    gl.uniformMatrix3fv(matrixLocation, false, matrixArray);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function setGeometry(gl: WebGLRenderingContext) {
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([0, -100, 150, 125, -175, 100]),
      gl.STATIC_DRAW
    );
  }

  drawScene(); // Initial draw
};

export default varyingTriangle;
