import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles";
import { useGlobalContext } from "../context";

import { PageHOC, CustomButton, CustomInput, GameLoad } from "../components";

const CreateBattle = () => {
  const { contract, battleName, setBattleName, gameData, setErrorMessage } =
    useGlobalContext();

  const [waitBattle, setWaitBattle] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput
          label="배틀"
          placeholder="생성할 방 이름을 입력해주세요."
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title={"방 생성하기"}
          handleClick={handleClick}
          restStyles={"mt-6"}
        />
      </div>
      <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
        혹은 존재하는 다른 전투에 참여하십시오!
      </p>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    방 생성하기 <br /> 새로운 배틀을 시작합니다
  </>,
  <>자신만의 배틀을 생성하고 다른 플레이어들이 들어오기를 기다리세요.</>
);
