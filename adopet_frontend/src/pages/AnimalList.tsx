import * as MUI from "@mui/material";
import * as React from "react";
import AxiosAnimal from "../api/AxiosAnimal";
import GridAnimal from "../components/GridAnimal";
import Filter from "../components/elements/Filter";
import PageLayout from "../components/layouts/PageLayout";
import AgeChoiceMap from "../models/map_choices/AgeChoiceMap";
import CoatChoiceMap from "../models/map_choices/CoatChoiceMap";
import GenderChoiceMap from "../models/map_choices/GenderChoiceMap";
import SizeChoiceMap from "../models/map_choices/SizeChoiceMap";
import SpecieChoiceMap from "../models/map_choices/SpecieChoiceMap";

export default function AnimalList() {
  const [messageError, setMessageError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [animals, setAnimals] = React.useState([]);
  const [page, setPage] = React.useState<number>(1);
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [gender, setGender] = React.useState<string>("");
  const [age, setAge] = React.useState<string>("");
  const [coat, setCoat] = React.useState<string>("");
  const [size, setSize] = React.useState<string>("");
  const [specie, setSpecie] = React.useState<string>("");
  const genderMap = React.useMemo(() => new GenderChoiceMap(), []);
  const ageMap = React.useMemo(() => new AgeChoiceMap(), []);
  const coatMap = React.useMemo(() => new CoatChoiceMap(), []);
  const sizeMap = React.useMemo(() => new SizeChoiceMap(), []);
  const specieMap = React.useMemo(() => new SpecieChoiceMap(), []);
  const axiosAnimal = React.useMemo(() => new AxiosAnimal(), []);

  const handleGender = (gender: string) => {
    setGender(gender);
  };

  const handleAge = (age: string) => {
    setAge(age);
  };

  const handleCoat = (coat: string) => {
    setCoat(coat);
  };

  const handleSize = (size: string) => {
    setSize(size);
  };

  const handleSpecie = (specie: string) => {
    setSpecie(specie);
  };

  React.useEffect(() => {
    if (
      age === "" &&
      coat === "" &&
      size === "" &&
      specie === "" &&
      gender === ""
    ) {
      axiosAnimal
        .listAnimals()
        .then((response) => {
          setAnimals(response.results);
          setTotalPages(Math.ceil(response.count / 9));
        })
        .catch((error) => {
          setMessageError(error);
        });
    } else {
      let ageValue = "";
      let specieValue = "";
      let genderValue = "";
      let sizeValue = "";
      let coatValue = "";

      if (age !== undefined) {
        ageValue = ageMap.getKeyByValue(age) ?? "";
      }

      if (specie !== undefined) {
        specieValue = specieMap.getKeyByValue(specie) ?? "";
      }

      if (gender !== undefined) {
        genderValue = genderMap.getKeyByValue(gender) ?? "";
      }

      if (size !== undefined) {
        sizeValue = sizeMap.getKeyByValue(size) ?? "";
      }

      if (coat !== undefined) {
        coatValue = coatMap.getKeyByValue(coat) ?? "";
      }

      axiosAnimal
        .listAnimals([ageValue, coatValue, sizeValue, specieValue, genderValue])
        .then((response) => {
          setAnimals(response.results);
          setTotalPages(Math.ceil(response.count / 9));
        })
        .catch((error) => {
          setMessageError(error);
        });
    }

    setLoading(false);
  }, [
    axiosAnimal,
    age,
    coat,
    size,
    specie,
    gender,
    ageMap,
    specieMap,
    genderMap,
    sizeMap,
    coatMap,
  ]);

  const handlePageChange = React.useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      setLoading(true);
      event.preventDefault();

      if (
        age === "" &&
        coat === "" &&
        size === "" &&
        specie === "" &&
        gender === ""
      ) {
        axiosAnimal
          .listAnimals([], value)
          .then((response) => {
            setAnimals(response.results);
            setPage(value);
          })
          .catch((error) => {
            setMessageError(error);
          });
      } else {
        let ageValue = "";
        let specieValue = "";
        let genderValue = "";
        let sizeValue = "";
        let coatValue = "";

        if (age !== undefined) {
          ageValue = ageMap.getKeyByValue(age) ?? "";
        }

        if (specie !== undefined) {
          specieValue = specieMap.getKeyByValue(specie) ?? "";
        }

        if (gender !== undefined) {
          genderValue = genderMap.getKeyByValue(gender) ?? "";
        }

        if (size !== undefined) {
          sizeValue = sizeMap.getKeyByValue(size) ?? "";
        }

        if (coat !== undefined) {
          coatValue = coatMap.getKeyByValue(coat) ?? "";
        }

        axiosAnimal
          .listAnimals(
            [ageValue, coatValue, sizeValue, specieValue, genderValue],
            value
          )
          .then((response) => {
            setAnimals(response.results);
            setTotalPages(Math.ceil(response.count / 9));
          })
          .catch((error) => {
            setMessageError(error);
          });
      }
      setLoading(false);
    },
    [
      age,
      coat,
      size,
      specie,
      gender,
      axiosAnimal,
      ageMap,
      specieMap,
      genderMap,
      sizeMap,
      coatMap,
    ]
  );

  return (
    <PageLayout color="primary.contrastText">
      <Filter
        age={age}
        gender={gender}
        size={size}
        specie={specie}
        coat={coat}
        handleAge={handleAge}
        handleGender={handleGender}
        handleSize={handleSize}
        handleSpecie={handleSpecie}
        handleCoat={handleCoat}
      />
      <GridAnimal
        page={page}
        totalPages={totalPages}
        loading={loading}
        messageError={messageError}
        animals={animals}
        handlePageChange={handlePageChange}
      />
    </PageLayout>
  );
}
