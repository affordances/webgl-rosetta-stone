import "./App.css";

import { WebGLCustomShaderExample } from "./components/customShader/WebGLCustomShader";
import { ThreeJSCustomShaderExample } from "./components/customShader/ThreeJSCustomShader";
import { ReactThreeFiberCustomShaderExample } from "./components/customShader/ReactThreeFiberCustomShader";
import { WebGLRenderTargetExample } from "./components/renderTarget/WebGLRenderTarget";

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
            <th scope="row">custom shader</th>
            <td>
              <WebGLCustomShaderExample />
            </td>
            <td>
              <ThreeJSCustomShaderExample />
            </td>
            <td>
              <ReactThreeFiberCustomShaderExample />
            </td>
          </tr>
          <tr>
            <th scope="row">render target</th>
            <td>
              <WebGLRenderTargetExample />
            </td>
            {/* <td>
            <ThreeJSExample />
          </td>
          <td>
            <ReactThreeFiberExample />
          </td> */}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
