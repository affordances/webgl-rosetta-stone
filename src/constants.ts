export const scenes = ["triangle", "pixelPositioning"];

export const exampleDimensions = {
  height: 352,
  width: 702, // 704 - 2 for everything to line up
};

export const sceneSetup = {
  triangle: {
    vertices: [0, 0, 0, 0.5, 0.7, 0],
  },
  pixelPositioning: {
    vertices: [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30],
  },
};
