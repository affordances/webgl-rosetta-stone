import { SceneModules } from "@/types";

export const loadModule = (sceneModules: SceneModules, moduleName: string) => {
  const loader = sceneModules[moduleName];
  if (loader) {
    return loader();
  } else {
    return Promise.reject(new Error(`Module ${moduleName} not found`));
  }
};

export const insertEveryNth = <T>(
  array: Array<T>,
  n: number,
  value: T
): Array<T> => {
  return array.reduce((acc: T[], current: T, index: number) => {
    acc.push(current);

    if ((index + 1) % n === 0) {
      acc.push(value);
    }

    return acc;
  }, []);
};

export const randomInt = (range: number) => {
  return Math.floor(Math.random() * range);
};

export const getRandomRGBAColor = () => {
  const red = Math.floor(Math.random() * 256); // Red: 0 to 255
  const green = Math.floor(Math.random() * 256); // Green: 0 to 255
  const blue = Math.floor(Math.random() * 256); // Blue: 0 to 255

  return `rgba(${red}, ${green}, ${blue}, 1)`;
};
