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
