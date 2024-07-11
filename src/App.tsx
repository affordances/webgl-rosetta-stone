import "./App.css";

import { WebGLTriangleExample } from "./components/fundamentals/triangle/WebGLTriangle";
import { ThreeJSTriangleExample } from "./components/fundamentals/triangle/ThreeJSTriangle";
import { ReactThreeFiberTriangleExample } from "./components/fundamentals/triangle/ReactThreeFiberTriangle";
import { WebGLPixelPositioningExample } from "./components/fundamentals/pixelPositioning/WebGLPixelPositioning";
import { ThreeJSPixelPositioningExample } from "./components/fundamentals/pixelPositioning/ThreeJSPixelPositioning";
import { ReactThreeFiberPixelPositioningExample } from "./components/fundamentals/pixelPositioning/ReactThreeFiberPixelPositioning";

function App() {
  return (
    <div className="container">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th scope="col">webgl</th>
            <th scope="col">threejs</th>
            <th scope="col">react-three-fiber</th>
          </tr>
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
        </tbody>
      </table>
    </div>
  );
}

export default App;
