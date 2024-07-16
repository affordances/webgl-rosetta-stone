import { ReactThreeFiberMultipleRectanglesExample } from "./ReactThreeFiberMultipleRectangles";
import { ThreeJSMultipleRectanglesExample } from "./ThreeJSMultipleRectangles";
import { WebGLMultipleRectanglesExample } from "./WebGLMultipleRectangles";

export const MultipleRectangles = () => {
  return (
    <tr>
      <th scope="row">multiple rectangles</th>
      <td>
        <WebGLMultipleRectanglesExample />
      </td>
      <td>
        <ThreeJSMultipleRectanglesExample />
      </td>
      <td>
        <ReactThreeFiberMultipleRectanglesExample />
      </td>
    </tr>
  );
};
