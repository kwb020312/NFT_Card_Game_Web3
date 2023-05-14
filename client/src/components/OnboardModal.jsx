import { useState, useEffect } from "react";
import Modal from "react-modal";

import styles from "../styles";
import { CustomButton } from ".";
import { useGlobalContext } from "../context";
import { GetParams, SwitchNetwork } from "../utils/onboard.js";

const OnboardModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { updateCurrentWalletAddress } = useGlobalContext();
  const [step, setStep] = useState(-1);

  async function resetParams() {
    const currentStep = await GetParams();
    setStep(currentStep.step);
    setIsOpen(currentStep.step !== -1);
  }

  useEffect(() => {
    resetParams();

    window?.ethereum?.on("chainChanged", () => {
      resetParams();
    });

    window?.ethereum?.on("accountsChanged", () => {
      resetParams();
    });
  }, []);

  const generateStep = (st) => {
    switch (st) {
      case 0:
        return (
          <>
            <p className={styles.modalText}>
              Core Wallet을 설치한 뒤 다시 시도해주세요!
            </p>
            <CustomButton
              title="Download Core"
              handleClick={() => window.open("https://core.app/", "_blank")}
            />
          </>
        );

      case 1:
        return (
          <>
            <p className={styles.modalText}>
              Core Wallet에 해당 계정이 연동되지 않았습니다!
            </p>
            <CustomButton
              title="Connect Account"
              handleClick={updateCurrentWalletAddress}
            />
          </>
        );

      case 2:
        return (
          <>
            <p className={styles.modalText}>
              Fuji C-Chain네트워크와 다른 네트워크에 연결되어 있습니다.
            </p>
            <CustomButton title="Switch" handleClick={SwitchNetwork} />
          </>
        );

      case 3:
        return (
          <>
            <p className={styles.modalText}>
              오우, 당신의 계정에 필요한 만큼의 Avax 토큰이 없네요..
            </p>
            <CustomButton
              title="Grab some test tokens"
              handleClick={() =>
                window.open("https://faucet.avax.network/", "_blank")
              }
            />
          </>
        );

      default:
        return <p className={styles.modalText}>아무 이상 없음!</p>;
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      className={`absolute inset-0 ${styles.flexCenter} flex-col ${styles.glassEffect}`}
      overlayClassName="Overlay"
    >
      {generateStep(step)}
    </Modal>
  );
};

export default OnboardModal;
