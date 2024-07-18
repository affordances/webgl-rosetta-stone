import { useState } from "react";

export type ControlsState = {
  angleInRadians: number;
  posX: number;
  posY: number;
  scaleX: number;
  scaleY: number;
};

export type ControlsFunc = {
  updateAngleInRadians: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatePositionX: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updatePositionY: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateScaleX: (e: React.ChangeEvent<HTMLInputElement>) => void;
  updateScaleY: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ControlsProps = ControlsState & ControlsFunc;

export const useControls = (): ControlsProps => {
  const [posX, setPosX] = useState(150);
  const [posY, setPosY] = useState(75);
  const [angleInRadians, setAngleInRadians] = useState(0);
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  console.count("useControls");

  const updatePositionX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosX(Number(e.target.value));
  };

  const updatePositionY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosY(Number(e.target.value));
  };

  const updateAngleInRadians = (e: React.ChangeEvent<HTMLInputElement>) => {
    const angleInDegrees = Number(e.target.value);
    setAngleInRadians((angleInDegrees * Math.PI) / 180);
  };

  const updateScaleX = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleX(Number(e.target.value));
  };

  const updateScaleY = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScaleY(Number(e.target.value));
  };

  return {
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
  };
};
