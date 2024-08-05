import * as React from "react";
import * as Router from "react-router-dom";
import * as MUI from "@mui/material";
import AxiosAnimal from "../api/AxiosAnimal";
import RegisterAnimal from "../components/RegisterAnimal";
import FormLayout from "../components/layouts/FormLayout";
import InterfaceAnimal from "../models/interfaces/animal/InterfaceAnimal";
import { InterfaceAnimalImageFile } from "../models/interfaces/animal/InterfaceAnimalImage";
import UserContext from "../hooks/UserContext";

export default function AnimalRegister() {
  const [messageError, setMessageError] = React.useState<string>("");
  const navigate = Router.useNavigate();
  const user = React.useContext(UserContext);

  const handleRegister = React.useCallback(
    async (animal: InterfaceAnimal, images: InterfaceAnimalImageFile[]) => {
      const axiosAnimal = new AxiosAnimal();
      let hasImages = false;

      if (images.length === 0) {
        setMessageError("Animal precisa ser cadastrado com ao menos uma foto");
        return;
      }

      const response = await axiosAnimal
        .registerAnimal(animal)
        .catch((error) => {
          setMessageError("Animal não pode ser cadastrado");
          return;
        });

      if (response !== undefined) {
        if (response.id) {
          for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (image === undefined) {
              setMessageError("Imagens não definidas para o animal");
              return;
            }

            image.animal = response.id;
            axiosAnimal.uploadImage(image).catch((error) => {
              setMessageError("Erro ao enviar imagem");
              return;
            });
            hasImages = true;
          }

          if (hasImages === false) {
            animal.is_active = false;
            axiosAnimal.updateAnimal(animal);
          }

          navigate("/");
          return;
        }
      }
    },
    [navigate],
  );

  if (user.context === null) {
    return (
      <React.Fragment>
        <h1>Faça login para acessar.</h1>
        <MUI.Box sx={{ mt: 2 }}>
          <MUI.Link
            component={Router.Link}
            to={"/"}
            variant="body2"
            fontSize={20}
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            Voltar para home
          </MUI.Link>
        </MUI.Box>
      </React.Fragment>
    );
  }

  return (
    <FormLayout>
      <RegisterAnimal
        messageError={messageError}
        setMessageError={setMessageError}
        handleRegister={handleRegister}
      />
    </FormLayout>
  );
}
