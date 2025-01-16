import { useGLTF } from "@react-three/drei";
import {
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { forwardRef, Fragment } from "react";
import { Euler } from "three";

export const Cage = forwardRef<RapierRigidBody, object>((_props, ref) => {
  const cageModel = useGLTF("./3dModels/bingoCage.gltf");

  const spin = () => {
    // @ts-expect-error - object type ref
    if (ref?.current) {
      // @ts-expect-error - object type ref
      ref?.current.applyTorqueImpulse({ x: -100000, y: 0, z: 0 }, true);
    }
  };

  const spinBack = () => {
    // @ts-expect-error - object type ref
    if (ref?.current) {
      // @ts-expect-error - object type ref
      ref?.current.applyTorqueImpulse({ x: 100000, y: 0, z: 0 }, true);
    }
  };

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      restitution={0.3}
      friction={0.7}
      angularDamping={0.7}
    >
      {/* outside walls */}
      {Array(93)
        .fill(0)
        .map((_, index) => {
          const angle = ((index - 21) * (Math.PI * 2)) / 100;
          const r = 10.1;
          const y = r * Math.sin(angle);
          const z = r * Math.cos(angle);

          return (
            <CylinderCollider
              key={index}
              args={[7, 0.3]}
              rotation={new Euler(0, 0, Math.PI * 0.5)}
              position={[0, y, z]}
            />
          );
        })}
      {/* outside walls around opening  */}
      {Array(7)
        .fill(0)
        .map((_, index) => {
          const angle = ((index - 21 + 93) * (Math.PI * 2)) / 100;
          const r = 10.1;
          const y = r * Math.sin(angle);
          const z = r * Math.cos(angle);

          return (
            <Fragment key={index}>
              <CylinderCollider
                args={[2.5, 0.3]}
                rotation={new Euler(0, 0, Math.PI * 0.5)}
                position={[-4.5, y, z]}
              />
              <CylinderCollider
                args={[2.5, 0.3]}
                rotation={new Euler(0, 0, Math.PI * 0.5)}
                position={[4.5, y, z]}
              />
            </Fragment>
          );
        })}
      {/* left/right side walls */}
      <CylinderCollider
        args={[1, 10]}
        rotation={new Euler(0, 0, Math.PI * 0.5)}
        position={[-7.7, 0, 0]}
      />
      <CylinderCollider
        args={[1, 10]}
        rotation={new Euler(0, 0, Math.PI * 0.5)}
        position={[7.7, 0, 0]}
      />
      {/* center bar */}
      <CylinderCollider
        args={[7, 0.3]}
        rotation={new Euler(0, 0, Math.PI * 0.5)}
      />
      <primitive
        object={cageModel.nodes.cage}
        scale={100}
        onClick={spin}
        onContextMenu={spinBack}
      />
    </RigidBody>
  );
});
