import { insertEveryNth } from "../../../helpers";

const webGlVertices = [0, 0, 0, 0.5, 0.7, 0];

const threeAndR3f = insertEveryNth(webGlVertices, 2, 0);

export const vertices = {
  webGlVertices,
  threeAndR3f,
};

export const vertexShaderSource = `
  attribute vec4 position;

  void main() {
    gl_Position = position;
  }
`;

export const fragmentShaderSource = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
  }
`;
