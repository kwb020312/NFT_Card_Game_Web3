import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { Alert } from "../components";
import { battlegrounds } from "../assets";
import { useGlobalContext } from "../context";

const Battleground = () => {
  const { setShowAlert, showAlert, setBattleGround } = useGlobalContext();
  const navigate = useNavigate();

  const handleBattleGroundChoice = (ground) => {
    setBattleGround(ground.id);
    localStorage.setItem("battleground", ground.id);

    setShowAlert({
      status: true,
      type: "info",
      message: `${ground.name}에서의 전투가 준비되었습니다.`,
    });

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )}
      <h1 className={`${styles.headText} text-center`}>
        당신의 <span className="text-siteViolet">전장</span>을 골라주세요
      </h1>

      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
        {battlegrounds.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.flexCenter} ${styles.battleGroundCard}`}
            onClick={() => handleBattleGroundChoice(ground)}
          >
            <img
              src={ground.image}
              alt="ground"
              className={styles.battleGroundCardImg}
            />

            <div className="info absolute">
              <p className={styles.battleGroundCardText}>{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Battleground;
