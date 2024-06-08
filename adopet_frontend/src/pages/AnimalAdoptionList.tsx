import GridAdoptionAnimal from "../components/GridAdoptionAnimal";
import PageLayout from "../components/layouts/PageLayout";

export default function AnimalAdoptionList() {
  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridAdoptionAnimal />
    </PageLayout>
  );
}
