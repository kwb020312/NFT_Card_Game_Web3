import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageHOC, CustomInput, CustomButton } from "../components";
import { useGlobalContext } from "../context";

const Home = () => {
  const { contract, walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState("");

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log(contract);
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({
          status: true,
          type: "info",
          message: `${playerName}님이 소환되었습니다!`,
        });
      }
    } catch (error) {
      console.log(error, error.message);
      setShowAlert({
        status: true,
        type: "failure",
        message: "에러가 발생했습니다.",
      });
      alert(error);
    }
  };

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract.isPlayer(walletAddress);
      const playerTokenExists = await contract.isPlayerToken(walletAddress);

      console.log({
        playerExists,
        playerTokenExists,
      });

      if (playerExists && playerTokenExists) navigate("/create-battle");

      if (contract) checkForPlayerToken();
    };
  }, [contract]);

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
