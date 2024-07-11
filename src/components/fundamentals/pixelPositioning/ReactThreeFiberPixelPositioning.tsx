import { useRef } from "react";
import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { exampleDimensions } from "../../../constants";

class CustomRectangle extends THREE.RawShaderMaterial {
  constructor() {
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
      },
      // so it's not necessary to flip the first and second position coords
      side: THREE.BackSide,
    });
  }
}

extend({ CustomRectangle });
export { CustomRectangle };

export const ReactThreeFiberPixelPositioningExample = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.RawShaderMaterial>(null);

  const positions = new Float32Array(vertices.threeAndR3f);

  return (
    <Canvas
      orthographic
      camera={{
        zoom: 10,
        position: [0, 0, 1],
        left: 0,
        right: 300,
        top: 150,
        bottom: 0,
        near: -1,
        far: 1,
      }}
      style={{ width: "300px", height: "150px" }}
    >
      <mesh ref={meshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <customRectangle ref={materialRef} />
      </mesh>
    </Canvas>
  );
};
