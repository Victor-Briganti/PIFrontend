import GridAdoptionAnimal from "../components/GridAdoptionAnimal";
import PageDynamicLayout from "../components/layouts/PageDynamicLayout";

export default function AnimalAdoptionList() {
  return (
    <PageDynamicLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridAdoptionAnimal />
    </PageDynamicLayout>
  );
}
