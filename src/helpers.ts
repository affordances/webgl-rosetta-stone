import { ShaderSourceType } from "./types";

export const createProgram = (
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
) => {
  const program = gl.createProgram();
  if (!program) {
    return;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
};

export const createShader = (
  gl: WebGLRenderingContext,
  type: ShaderSourceType,
  source: string
) => {
  if (!gl) {
    return;
  }

  const shader = gl.createShader(type);

  if (!shader) {
    return;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
};

export const degToRad = (d: number) => {
  return (d * Math.PI) / 180;
};

export const resizePixelRatio = (canvas: HTMLCanvasElement) => {
  const devicePixelRatio = window.devicePixelRatio || 1;

  canvas.width = 300 * devicePixelRatio;
  canvas.height = 150 * devicePixelRatio;

  canvas.style.width = 300 + "px";
  canvas.style.height = 150 + "px";
};
