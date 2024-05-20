import * as React from "react";
import Main from "../components/container/Main";
import Content from "../components/container/Content";
import RegisterUserCommon from "../components/RegisterUserCommon";
import ModelUserCommon from "../models/UserCommon";
import RegisterAddress from "../components/RegisterAddress";

enum RegisterStep {
  common,
  address,
  metadata,
}

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [step, setStep] = React.useState<RegisterStep>(RegisterStep.common);
  const userCommonRef = React.useRef<ModelUserCommon | undefined>(undefined);
  const addressRef = React.useRef<number | undefined>(undefined);

  const handleUserCommonStep = (user: ModelUserCommon) => {
    userCommonRef.current = user;
    setStep(RegisterStep.address);
  };

  const handleAddressStep = (address: number | undefined) => {
    if (address !== undefined) {
      addressRef.current = address;
      setStep(RegisterStep.metadata);
      return;
    }

    setMessageError("Não foi possível cadastrar endereço 2");
  };

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
        {step === RegisterStep.address && (
          <RegisterAddress
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleAddressStep}
          />
        )}
        {step === RegisterStep.metadata && <h1>Teste</h1>}
      </Content>
    </Main>
  );
}
