import GridAnimal from "../components/GridAnimal";
import PageDynamicLayout from "../components/layouts/PageDynamicLayout";

export default function AnimalList() {
  return (
    <PageDynamicLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridAnimal />
    </PageDynamicLayout>
  );
}
