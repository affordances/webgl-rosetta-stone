import * as THREE from "@react-three/fiber";

import { CustomShader } from "./components/ReactThreeFiber";

declare module "@react-three/fiber" {
  interface ThreeElements {
    customShader: THREE.RawShaderMaterial<CustomShader, typeof CustomShader>;
  }
}
