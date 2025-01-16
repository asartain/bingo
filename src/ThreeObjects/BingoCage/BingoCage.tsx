import {
  RapierRigidBody,
  useFixedJoint,
  useRevoluteJoint,
} from "@react-three/rapier";
import { useRef } from "react";
import { Cage } from "./Cage";
import { Scoop } from "./scoop";
import { Stand } from "./stand";
import { TOption } from "../../App";
import { Handle } from "./handle";

export const BingoCage = ({
  onSelection,
}: {
  onSelection: (ball: TOption) => void;
}) => {
  const cage = useRef<RapierRigidBody>(null);
  const handle = useRef<RapierRigidBody>(null);
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

  useFixedJoint(cage, handle, [
    // Position of the joint in bodyA's local space
    [0, 0, 0],
    // Orientation of the joint in bodyA's local space
    [0, 0, 0, 1],
    // Position of the joint in bodyB's local space
    [0, 0, 0],
    // Orientation of the joint in bodyB's local space
    [0, 0, 0, 1],
  ]);

  return (
    <>
      <Cage ref={cage} />
      <Handle ref={handle} />
      <Scoop ref={scoop} />
      <Stand ref={stand} onSelection={onSelection} />
    </>
  );
};
