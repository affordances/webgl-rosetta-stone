import * as THREE from "@react-three/fiber";

import { CustomTriangle } from "./components/fundamentals/triangle/ReactThreeFiberTriangle";
import { CustomRectangle } from "./components/fundamentals/pixelPositioning/ReactThreeFiberPixelPositioning";
import { ColoredRectangle } from "./components/fundamentals/multipleRectangles/ReactThreeFiberMultipleRectangles";

declare module "@react-three/fiber" {
  interface ThreeElements {
    customTriangle: THREE.RawShaderMaterial<
      CustomTriangle,
      typeof CustomTriangle
    >;
    customRectangle: THREE.RawShaderMaterial<
      CustomRectangle,
      typeof CustomRectangle
    >;
    coloredRectangle: THREE.RawShaderMaterial<
      ColoredRectangle,
      typeof ColoredRectangle
    >;
  }
}
