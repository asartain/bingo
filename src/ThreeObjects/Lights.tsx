export const Lights = () => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight color="white" intensity={2} position={[0, 0, 5]} />
    </>
  );
};
