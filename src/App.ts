import { SceneManager } from "@state/SceneManager";
import { createSceneSelector } from "@components/SceneSelector";
import { createTabButton } from "@/components/TabButton";

import "./style.css";

export function initializeApp() {
  const app = document.getElementById("app");
  if (!app) return;

  const sceneManager = new SceneManager();

  const sceneSelector = createSceneSelector((scene) => {
    sceneManager.setScene(scene);
  });

  const tabContainer = document.createElement("div");
  tabContainer.id = "tab-container";

  const webglTab = createTabButton(
    "webgl",
    sceneManager.setTab.bind(sceneManager)
  );
  const threejsTab = createTabButton(
    "threejs",
    sceneManager.setTab.bind(sceneManager)
  );
  const r3fTab = createTabButton("r3f", sceneManager.setTab.bind(sceneManager));

  tabContainer.appendChild(webglTab);
  tabContainer.appendChild(threejsTab);
  tabContainer.appendChild(r3fTab);

  app.appendChild(sceneSelector);
  app.appendChild(tabContainer);

  const sceneContainer = document.createElement("div");
  sceneContainer.id = "scene-container";
  app.appendChild(sceneContainer);

  sceneManager.setTab("webgl");
}
