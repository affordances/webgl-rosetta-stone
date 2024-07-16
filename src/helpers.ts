import { ControlsState } from "./components/howItWorks/varyingTriangle/useControls";
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

export const randomInt = (range: number) => {
  return Math.floor(Math.random() * range);
};

export const projection = (width: number, height: number): Float32Array => {
  return new Float32Array([2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1]);
};

export const translation = (tx: number, ty: number): Float32Array => {
  return new Float32Array([1, 0, 0, 0, 1, 0, tx, ty, 1]);
};

export const multiply = (a: Float32Array, b: Float32Array): Float32Array => {
  const createMatrix3 = (): Float32Array => new Float32Array(9);

  const a00 = a[0 * 3 + 0],
    a01 = a[0 * 3 + 1],
    a02 = a[0 * 3 + 2];
  const a10 = a[1 * 3 + 0],
    a11 = a[1 * 3 + 1],
    a12 = a[1 * 3 + 2];
  const a20 = a[2 * 3 + 0],
    a21 = a[2 * 3 + 1],
    a22 = a[2 * 3 + 2];

  const b00 = b[0 * 3 + 0],
    b01 = b[0 * 3 + 1],
    b02 = b[0 * 3 + 2];
  const b10 = b[1 * 3 + 0],
    b11 = b[1 * 3 + 1],
    b12 = b[1 * 3 + 2];
  const b20 = b[2 * 3 + 0],
    b21 = b[2 * 3 + 1],
    b22 = b[2 * 3 + 2];

  const result: Float32Array = createMatrix3();

  result[0] = b00 * a00 + b01 * a10 + b02 * a20;
  result[1] = b00 * a01 + b01 * a11 + b02 * a21;
  result[2] = b00 * a02 + b01 * a12 + b02 * a22;
  result[3] = b10 * a00 + b11 * a10 + b12 * a20;
  result[4] = b10 * a01 + b11 * a11 + b12 * a21;
  result[5] = b10 * a02 + b11 * a12 + b12 * a22;
  result[6] = b20 * a00 + b21 * a10 + b22 * a20;
  result[7] = b20 * a01 + b21 * a11 + b22 * a21;
  result[8] = b20 * a02 + b21 * a12 + b22 * a22;

  return result;
};

export const translate = (m: Float32Array, tx: number, ty: number) => {
  return multiply(m, translation(tx, ty));
};

export const rotation = (angleInRadians: number): Float32Array => {
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  return new Float32Array([c, -s, 0, s, c, 0, 0, 0, 1]);
};

export const rotate = (m: Float32Array, angleInRadians: number) => {
  return multiply(m, rotation(angleInRadians));
};

export const scaling = (sx: number, sy: number): Float32Array => {
  return new Float32Array([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
};

export const scale = (m: Float32Array, sx: number, sy: number) => {
  return multiply(m, scaling(sx, sy));
};

export const getMatrix = ({
  posX,
  posY,
  angleInRadians,
  scaleX,
  scaleY,
  width,
  height,
}: ControlsState & { width: number; height: number }) => {
  const projected = projection(width, height);
  const translated = translate(projected, posX, posY);
  const rotated = rotate(translated, angleInRadians);
  const result = scale(rotated, scaleX, scaleY);

  return result;
};
