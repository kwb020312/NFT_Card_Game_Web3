import React from "react";
import { useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";
import { useGlobalContext } from "../context";
import { player01, player02 } from "../assets";
import styles from "../styles";

const GameLoad = () => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title="전투 지역을 선택해주세요."
          handleClick={() => navigate("/battleground")}
          restStyles="mt-6"
        />
      </div>
      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          용감한 대전자를
          <br />
          탐색중입니다...
        </h1>
        <p className={styles.gameLoadText}>
          대전자를 탐색하는동안, 전투 지역을 선택해주세요.
        </p>
        <div className={styles.gameLoadPlayersBox}>
          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player01}
              alt="player1"
              className={styles.gameLoadPlayerImg}
            />
            <p className={styles.gameLoadPlayerText}>플레이어(나)</p>
          </div>

          <h2 className={styles.gameLoadVS}>VS</h2>
          <div className={`${styles.flexCenter} flex-col`}>
            <img
              src={player02}
              alt="player2"
              className={styles.gameLoadPlayerImg}
            />
            <p className={styles.gameLoadPlayerText}>플레이어(상대방)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
