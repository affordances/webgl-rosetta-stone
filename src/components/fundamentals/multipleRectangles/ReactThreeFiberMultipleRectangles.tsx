import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import { exampleDimensions } from "../../../constants";
import { fragmentShaderSource, vertexShaderSource } from "./constants";
import { insertEveryNth, randomInt } from "../../../helpers";
import { useEffect, useState } from "react";

class ColoredRectangle extends THREE.RawShaderMaterial {
  constructor(color: THREE.Vector4) {
    super({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        resolution: {
          value: new THREE.Vector2(
            exampleDimensions.width * window.devicePixelRatio,
            exampleDimensions.height * window.devicePixelRatio
          ),
        },
        color: {
          value: color,
        },
      },
      side: THREE.DoubleSide,
    });
  }
}

extend({ ColoredRectangle });
export { ColoredRectangle };

function createRectangleVertices(
  x: number,
  y: number,
  width: number,
  height: number
): Float32Array {
  const vertices = insertEveryNth(
    [
      x,
      y,
      x + width,
      y,
      x,
      y + height,
      x,
      y + height,
      x + width,
      y,
      x + width,
      y + height,
    ],
    2,
    0
  );

  return new Float32Array(vertices);
}

type RectangleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: THREE.Vector4;
};

const Rectangle: React.FC<RectangleProps> = ({
  x,
  y,
  width,
  height,
  color,
}) => {
  const positions = createRectangleVertices(x, y, width, height);

  return (
    <mesh>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <coloredRectangle args={[color]} />
    </mesh>
  );
};

export const ReactThreeFiberMultipleRectanglesExample: React.FC = () => {
  const [rectangles, setRectangles] = useState<Array<RectangleProps> | null>(
    null
  );

  useEffect(() => {
    const _rectangles = Array.from({ length: 50 }, () => ({
      x: randomInt(300),
      y: randomInt(300),
      width: randomInt(300),
      height: randomInt(300),
      color: new THREE.Vector4(Math.random(), Math.random(), Math.random()),
    }));

    setRectangles(_rectangles);
  }, []);

  return rectangles ? (
    <Canvas
      frameloop="demand"
      orthographic
      camera={{
        left: 0,
        right: exampleDimensions.width,
        top: exampleDimensions.height,
        bottom: 0,
        near: -1,
        far: 1,
        position: [0, 0, 1],
      }}
    >
      {rectangles.map((rect, i) => (
        <Rectangle key={i} {...rect} />
      ))}
    </Canvas>
  ) : null;
};
