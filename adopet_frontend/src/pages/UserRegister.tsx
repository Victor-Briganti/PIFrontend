import * as React from "react";
import RegisterAddress from "../components/RegisterAddress";
import RegisterUserCommon from "../components/RegisterUserCommon";
import Content from "../components/container/Content";
import Main from "../components/container/Main";
import { useNavigate } from "react-router-dom";
import RegisterUserMetadata from "../components/RegisterUserMetadata";

enum RegisterStep {
  common,
  address,
  metadata,
}

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [step, setStep] = React.useState<RegisterStep>(RegisterStep.common);
  const userCommonRef = React.useRef<number | undefined>(undefined);
  const addressRef = React.useRef<number | undefined>(undefined);
  const navigate = useNavigate();

  const handleUserCommonStep = (user: number | undefined) => {
    userCommonRef.current = user;
    setStep(RegisterStep.address);
  };

  const handleAddressStep = (address: number | undefined) => {
    if (address !== undefined) {
      addressRef.current = address;
      setStep(RegisterStep.metadata);
      return;
    }

    setMessageError("Não foi possível cadastrar endereço");
  };

  const handleUserMetadataStep = () => navigate("/");

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
        {step === RegisterStep.metadata && (
          <RegisterUserMetadata
            user={userCommonRef.current}
            address={addressRef.current}
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleUserMetadataStep}
          />
        )}
      </Content>
    </Main>
  );
}
