import "./App.css";

import { Fundamentals } from "./components/fundamentals/triangle";
import { PixelPositioning } from "./components/fundamentals/pixelPositioning";
import { MultipleRectangles } from "./components/fundamentals/multipleRectangles";
import { VaryingTriangle } from "./components/howItWorks/varyingTriangle";

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
          <Fundamentals />
          <PixelPositioning />
          <MultipleRectangles />
          <VaryingTriangle />
        </tbody>
      </table>
    </div>
  );
}

export default App;
