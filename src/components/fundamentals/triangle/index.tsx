import { ReactThreeFiberTriangleExample } from "./ReactThreeFiberTriangle";
import { ThreeJSTriangleExample } from "./ThreeJSTriangle";
import { WebGLTriangleExample } from "./WebGLTriangle";

export const Fundamentals = () => {
  return (
    <tr>
      <th scope="row">triangle</th>
      <td>
        <WebGLTriangleExample />
      </td>
      <td>
        <ThreeJSTriangleExample />
      </td>
      <td>
        <ReactThreeFiberTriangleExample />
      </td>
    </tr>
  );
};
