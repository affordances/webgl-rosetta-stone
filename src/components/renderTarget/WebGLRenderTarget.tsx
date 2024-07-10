import { useEffect, useRef } from "react";
import { m4 } from "twgl.js";

import {
  createProgram,
  createShader,
  degToRad,
  resizePixelRatio,
} from "../../helpers";
import { fragmentShaderSource, vertexShaderSource } from "./constants";

// Fill the buffer with the values that define a cube.
const setGeometry = (gl: WebGLRenderingContext) => {
  const positions = new Float32Array([
    -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5,
    0.5, -0.5, 0.5, -0.5, -0.5,

    -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5, -0.5,
    0.5, 0.5, 0.5, 0.5,

    -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5,
    0.5, 0.5, 0.5, -0.5,

    -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5, -0.5, 0.5,

    -0.5, -0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5, 0.5, -0.5,

    0.5, -0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5,
    -0.5, 0.5, 0.5, 0.5,
  ]);

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
};

// Fill the buffer with texture coordinates the cube.
const setTexcoords = (gl: WebGLRenderingContext) => {
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([
      0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

      0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,

      0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

      0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,

      0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0,

      0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1,
    ]),
    gl.STATIC_DRAW
  );
};

const drawCube = ({
  aspect,
  fieldOfViewRadians,
  gl,
  matrixLocation,
  modelXRotationRadians,
  modelYRotationRadians,
  positionBuffer,
  positionLocation,
  program,
  texcoordBuffer,
  texcoordLocation,
  textureLocation,
}: {
  aspect: number;
  fieldOfViewRadians: number;
  gl: WebGLRenderingContext;
  matrixLocation: WebGLUniformLocation;
  modelXRotationRadians: number;
  modelYRotationRadians: number;
  positionBuffer: WebGLBuffer;
  positionLocation: number;
  program: WebGLProgram;
  texcoordBuffer: WebGLBuffer;
  texcoordLocation: number;
  textureLocation: WebGLUniformLocation;
}) => {
  // Tell it to use our program (pair of shaders)
  gl.useProgram(program);

  // Turn on the position attribute
  gl.enableVertexAttribArray(positionLocation);

  // Bind the position buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
  const posSize = 3; // 3 components per iteration
  const posType = gl.FLOAT; // the data is 32bit floats
  const posNormalize = false; // don't normalize the data
  const posStride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const posOffset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    positionLocation,
    posSize,
    posType,
    posNormalize,
    posStride,
    posOffset
  );

  // Turn on the texcoord attribute
  gl.enableVertexAttribArray(texcoordLocation);

  // bind the texcoord buffer.
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);

  // Tell the texcoord attribute how to get data out of texcoordBuffer (ARRAY_BUFFER)
  const texSize = 2; // 2 components per iteration
  const texType = gl.FLOAT; // the data is 32bit floats
  const texNormalize = false; // don't normalize the data
  const texStride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
  const texOffset = 0; // start at the beginning of the buffer
  gl.vertexAttribPointer(
    texcoordLocation,
    texSize,
    texType,
    texNormalize,
    texStride,
    texOffset
  );

  // Compute the projection matrix
  const projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);

  const cameraPosition = [0, 0, 2];
  const up = [0, 1, 0];
  const target = [0, 0, 0];

  // Compute the camera's matrix using look at.
  const cameraMatrix = m4.lookAt(cameraPosition, target, up);

  // Make a view matrix from the camera matrix.
  const viewMatrix = m4.inverse(cameraMatrix);

  const viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);

  let matrix = m4.rotateX(viewProjectionMatrix, modelXRotationRadians);
  matrix = m4.rotateY(matrix, modelYRotationRadians);

  // Set the matrix.
  gl.uniformMatrix4fv(matrixLocation, false, matrix);

  // Tell the shader to use texture unit 0 for u_texture
  gl.uniform1i(textureLocation, 0);

  // Draw the geometry.
  gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
};

const WebGLMain = (canvas: HTMLCanvasElement) => {
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

  // setup GLSL program
  const program = createProgram(gl, vertexShader, fragmentShader);

  if (!program) {
    return;
  }

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texcoord");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");
  const textureLocation = gl.getUniformLocation(program, "u_texture");

  // Create a buffer for positions
  const positionBuffer = gl.createBuffer();
  // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  // Put the positions in the buffer
  setGeometry(gl);

  // provide texture coordinates for the rectangle.
  const texcoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, texcoordBuffer);
  // Set Texcoords.
  setTexcoords(gl);

  // Create a texture.
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  {
    // fill texture with 3x2 pixels
    const level = 0;
    const internalFormat = gl.LUMINANCE;
    const width = 3;
    const height = 2;
    const border = 0;
    const format = gl.LUMINANCE;
    const type = gl.UNSIGNED_BYTE;
    const data = new Uint8Array([128, 64, 128, 0, 192, 0]);
    const alignment = 1;

    gl.pixelStorei(gl.UNPACK_ALIGNMENT, alignment);

    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      width,
      height,
      border,
      format,
      type,
      data
    );

    // set the filtering so we don't need mips and it's not filtered
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  // Create a texture to render to
  const targetTextureWidth = 256;
  const targetTextureHeight = 256;
  const targetTexture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, targetTexture);

  {
    // define size and format of level 0
    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const format = gl.RGBA;
    const type = gl.UNSIGNED_BYTE;
    const data = null;

    gl.texImage2D(
      gl.TEXTURE_2D,
      level,
      internalFormat,
      targetTextureWidth,
      targetTextureHeight,
      border,
      format,
      type,
      data
    );

    // set the filtering so we don't need mips
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }

  // Create and bind the framebuffer
  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

  // attach the texture as the first color attachment
  const attachmentPoint = gl.COLOR_ATTACHMENT0;
  const level = 0;
  gl.framebufferTexture2D(
    gl.FRAMEBUFFER,
    attachmentPoint,
    gl.TEXTURE_2D,
    targetTexture,
    level
  );

  const fieldOfViewRadians = degToRad(60);
  let modelXRotationRadians = degToRad(0);
  let modelYRotationRadians = degToRad(0);

  // Get the starting time.
  let then = 0;

  requestAnimationFrame(drawScene);

  // Draw the scene.
  function drawScene(time: number) {
    // convert to seconds
    time *= 0.001;
    // Subtract the previous time from the current time
    const deltaTime = time - then;
    // Remember the current time for the next frame.
    then = time;

    // Animate the rotation
    modelYRotationRadians += -0.7 * deltaTime;
    modelXRotationRadians += -0.4 * deltaTime;

    if (!gl) {
      return;
    }

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    {
      // render to our targetTexture by binding the framebuffer
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

      // render cube with our 3x2 texture
      gl.bindTexture(gl.TEXTURE_2D, texture);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, targetTextureWidth, targetTextureHeight);

      // Clear the attachment(s).
      gl.clearColor(0, 0, 1, 1); // clear to blue
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      const aspect = targetTextureWidth / targetTextureHeight;

      if (
        !matrixLocation ||
        !positionBuffer ||
        !program ||
        !texcoordBuffer ||
        !textureLocation
      ) {
        return;
      }

      drawCube({
        aspect,
        fieldOfViewRadians,
        gl,
        matrixLocation,
        modelXRotationRadians,
        modelYRotationRadians,
        positionBuffer,
        positionLocation,
        program,
        texcoordBuffer,
        texcoordLocation,
        textureLocation,
      });
    }

    {
      // render to the canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);

      // render the cube with the texture we just rendered to
      gl.bindTexture(gl.TEXTURE_2D, targetTexture);

      // Tell WebGL how to convert from clip space to pixels
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      // Clear the canvas AND the depth buffer.
      gl.clearColor(1, 1, 1, 1); // clear to white
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      let aspect;

      if ("clientWidth" in gl.canvas && "clientHeight" in gl.canvas) {
        aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
      } else {
        return;
      }

      drawCube({
        aspect,
        fieldOfViewRadians,
        gl,
        matrixLocation,
        modelXRotationRadians,
        modelYRotationRadians,
        positionBuffer,
        positionLocation,
        program,
        texcoordBuffer,
        texcoordLocation,
        textureLocation,
      });
    }

    requestAnimationFrame(drawScene);
  }
};

export const WebGLRenderTargetExample = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (ref.current) {
      WebGLMain(ref.current);
    }
  });

  return <canvas ref={ref}></canvas>;
};
