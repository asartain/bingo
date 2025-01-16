import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import styles from "./App.module.css";
import { Lights } from "./ThreeObjects/Lights";
import { Experience } from "./Experience";
import { useEffect, useRef, useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { Controls } from "./components/controls/controls";
import {
  compressToEncodedURIComponent,
  decompressFromEncodedURIComponent,
} from "lz-string";
import { SelectedBall } from "./components/selectedBall/selectedBall";
import { Vector3 } from "three";

export type TOption = {
  name: string;
  ballText: string;
  quantity: number;
  manualBallText: boolean;
};

function App() {
  const [options, setOptions] = useState<TOption[]>([]);
  const [selectedBall, setSelectedBall] = useState<TOption | null>(null);
  const orbitControls = useRef();

  const debug = window.location.search.includes("debug");

  // get options from URL on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const optionString = params.get("options");
    if (optionString) {
      const options = JSON.parse(
        decompressFromEncodedURIComponent(optionString)
      );
      setOptions(options);
    }
  }, []);

  // set options in URL for sharing
  useEffect(() => {
    const url = new URL(window.location.href);
    if (options.length > 0) {
      url.searchParams.set(
        "options",
        compressToEncodedURIComponent(JSON.stringify(options))
      );
      history.replaceState(history.state, "", url.href);
    }
  }, [options]);

  const onSelection = (ball: TOption) => {
    if (orbitControls.current) {
      // @ts-expect-error - using any type
      orbitControls.current.enabled = false;
    }
    setSelectedBall(ball);
  };

  return (
    <div className={styles.app}>
      <Controls balls={options} setOptions={setOptions} />

      {selectedBall && (
        <SelectedBall
          option={selectedBall}
          onClose={() => {
            setSelectedBall(null);
            if (orbitControls.current) {
              // @ts-expect-error - using any type
              orbitControls.current.enabled = true;
            }
          }}
        />
      )}

      <Canvas camera={{ position: [20, 10, 20] }}>
        {/* @ts-expect-error - using any type */}
        <OrbitControls ref={orbitControls} target={new Vector3(0, -5, 0)} />
        <Lights />

        <Physics gravity={[0, -300, 0]} debug={debug}>
          <Experience options={options} onSelection={onSelection} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default App;
