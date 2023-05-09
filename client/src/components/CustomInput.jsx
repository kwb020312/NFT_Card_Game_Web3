import React from "react";

import styles from "../styles";

const CustomInput = ({ label, placeholder, value, handleValueChange }) => {
  return (
    <>
      <label htmlFor="name" className={styles.label}>
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          handleValueChange(e.target.value);
        }}
        className={styles.input}
      />
    </>
  );
};

export default CustomInput;
