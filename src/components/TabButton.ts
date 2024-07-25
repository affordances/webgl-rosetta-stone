import { TabType } from "@/types";

export function createTabButton(tab: TabType, setTab: (tab: TabType) => void) {
  const button = document.createElement("button");
  button.innerText = tab;
  button.className = "tab-button";
  button.dataset.tab = tab;
  button.onclick = () => setTab(tab);
  return button;
}
