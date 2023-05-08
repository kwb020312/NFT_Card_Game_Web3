import React from "react";

import { PageHOC } from "../components";

const CreateBattle = () => {
  return <div></div>;
};

export default PageHOC(
  CreateBattle,
  <>
    방 생성하기 <br /> 새로운 배틀을 시작합니다
  </>,
  <>자신만의 배틀을 생성하고 다른 플레이어들이 들어오기를 기다리세요.</>
);
