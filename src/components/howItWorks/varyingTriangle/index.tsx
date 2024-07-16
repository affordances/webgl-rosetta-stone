import { Controls } from "./Controls";
import { ThreeJSVaryingTriangle } from "./ThreeJSVaryingTriangle";
import { useControls } from "./useControls";
import { WebGLVaryingTriangleExample } from "./WebGLVaryingTriangle";

export const VaryingTriangle = () => {
  const controls = useControls();
  return (
    <tr>
      <th scope="row">
        varying triangle
        <Controls {...controls} />
      </th>
      <td>
        <WebGLVaryingTriangleExample {...controls} />
      </td>
      <td>
        <ThreeJSVaryingTriangle {...controls} />
      </td>
      <td>{/* <ReactThreeFiberMultipleRectanglesExample /> */}</td>
    </tr>
  );
};
