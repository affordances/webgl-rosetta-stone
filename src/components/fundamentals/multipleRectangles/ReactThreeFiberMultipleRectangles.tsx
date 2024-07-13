import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import { exampleDimensions } from "../../../constants";
import { fragmentShaderSource, vertexShaderSource } from "./constants";
import { vertices } from "../pixelPositioning/constants";

class ColoredRectangle extends THREE.RawShaderMaterial {
  constructor(color: THREE.Vector4, resolution: THREE.Vector2) {
    super({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        resolution: {
          value: resolution,
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

// export const ReactThreeFiberMultipleRectanglesExample = () => {
//   const meshRef = useRef<THREE.Mesh>(null);
//   const materialRef = useRef<THREE.RawShaderMaterial>(null);
//   const color = new THREE.Vector4(Math.random(), Math.random(), Math.random());
//   const resolution = new THREE.Vector2(
//     exampleDimensions.width * window.devicePixelRatio,
//     exampleDimensions.height * window.devicePixelRatio
//   );

//   const positions = new Float32Array(vertices.threeAndR3f);

//   return (
//     <Canvas>
//       <mesh ref={meshRef}>
//         <bufferGeometry>
//           <bufferAttribute
//             attach="attributes-position"
//             array={positions}
//             count={positions.length / 3}
//             itemSize={3}
//           />
//         </bufferGeometry>
//         <coloredRectangle ref={materialRef} args={[color, resolution]} />
//       </mesh>
//     </Canvas>
//   );
// };

function createRectangleVertices(
  x: number,
  y: number,
  width: number,
  height: number
): Float32Array {
  return new Float32Array([
    x,
    y,
    0,
    x + width,
    y,
    0,
    x,
    y + height,
    0,
    x,
    y + height,
    0,
    x + width,
    y,
    0,
    x + width,
    y + height,
    0,
  ]);
}

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: THREE.Vector4;
}

const Rectangle: React.FC<RectangleProps> = ({
  x,
  y,
  width,
  height,
  color,
}) => {
  const positions = useMemo(
    () => createRectangleVertices(x, y, width, height),
    [x, y, width, height]
  );

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <mesh geometry={geometry}>
      <coloredRectangle args={[color]} />
    </mesh>
  );
};

export const ReactThreeFiberMultipleRectanglesExample: React.FC = () => {
  const rectangles = Array.from({ length: 50 }, () => ({
    x: Math.random() * 300,
    y: Math.random() * 300,
    width: Math.random() * 300,
    height: Math.random() * 300,
    color: new THREE.Vector4(Math.random(), Math.random(), Math.random(), 1),
  }));

  return (
    <Canvas>
      {rectangles.map((rect, i) => (
        <Rectangle key={i} {...rect} />
      ))}
    </Canvas>
  );
};
