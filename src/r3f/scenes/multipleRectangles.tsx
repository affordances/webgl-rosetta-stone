import React from "react";
import * as THREE from "three";

import { exampleDimensions } from "@/constants";
import { getRandomRGBAColor, randomInt } from "@/helpers";
import { OrthographicCamera } from "@react-three/drei";

const multipleRectangles: React.FC = () => {
  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const generateRectangles = () => {
    return new Array(50).fill(null).map(() => {
      const w = randomInt(width / 2);
      const h = randomInt(height / 2);

      const x = Math.random() * (width - w) - (width / 2 - w / 2);
      const y = Math.random() * (height - h) - (height / 2 - h / 2);
      const color = getRandomRGBAColor();

      return { x, y, w, h, color };
    });
  };

  const rectangles = generateRectangles();

  return (
    <>
      <OrthographicCamera
        makeDefault
        position={[0, 0, 500]}
        zoom={1}
        near={0.1}
        far={1000}
        args={[-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000]}
      />
      {rectangles.map((rect, index) => (
        <mesh key={index} position={[rect.x, rect.y, 0]}>
          <planeGeometry args={[rect.w, rect.h]} />
          <meshBasicMaterial color={rect.color} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  );
};

export default multipleRectangles;
