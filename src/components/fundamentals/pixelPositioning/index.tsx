import { ReactThreeFiberPixelPositioningExample } from "./ReactThreeFiberPixelPositioning";
import { ThreeJSPixelPositioningExample } from "./ThreeJSPixelPositioning";
import { WebGLPixelPositioningExample } from "./WebGLPixelPositioning";

export const PixelPositioning = () => {
  return (
    <tr>
      <th scope="row">pixel positioning</th>
      <td>
        <WebGLPixelPositioningExample />
      </td>
      <td>
        <ThreeJSPixelPositioningExample />
      </td>
      <td>
        <ReactThreeFiberPixelPositioningExample />
      </td>
    </tr>
  );
};
