import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MirroredRepeatWrapping, RepeatWrapping } from "three";

export const Floor = () => {
  const texture = useTexture("./textures/oak.jpg");
  texture.repeat.set(3, 3);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = MirroredRepeatWrapping;

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -18.9, 0]}>
        <planeGeometry args={[150, 100]} />
        <meshStandardMaterial map={texture} />
      </mesh>
    </RigidBody>
  );
};
