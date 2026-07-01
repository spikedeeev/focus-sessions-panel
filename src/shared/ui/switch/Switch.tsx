import type { ChangeEvent } from "react";
import styles from "./style.module.scss";

type SwitchProps = {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Switch({ checked, onChange }: SwitchProps) {
  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={styles.slider}></span>
    </label>
  );
}

export default Switch;
