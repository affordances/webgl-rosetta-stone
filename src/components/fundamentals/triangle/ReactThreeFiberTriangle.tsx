import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";

class CustomTriangle extends THREE.RawShaderMaterial {
  constructor() {
    super({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      // so it's not necessary to flip the first and second position coords
      side: THREE.DoubleSide,
    });
  }
}

extend({ CustomTriangle });
export { CustomTriangle };

export const ReactThreeFiberTriangleExample = () => {
  const positions = new Float32Array(vertices.threeAndR3f);

  return (
    <Canvas frameloop="demand">
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <customTriangle />
      </mesh>
    </Canvas>
  );
};
