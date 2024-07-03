import "./App.css";

import { WebGLExample } from "./components/WebGL";
import { ThreeJSExample } from "./components/ThreeJS";
import { ReactThreeFiberExample } from "./components/ReactThreeFiber";

function App() {
  return (
    <div className="comparison">
      <div className="example">
        <div className="label">webgl</div>
        <WebGLExample />
      </div>
      <div className="example">
        <div className="label">threejs</div>
        <ThreeJSExample />
      </div>
      <div className="example">
        <div className="label">react-three-fiber</div>
        <ReactThreeFiberExample />
      </div>
    </div>
  );
}

export default App;
