import { insertEveryNth } from "../../../helpers";

const webGlVertices = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];

const threeAndR3f = insertEveryNth(webGlVertices, 2, 0);

export const vertices = {
  webGlVertices,
  threeAndR3f,
};

export const vertexShaderSource = `
  attribute vec2 position;

  uniform vec2 resolution;

  void main() {
     // convert the position from pixels to 0.0 to 1.0
     vec2 zeroToOne = position.xy / resolution;

     // convert from 0->1 to 0->2
     vec2 zeroToTwo = zeroToOne * 2.0;

     // convert from 0->2 to -1->+1 (clipspace)
     vec2 clipSpace = zeroToTwo - 1.0;

     gl_Position = vec4(clipSpace, 0, 1);
  }
`;

export const fragmentShaderSource = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
  }
`;
