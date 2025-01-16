import { RapierRigidBody, useRevoluteJoint } from "@react-three/rapier";
import { useRef } from "react";
import { Cage } from "./Cage";
import { Scoop } from "./scoop";
import { Stand } from "./stand";
import { TOption } from "../../App";

export const BingoCage = ({
  onSelection,
}: {
  onSelection: (ball: TOption) => void;
}) => {
  const cage = useRef<RapierRigidBody>(null);
  const scoop = useRef<RapierRigidBody>(null);
  const stand = useRef<RapierRigidBody>(null);

  useRevoluteJoint(cage, stand, [
    [0, 0, 0],
    [0, 0, 0],
    [1, 0, 0],
  ]);

  useRevoluteJoint(cage, scoop, [
    [0, -10.2, 0],
    [0, -10.2, 0],
    [1, 0, 0],
  ]);

  return (
    <>
      <Cage ref={cage} />
      <Scoop ref={scoop} />
      <Stand ref={stand} onSelection={onSelection} />
    </>
  );
};
