import { TOption } from "../../App";
import styles from "./selectedBall.module.css";

export const SelectedBall = ({
  option,
  onClose,
}: {
  option: TOption;
  onClose: () => void;
}) => {
  return (
    <div className={styles.selectedBall}>
      <div className={styles.ballText}>{option.ballText}</div>
      <button className={styles.close} onClick={onClose}>
        X
      </button>
      <h1>{option.name}</h1>
    </div>
  );
};
