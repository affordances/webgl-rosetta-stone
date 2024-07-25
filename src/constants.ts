export const scenes = ["triangle"];

export const exampleDimensions = {
  height: 352,
  width: 702, // 704 - 2 for everything to line up
};

export const sceneSetup = {
  triangle: {
    vertices: [0, 0, 0, 0.5, 0.7, 0],
    vert: `
  attribute vec4 position;

  void main() {
    gl_Position = position;
  }
`,
    frag: `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
  }
`,
  },
};
