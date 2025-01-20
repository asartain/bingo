import { useGLTF } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { forwardRef } from "react";

export const Handle = forwardRef<RapierRigidBody, {}>((props, ref) => {
  const cageModel = useGLTF("./3dModels/bingoCage.gltf");

  // const onPointerEnter = () => {
  //   document.body.style.cursor = "grab";
  //   // stop orbit controls
  //   // set rotation to follow mouse
  // };

  // const onPointerLeave = () => {
  //   document.body.style.cursor = "unset";
  //   // start orbit controls
  // };

  return (
    <RigidBody ref={ref}>
      <primitive
        object={cageModel.nodes.handle}
        scale={100}
        // onPointerEnter={onPointerEnter}
        // onPointerLeave={onPointerLeave}
      />
    </RigidBody>
  );
});
