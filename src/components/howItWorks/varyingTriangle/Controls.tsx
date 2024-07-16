import { exampleDimensions } from "../../../constants";
import { ControlsProps } from "./useControls";

export const Controls = ({
  angleInRadians,
  posX,
  posY,
  scaleX,
  scaleY,
  updateAngleInRadians,
  updatePositionX,
  updatePositionY,
  updateScaleX,
  updateScaleY,
}: ControlsProps) => {
  return (
    <div className="controls">
      <div className="slider-row">
        <label>x</label>
        <input
          type="range"
          value={posX}
          min="0"
          max={exampleDimensions.width}
          onChange={updatePositionX}
        />
      </div>
      <div className="slider-row">
        <label>y</label>
        <input
          type="range"
          value={posY}
          min="0"
          max={exampleDimensions.height}
          onChange={updatePositionY}
        />
      </div>
      <div className="slider-row">
        <label>angle</label>
        <input
          type="range"
          value={angleInRadians * (180 / Math.PI)}
          min="0"
          max="360"
          onChange={updateAngleInRadians}
        />
      </div>
      <div className="slider-row">
        <label>scaleX</label>
        <input
          type="range"
          value={scaleX}
          min="-5"
          max="5"
          step="0.01"
          // precision: 2
          onChange={updateScaleX}
        />
      </div>
      <div className="slider-row">
        <label>scaleY</label>
        <input
          type="range"
          value={scaleY}
          min="-5"
          max="5"
          step="0.01"
          // precision: 2
          onChange={updateScaleY}
        />
      </div>
    </div>
  );
};
