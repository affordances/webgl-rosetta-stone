export const vertexShaderSource = `
  attribute vec2 position;

  uniform vec2 resolution;

  void main() {
    // convert the rectangle from pixels to 0.0 to 1.0
    vec2 zeroToOne = position / resolution;

    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;

    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;

    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  }
`;

export const fragmentShaderSource = `
  precision mediump float;

  uniform vec4 color;

  void main() {
    gl_FragColor = color;
  }
`;
