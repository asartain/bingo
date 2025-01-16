import { useGLTF } from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler } from "three";

export const Scoop = forwardRef<RapierRigidBody, object>((_props, ref) => {
  const cageModel = useGLTF("./3dModels/bingoCage.gltf");

  return (
    <RigidBody ref={ref} colliders={false} angularDamping={0.7} ccd={true}>
      {/* hanlde */}
      <CuboidCollider args={[0.5, 0.2, 0.7]} position={[0, -10.5, 2]} />
      {/* bottom */}
      <CuboidCollider args={[1, 0.2, 1]} position={[0, -11.5, 0]} />
      {/* sides */}
      <CuboidCollider
        args={[0.9, 0.2, 0.9]}
        position={[0, -11, 1.2]}
        rotation={new Euler(-Math.PI / 3.1, 0, 0)}
      />
      <CuboidCollider
        args={[0.9, 0.2, 0.9]}
        position={[0, -11, -1.2]}
        rotation={new Euler(Math.PI / 3.1, 0, 0)}
      />
      <CuboidCollider
        args={[0.9, 0.2, 0.9]}
        position={[-1.2, -11, 0]}
        rotation={new Euler(0, 0, -Math.PI / 3.1)}
      />
      <CuboidCollider
        args={[0.9, 0.2, 0.9]}
        position={[1.2, -11, 0]}
        rotation={new Euler(0, 0, Math.PI / 3.1)}
      />
      <primitive object={cageModel.nodes.scoop} scale={100} />
    </RigidBody>
  );
});
