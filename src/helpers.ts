import { exampleDimensions } from "./constants";
import { ShaderSourceType } from "./types";

export const insertEveryNth = <T>(array: Array<T>, n: number, value: T) => {
  return array.reduce((acc: T[], current: T, index: number) => {
    acc.push(current);

    if ((index + 1) % n === 0) {
      acc.push(value);
    }

    return acc;
  }, []);
};

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

  canvas.width = exampleDimensions.width * devicePixelRatio;
  canvas.height = exampleDimensions.height * devicePixelRatio;

  canvas.style.width = exampleDimensions.width + "px";
  canvas.style.height = exampleDimensions.height + "px";
};
