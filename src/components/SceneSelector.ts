import { scenes } from "@/constants";

type SceneSelectorCallback = (scene: string) => void;

export function createSceneSelector(onSelectScene: SceneSelectorCallback) {
  const container = document.createElement("div");
  container.className = "scene-select-container";

  const select = document.createElement("select");
  select.onchange = () => onSelectScene(select.value);

  scenes.forEach((scene) => {
    const option = document.createElement("option");
    option.value = scene;
    option.innerText = scene;
    select.appendChild(option);
  });

  container.appendChild(select);

  return container;
}
