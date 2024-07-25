import { TabType } from "@/types";
import { scenes } from "@/constants";
import { renderR3FScene, unmountR3FScene } from "@/r3f";
import { createThreeJSScene } from "@/threeJs";
import { createWebGLScene } from "@/webGl";

export class SceneManager {
  private selectedScene: string | null = scenes[0];
  private activeTab: TabType = "webgl";
  private currentCanvas: HTMLCanvasElement | null = null;
  private currentDisposeFunction: (() => void) | null = null;
  private r3fContainer: HTMLElement | null = null;

  constructor() {
    this.renderScene();
  }

  setScene(scene: string) {
    this.selectedScene = scene;
    this.renderScene();
  }

  setTab(tab: TabType) {
    this.activeTab = tab;
    this.updateTabVisualState();
    this.renderScene();
  }

  private updateTabVisualState() {
    const tabContainer = document.getElementById("tab-container");
    if (!tabContainer) return;

    const buttons = tabContainer.getElementsByClassName("tab-button");

    for (const button of buttons) {
      if ((button as HTMLButtonElement).dataset.tab === this.activeTab) {
        button.classList.add("selected");
      } else {
        button.classList.remove("selected");
      }
    }
  }

  private renderScene() {
    const sceneContainer = document.getElementById("scene-container");
    if (!sceneContainer || !this.selectedScene) return;

    this.cleanupCurrentScene(sceneContainer);

    switch (this.activeTab) {
      case "webgl":
        this.renderWebGLScene(sceneContainer);
        break;
      case "threejs":
        this.renderThreeJSScene(sceneContainer);
        break;
      case "r3f":
        this.renderR3FSceneContainer(sceneContainer);
        break;
    }
  }

  private cleanupCurrentScene(container: HTMLElement) {
    if (this.currentDisposeFunction) {
      this.currentDisposeFunction();
      this.currentDisposeFunction = null;
    }

    if (this.currentCanvas) {
      container.removeChild(this.currentCanvas);
      this.currentCanvas = null;
    }

    if (this.r3fContainer) {
      unmountR3FScene();
      if (container.contains(this.r3fContainer)) {
        container.removeChild(this.r3fContainer);
      }
      this.r3fContainer = null;
    }
  }

  private renderWebGLScene(container: HTMLElement) {
    const { canvas, dispose, loadScene } = createWebGLScene(
      this.selectedScene!
    );
    container.appendChild(canvas);
    this.currentCanvas = canvas;
    loadScene();
    this.currentDisposeFunction = dispose;
  }

  private renderThreeJSScene(container: HTMLElement) {
    const { canvas, dispose, loadScene } = createThreeJSScene(
      this.selectedScene!
    );
    container.appendChild(canvas);
    this.currentCanvas = canvas;
    loadScene();
    this.currentDisposeFunction = dispose;
  }

  private renderR3FSceneContainer(container: HTMLElement) {
    this.r3fContainer = document.createElement("div");
    this.r3fContainer.id = "r3f-container";
    container.appendChild(this.r3fContainer);
    renderR3FScene(this.selectedScene!, this.r3fContainer);
  }
}
