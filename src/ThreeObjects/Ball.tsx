import { RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";
import { createUVMapFromText } from "../helpers/createUVMap";
import { useMemo } from "react";
import { TOption } from "../App";

export const Ball = ({
  position = new Vector3(0, 0, 0),
  ball,
  index,
}: {
  position?: Vector3;
  ball: TOption;
  index: number;
}) => {
  const text = ball.ballText || index.toString().padStart(2, "0");

  const map = useMemo(
    () => (text ? createUVMapFromText(text) : undefined),
    [text]
  );

  return (
    <RigidBody
      colliders="ball"
      density={0.1}
      restitution={0.7}
      friction={0.7}
      ccd={true}
      userData={{ ballData: { ...ball, index } }}
    >
      <mesh position={position}>
        <sphereGeometry args={[1.1, 15, 15]} />
        <meshStandardMaterial color="white" map={map} />
      </mesh>
    </RigidBody>
  );
};
