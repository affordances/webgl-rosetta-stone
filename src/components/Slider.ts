export function createSlider(
  container: HTMLElement,
  label: string,
  options: {
    value?: number;
    slide: (value: number) => void;
    max: number;
    min?: number;
    step?: number;
  }
) {
  // Create label
  const labelElement = document.createElement("label");
  labelElement.textContent = `${label}: `;

  // Create span for displaying current value
  const valueDisplay = document.createElement("span");
  labelElement.appendChild(valueDisplay);

  // Create input element for the slider
  const slider = document.createElement("input");
  slider.type = "range";
  slider.max = options.max.toString();
  slider.min = options.min?.toString() || "0";
  slider.step = options.step?.toString() || "1";
  slider.value = options.value?.toString() || "0";

  // Set initial display value
  valueDisplay.textContent = slider.value;

  // Append elements to the container
  container.appendChild(labelElement);
  container.appendChild(slider);
  container.appendChild(document.createElement("br"));

  // Add event listener for slider input
  slider.addEventListener("input", () => {
    const value = parseFloat(slider.value);
    valueDisplay.textContent = slider.value;
    options.slide(value);
  });
}
