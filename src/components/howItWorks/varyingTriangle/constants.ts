import { insertEveryNth } from "../../../helpers";

const webGlVertices = [0, -50, 75, 62.5, -87.5, 50];

const threeAndR3f = insertEveryNth(webGlVertices, 2, 0);

export const vertices = {
  webGlVertices,
  threeAndR3f,
};

export const vertexShaderSource = `
attribute vec2 position;

uniform mat3 matrix;

varying vec4 color;

void main() {
  // Multiply the position by the matrix.
  gl_Position = vec4((matrix * vec3(position, 1)).xy, 0, 1);

  // Convert from clipspace to colorspace.
  // Clipspace goes -1.0 to +1.0
  // Colorspace goes from 0.0 to 1.0
  color = gl_Position * 0.5 + 0.5;
}
`;

export const fragmentShaderSource = `
precision mediump float;

varying vec4 color;

void main() {
  gl_FragColor = color;
}
`;
