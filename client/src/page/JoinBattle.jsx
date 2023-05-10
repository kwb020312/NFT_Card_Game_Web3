import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGlobalContext } from "../context";
import { CustomButton, PageHOC } from "../components";

import styles from "../styles";

const JoinBattle = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2 className={styles.joinHeadText}>참여가능한 전투:</h2>
      <p className={styles.infoText} onClick={() => navigate("/create-battle")}>
        혹은 새로운 방을 생성하세요
      </p>
    </>
  );
};

export default PageHOC(
  JoinBattle,
  <>
    전투방에
    <br /> 참가하세요
  </>,
  <>이미 생성된 방에 참가하세요</>
);
