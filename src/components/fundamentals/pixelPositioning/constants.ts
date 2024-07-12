// import { exampleDimensions } from "../../../constants";
import { insertEveryNth } from "../../../helpers";

const webGlVertices = [10, 20, 80, 20, 10, 30, 10, 30, 80, 20, 80, 30];

const threeAndR3f = insertEveryNth(webGlVertices, 2, 0);

export const vertices = {
  webGlVertices,
  threeAndR3f,
};

// type Vec2 = { x: number; y: number };

// const dpr = window.devicePixelRatio;
// const width = exampleDimensions.width;
// const height = exampleDimensions.height;

// const getPosComparison = (pos: Vec2) => {
//   const zeroToOne = {
//     x: (pos.x / width) * dpr,
//     y: (pos.y / height) * dpr,
//   };

//   const zeroToTwo = {
//     x: zeroToOne.x * 2.0,
//     y: zeroToOne.y * 2.0,
//   };

//   const clipSpace = {
//     x: zeroToTwo.x - 1.0,
//     y: zeroToTwo.y - 1.0,
//   };

//   console.log("original", { x: clipSpace.x, y: clipSpace.y, z: 0, m: 1 });
//   console.log("transformed", {
//     x: clipSpace.x * 1,
//     y: clipSpace.y * -1,
//     z: 0,
//     m: 1,
//   });
// };

// console.log(getPosComparison({ x: 10, y: 20 }));

export const vertexShaderSource = `
  attribute vec2 position;

  uniform vec2 resolution;

  void main() {
     // convert the position from pixels to 0.0 to 1.0
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

  void main() {
    gl_FragColor = vec4(1.0, 0.0, 0.5, 1.0);
  }
`;
