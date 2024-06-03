import GridDonorAnimal from "../components/GridDonorAnimal";
import PageDynamicLayout from "../components/layouts/PageDynamicLayout";

export default function AnimalDonorList() {
  return (
    <PageDynamicLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridDonorAnimal />
    </PageDynamicLayout>
  );
}
