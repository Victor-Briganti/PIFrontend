import * as React from "react";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import RegisterUserCommon from "../components/RegisterUserCommon";
import ModelUserCommon from "../models/UserCommon";

enum RegisterStep {
  common,
  address,
  metadata,
}

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [step, setStep] = React.useState<RegisterStep>(RegisterStep.common);
  const userCommonRef = React.useRef<ModelUserCommon | undefined>(undefined);

  const handleUserCommonStep = (user: ModelUserCommon) => {
    userCommonRef.current = user;
    setStep(RegisterStep.metadata);
  };

  // const handleAddressStep = (address: ModelAddress | undefined) => {
  //   if (address !== undefined && address.getId() !== undefined) {
  //     addressRef.current = address.getId();
  //     setStep(RegisterStep.metadata);
  //     return;
  //   }

  //   setMessageError("Não foi possível cadastrar endereço 2");
  // };

  return (
    <Main>
      <Content>
        {step === RegisterStep.common && (
          <RegisterUserCommon
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleUserCommonStep}
          />
        )}
        {/* {step === RegisterStep.address && (
          <RegisterAddress
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleAddressStep}
          />
        )} */}
        {step === RegisterStep.metadata && <h1>Testado</h1>}
      </Content>
    </Main>
  );
}
