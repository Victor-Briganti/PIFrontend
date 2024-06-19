import GridAdoptionAnimal from "../components/GridAdoptedAnimal";
import PageLayout from "../components/layouts/PageLayout";

export default function AnimalAdoptedList() {
  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridAdoptionAnimal />
    </PageLayout>
  );
}
