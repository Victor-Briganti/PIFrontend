import * as React from "react";
import * as Router from "react-router-dom";
import RegisterAddress from "../components/RegisterAddress";
import RegisterUserCommon from "../components/RegisterUserCommon";
import FormLayout from "../components/layouts/FormLayout";
import RegisterUserMetadata from "../components/RegisterUserMetadata";

enum RegisterStep {
  common,
  address,
  metadata,
}

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [step, setStep] = React.useState<RegisterStep>(RegisterStep.common);
  const [userId, setUserId] = React.useState<number>();
  const [addressId, setAddressId] = React.useState<number>();
  const navigate = Router.useNavigate();

  const handleUserCommonStep = React.useCallback((user: number | undefined) => {
    setUserId(user);
    setStep(RegisterStep.address);
  }, []);

  const handleAddressStep = React.useCallback((address: number | undefined) => {
    if (address !== undefined) {
      setAddressId(address);
      setStep(RegisterStep.metadata);
      return;
    }

    setMessageError("Não foi possível cadastrar endereço");
  }, []);

  const handleUserMetadataStep = React.useCallback(
    () => navigate("/"),
    [navigate]
  );

  return (
    <FormLayout>
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
          user={userId}
          address={addressId}
          messageError={messageError}
          setMessageError={setMessageError}
          handleRegisterStep={handleUserMetadataStep}
        />
      )}
    </FormLayout>
  );
}
