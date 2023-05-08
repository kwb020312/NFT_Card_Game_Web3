import React, { useState } from "react";

import { PageHOC, CustomInput } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  return (
    <div className="flex flex-col">
      <CustomInput
        label="플레이어 이름"
        placeholder="플레이어 이름을 입력해주세요."
        value={playerName}
        handleValueChange={setPlayerName}
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
