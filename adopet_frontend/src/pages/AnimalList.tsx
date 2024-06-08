import GridAnimal from "../components/GridAnimal";
import PageLayout from "../components/layouts/PageLayout";

export default function AnimalList() {
  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridAnimal />
    </PageLayout>
  );
}
