import { Controls } from "./Controls";
import { ReactThreeFiberVaryingTriangleExample } from "./ReactThreeFiberVaryingTriangle";
import { ThreeJSVaryingTriangleExample } from "./ThreeJSVaryingTriangle";
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
        <ThreeJSVaryingTriangleExample {...controls} />
      </td>
      <td>
        <ReactThreeFiberVaryingTriangleExample {...controls} />
      </td>
    </tr>
  );
};
