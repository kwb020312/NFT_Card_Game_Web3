import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CustomButton, CustomInput, PageHOC } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const {
    contract,
    walletAddress,
    gameData,
    setShowAlert,
    setErrorMessage,
    updateCurrentWalletAddress,
  } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const test = await await window?.ethereum?.request({
        method: "eth_requestAccounts",
      });

      console.log(test[0]);
      const playerExists = await contract.isPlayer(walletAddress);
      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate("/create-battle"), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    const createPlayerToken = async () => {
      // console.log(walletAddress);
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate("/create-battle");
    };

    if (contract) createPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.activeBattle) {
      navigate(`/battle/${gameData.activeBattle.name}`);
    }
  }, [gameData]);

  return (
    walletAddress && (
      <div className="flex flex-col">
        <CustomInput
          label="이름"
          placeHolder="플레이어의 이름을 입력해주세요"
          value={playerName}
          handleValueChange={setPlayerName}
        />

        <CustomButton
          title="회원가입"
          handleClick={handleClick}
          restStyles="mt-6"
        />
      </div>
    )
  );
};

export default PageHOC(
  Home,
  <>
    환영합니다. <br /> NFT 카드 게임을 즐겨보세요
  </>,
  <>
    게임을 즐기기 위해 당신의 NFT 지갑을 연동해주세요 <br /> 액션 넘치는 카드
    게임이 기다리고있습니다.
  </>
);
