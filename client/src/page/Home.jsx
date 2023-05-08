import React from "react";

import { PageHOC } from "../components";

const Home = () => {
  return (
    <div>
      <h1 className="text-5xl p-3">Avax Gods</h1>
      <h2 className="text-3xl p-3">Web3.0 NFT 전략 카드게임</h2>
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
