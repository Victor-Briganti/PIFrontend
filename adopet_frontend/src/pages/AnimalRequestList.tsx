import GridRequestAnimal from "../components/GridRequestAnimal";
import PageLayout from "../components/layouts/PageLayout";

export default function AnimalRequestList() {
  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridRequestAnimal />
    </PageLayout>
  );
}
