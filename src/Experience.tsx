import { BingoCage } from "./ThreeObjects/BingoCage/BingoCage";
import { Floor } from "./ThreeObjects/Floor";
import { Ball } from "./ThreeObjects/Ball";
import { Vector3 } from "three";
import { TOption } from "./App";
import { useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Easing, Group, Tween } from "@tweenjs/tween.js";

export type TBall = TOption & {
  initialPosition: Vector3;
  index: number;
};

const tweenGroup = new Group();

export const Experience = ({
  options,
  onSelection,
}: {
  options: TOption[];
  onSelection: (ball: TOption) => void;
}) => {
  const [balls, setBalls] = useState<TBall[]>([]);

  const { camera } = useThree();

  useFrame(() => {
    tweenGroup.update();
  });

  useEffect(() => {
    const newBalls: TBall[] = [];
    options?.forEach((option) => {
      for (let i = 0; i < option.quantity; i++) {
        const exisitingBall = balls.find(
          (ball) => ball.name === option.name && ball.index === i
        );
        let initialPosition = new Vector3(0, 0, 0);
        if (!exisitingBall) {
          const r = Math.random() * 8;
          const theta = Math.random() * Math.PI;
          const phi = Math.random() * Math.PI * 2;
          initialPosition = new Vector3(
            r * Math.sin(theta) * Math.cos(phi),
            r * Math.sin(theta) * Math.sin(phi),
            r * Math.cos(theta)
          );
        }

        const ball = {
          ...option,
          index: i,
          initialPosition: exisitingBall?.initialPosition || initialPosition,
        };
        newBalls.push(ball);
      }
    });
    setBalls(newBalls);
  }, [options]);

  const selection = (ball: TOption) => {
    setTimeout(() => {
      onSelection(ball);

      const currentPos = camera.position.clone();
      tweenGroup.add(
        new Tween({
          x: currentPos.x,
          y: currentPos.y,
          z: currentPos.z,
        })
          .to({ x: 0, y: -5, z: 30 }, 3000)
          .easing(Easing.Back.Out)
          .onUpdate((coords) => {
            camera.position.set(coords.x, coords.y, coords.z);
          })
          .start()
      );

      const currentLookAt = new Vector3(0, 0, -1).applyQuaternion(
        camera.quaternion
      );
      tweenGroup.add(
        new Tween({
          x: currentLookAt.x,
          y: currentLookAt.y,
          z: currentLookAt.z,
        })
          .to({ x: 0, y: -16.64, z: 16.77 }, 3000)
          .easing(Easing.Quadratic.InOut)
          .onUpdate((coords) => {
            camera.lookAt(coords.x, coords.y, coords.z);
          })
          .start()
      );
    }, 1000);
  };

  return (
    <>
      <Floor />

      <BingoCage onSelection={selection} />

      {balls.map((ball, index) => {
        return (
          <Ball
            key={`${ball.name}_${index}`}
            ball={ball}
            index={index}
            position={ball.initialPosition}
          />
        );
      })}
    </>
  );
};
