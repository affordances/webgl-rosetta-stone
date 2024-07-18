import * as THREE from "three";
import { Canvas, extend, useFrame } from "@react-three/fiber";

import {
  fragmentShaderSource,
  vertexShaderSource,
  vertices,
} from "./constants";
import { ControlsState } from "./useControls";
import { getMatrix } from "../../../helpers";
import { exampleDimensions } from "../../../constants";
import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";

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

const Triangle = (props: ControlsState) => {
  console.count("inside r3f Canvas");

  const { posX, posY, angleInRadians, scaleX, scaleY } = props;
  const materialRef = useRef<THREE.RawShaderMaterial | null>(null);

  const width = exampleDimensions.width;
  const height = exampleDimensions.height;

  const initialMatrix = useMemo(
    () =>
      getMatrix({ posX, posY, angleInRadians, scaleX, scaleY, height, width }),
    [posX, posY, angleInRadians, scaleX, scaleY, height, width]
  );

  useFrame((state) => {
    console.log("frames", state.internal.frames);
    if (materialRef.current) {
      const newMatrix = getMatrix({
        posX,
        posY,
        angleInRadians,
        scaleX,
        scaleY,
        height,
        width,
      });

      materialRef.current.uniforms.matrix.value = newMatrix;
    }
  });

  const positions = new Float32Array(vertices.threeAndR3f);

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
      <varyingTriangle ref={materialRef} args={[initialMatrix]} />
    </mesh>
  );
};

const Blah = () => {
  console.count("inside r3f html");
  return <Html>something</Html>;
};

export const ReactThreeFiberVaryingTriangleExample = (props: ControlsState) => {
  // console.count("r3f");

  return (
    <Canvas frameloop="demand">
      <Blah />
      <Triangle {...props} />
    </Canvas>
  );
};
