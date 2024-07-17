import * as THREE from "three";
import { Canvas, extend } from "@react-three/fiber";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { ControlsState } from "./useControls";
import { getMatrix } from "../../../helpers";
import { exampleDimensions } from "../../../constants";

class VaryingTriangle extends THREE.RawShaderMaterial {
  constructor(matrix: THREE.Vector4) {
    super({
      vertexShader: vertexShaderSource,
      fragmentShader: fragmentShaderSource,
      uniforms: {
        matrix: {
          value: matrix,
        },
      },
      side: THREE.DoubleSide,
    });
  }
}

extend({ VaryingTriangle });
export { VaryingTriangle };

export const ReactThreeFiberVaryingTriangleExample = (props: ControlsState) => {
  const { posX, posY, angleInRadians, scaleX, scaleY } = props;

  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const initialMatrix = getMatrix({
    posX,
    posY,
    angleInRadians,
    scaleX,
    scaleY,
    height,
    width,
  });

  const positions = new Float32Array(vertices.threeAndR3f);

  return (
    <Canvas>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={positions.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <varyingTriangle args={[initialMatrix]} />
      </mesh>
    </Canvas>
  );
};
