import * as React from "react";
import * as Router from "react-router-dom";
import RegisterAddress from "../components/RegisterAddress";
import RegisterUserCommon from "../components/RegisterUserCommon";
import RegisterUserMetadata from "../components/RegisterUserMetadata";
import TopArrowBack from "../components/elements/navigation/TopArrowBack";
import FormLayout from "../components/layouts/FormLayout";

enum RegisterStep {
  common,
  address,
  metadata,
}

export default function UserRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const [step, setStep] = React.useState<RegisterStep>(RegisterStep.common);
  const navigate = Router.useNavigate();

  const handleUserCommonStep = React.useCallback(() => {
    setStep(RegisterStep.address);
  }, []);

  const handleAddressStep = React.useCallback(() => {
    setStep(RegisterStep.metadata);
  }, []);

  const handleUserMetadataStep = React.useCallback(
    () => navigate("/"),
    [navigate]
  );

  return (
    <FormLayout>
      {step === RegisterStep.common && (
        <React.Fragment>
          <TopArrowBack />
          <RegisterUserCommon
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleUserCommonStep}
          />
        </React.Fragment>
      )}

      {step === RegisterStep.address && (
        <React.Fragment>
          <TopArrowBack />
          <RegisterAddress
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleAddressStep}
          />
        </React.Fragment>
      )}

      {step === RegisterStep.metadata && (
        <React.Fragment>
          <TopArrowBack />
          <RegisterUserMetadata
            messageError={messageError}
            setMessageError={setMessageError}
            handleRegisterStep={handleUserMetadataStep}
          />
        </React.Fragment>
      )}
    </FormLayout>
  );
}
