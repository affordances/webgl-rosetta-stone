import { useRef } from "react";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";

class CustomShader extends THREE.RawShaderMaterial {
  constructor() {
    super({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      // so it's not necessary to flip the first and second position coords
      side: THREE.FrontSide,
    });
  }
}

extend({ CustomShader });
export { CustomShader };

export const ReactThreeFiberCustomShaderExample = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.RawShaderMaterial>(null);

  const positions = new Float32Array(vertices.threeAndR3f);

  return (
    <Canvas>
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <customShader ref={materialRef} />
      </mesh>
    </Canvas>
  );
};
