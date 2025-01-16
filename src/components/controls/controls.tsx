import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { TOption } from "../../App";
import styles from "./controls.module.css";

export const Controls = ({
  balls,
  setOptions,
}: {
  balls: TOption[];
  setOptions: Dispatch<SetStateAction<TOption[]>>;
}) => {
  const [showSidePanel, setShowSidePannel] = useState(true);

  const onChange = (
    ev: ChangeEvent<HTMLInputElement>,
    index: number,
    field: "name" | "ballText" | "quantity"
  ) => {
    const newBalls = [...balls];
    const value = ev.target.value;

    if (field === "quantity") {
      newBalls[index][field] = parseInt(value);
    }

    // @ts-expect-error - dodgy types to fix
    newBalls[index][field] = value;

    // calculate ballText from name
    if (field === "name" && newBalls[index].manualBallText === false) {
      const splitWords = value.split(" ");
      const ballText =
        (splitWords[0]?.[0]?.toUpperCase() || "") +
        (splitWords[1]?.[0]?.toUpperCase() || "");
      newBalls[index].ballText = ballText;
    }

    // handle if ball text should be generated
    if (field === "ballText") {
      newBalls[index].manualBallText = true;
    }
    if (field === "name" && value === "") {
      newBalls[index].manualBallText = false;
    }

    setOptions(newBalls);
  };

  const deleteBall = (index: number) => {
    const newBalls = [...balls].filter((_, i) => i !== index);
    setOptions(newBalls);
  };

  const addBall = (quantity: number = 5) => {
    const index = balls.length;
    setOptions([
      ...balls,
      {
        name: "",
        ballText: `${index.toString().padStart(2, "0")}`,
        quantity: quantity,
        manualBallText: false,
      },
    ]);
  };

  const enterPressed = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      addBall();
      // hack to make sure new iunputs have been rendered
      setTimeout(() => {
        Array.from(document.querySelectorAll("input")).at(-2)?.focus();
      }, 1);
    }
  };

  return (
    <div className={clsx(styles.controls, showSidePanel && styles.show)}>
      <button
        className={styles.tab}
        onClick={() => setShowSidePannel(!showSidePanel)}
      >
        <span
          style={showSidePanel ? { rotate: "90deg" } : { rotate: "-90deg" }}
        >
          ⇧
        </span>
      </button>
      <div className={styles.inputs}>
        {balls.map((ball, index) => {
          return (
            <div key={index} className={styles.row}>
              <input
                value={ball.ballText}
                className={styles.ballInput}
                onChange={(ev) => onChange(ev, index, "ballText")}
              ></input>
              <input
                value={ball.name}
                className={styles.ballName}
                onKeyDown={enterPressed}
                onChange={(ev) => onChange(ev, index, "name")}
              ></input>
              <input
                value={ball.quantity}
                type="number"
                className={styles.quantityInput}
                onChange={(ev) => onChange(ev, index, "quantity")}
              ></input>
              <button
                onClick={() => deleteBall(index)}
                className={styles.deleteBtn}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
      <button onClick={() => addBall()} className={styles.button}>
        +
      </button>
    </div>
  );
};
