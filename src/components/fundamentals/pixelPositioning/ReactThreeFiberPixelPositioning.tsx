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
      side: THREE.DoubleSide,
    });
  }
}

extend({ CustomRectangle });
export { CustomRectangle };

export const ReactThreeFiberPixelPositioningExample = () => {
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
        <customRectangle />
      </mesh>
    </Canvas>
  );
};
