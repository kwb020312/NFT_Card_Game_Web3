import React, { useState } from "react";

import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex flex-col">
      <CustomInput
        label="플레이어 이름"
        placeholder="플레이어 이름을 입력해주세요."
        value={playerName}
        handleValueChange={setPlayerName}
      />
      <CustomButton
        title="회원가입하기"
        handleClick={handleClick}
        restStyles="mt-6"
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Web3.0 기반의 카드 게임인 <br /> Avax Gods에 오신것을 환영합니다.
  </>,
  <>시작하기에 앞서, 당신의 NFT 지갑을 연결하고 카드 배틀에 참여하세요!</>
);
