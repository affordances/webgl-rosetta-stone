export const Controls = () => {
  // webglLessonsUI.setupSlider("#x", {value: translation[0], slide: updatePosition(0), max: gl.canvas.width });
  // webglLessonsUI.setupSlider("#y", {value: translation[1], slide: updatePosition(1), max: gl.canvas.height});
  // webglLessonsUI.setupSlider("#angle", {slide: updateAngle, max: 360});
  // webglLessonsUI.setupSlider("#scaleX", {value: scale[0], slide: updateScale(0), min: -5, max: 5, step: 0.01, precision: 2});
  // webglLessonsUI.setupSlider("#scaleY", {value: scale[1], slide: updateScale(1), min: -5, max: 5, step: 0.01, precision: 2});

  // function updatePosition(index) {
  //   return function(event, ui) {
  //     translation[index] = ui.value;
  //   };
  // }

  // function updateAngle(event, ui) {
  //   const angleInDegrees = 360 - ui.value;
  //   angleInRadians = angleInDegrees * Math.PI / 180;
  // }

  // function updateScale(index) {
  //   return function(event, ui) {
  //     scale[index] = ui.value;
  //   };
  // }

  return (
    <div className="controls">
      <div className="slider-row">
        <label>x</label>
        <input type="range" />
      </div>
      <div className="slider-row">
        <label>y</label>
        <input type="range" />
      </div>
      <div className="slider-row">
        <label>angle</label>
        <input type="range" />
      </div>
      <div className="slider-row">
        <label>scaleX</label>
        <input type="range" />
      </div>
      <div className="slider-row">
        <label>scaleY</label>
        <input type="range" />
      </div>
    </div>
  );
};
