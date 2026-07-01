import styles from "./style.module.scss";
import type { ChangeEvent } from "react";

type InputProps = {
  value: string | number;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ value, placeholder, onChange }: InputProps) {
  return (
    <input
      placeholder={placeholder}
      className={styles.input}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
