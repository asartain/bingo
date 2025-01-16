import { useGLTF } from "@react-three/drei";
import {
  CuboidCollider,
  CylinderCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { forwardRef } from "react";
import { Euler } from "three";
import { TOption } from "../../App";

export const Stand = forwardRef<
  RapierRigidBody,
  { onSelection: (ball: TOption) => void }
>(({ onSelection }, ref) => {
  const cageModel = useGLTF("./3dModels/bingoCage.gltf");

  return (
    <RigidBody colliders={false} ref={ref} type="fixed" ccd={true} friction={0}>
      {/* middle */}
      <CylinderCollider
        args={[8, 0.17]}
        position={[0, -15.45, 4.35]}
        rotation={new Euler(-1.38, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[0, -13.2, -5.48]}
        rotation={new Euler(-1.22, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[0, -11.09, -8.89]}
        rotation={new Euler(-0.88, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[0, -8.27, -11.59]}
        rotation={new Euler(-0.66, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[0, -4.87, -13.4]}
        rotation={new Euler(-0.36, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[0, -1.47, -14.11]}
        rotation={new Euler(-0.1, 0, 0)}
      />

      {/* left */}
      <CylinderCollider
        args={[8, 0.17]}
        position={[-1.12, -14.59, 4.51]}
        rotation={new Euler(-1.38, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[-1.12, -12.35, -5.2]}
        rotation={new Euler(-1.15, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[-1.12, -10.2, -8.58]}
        rotation={new Euler(-0.85, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[-1.12, -7.2, -11.2]}
        rotation={new Euler(-0.58, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[-1.12, -3.62, -12.83]}
        rotation={new Euler(-0.3, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[-1.12, -1.85, -13.27]}
        rotation={new Euler(-0.03, 0, 0)}
      />

      {/* right */}
      <CylinderCollider
        args={[8, 0.17]}
        position={[1.12, -14.59, 4.51]}
        rotation={new Euler(-1.38, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[1.12, -12.35, -5.2]}
        rotation={new Euler(-1.15, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[1.12, -10.2, -8.58]}
        rotation={new Euler(-0.85, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[1.12, -7.2, -11.2]}
        rotation={new Euler(-0.58, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[1.12, -3.62, -12.83]}
        rotation={new Euler(-0.3, 0, 0)}
      />
      <CylinderCollider
        args={[2, 0.17]}
        position={[1.12, -1.85, -13.27]}
        rotation={new Euler(-0.03, 0, 0)}
      />

      {/* bucket */}
      <CylinderCollider args={[0.1, 5]} position={[0, -18.64, 16.77]} />
      {Array(10)
        .fill(0)
        .map((_, index, arr) => {
          const r = 5;
          const angle = (index * (2 * Math.PI)) / arr.length;
          const x = r * Math.sin(angle);
          const z = r * Math.cos(angle);
          return (
            <CuboidCollider
              key={index}
              args={[2, 0.8, 0.1]}
              position={[x, -17.64, 16.77 + z]}
              rotation={[0, angle, 0]}
            />
          );
        })}
      <CylinderCollider
        args={[0.1, 5]}
        position={[0, -16.64, 16.77]}
        sensor
        onIntersectionEnter={(collision) => {
          onSelection(collision.colliderObject?.parent?.userData.ballData);
        }}
      />

      <primitive
        object={cageModel.nodes.stand}
        scale={100}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </RigidBody>
  );
});
