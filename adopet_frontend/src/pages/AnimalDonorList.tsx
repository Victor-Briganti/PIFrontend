import GridDonorAnimal from "../components/GridDonorAnimal";
import PageLayout from "../components/layouts/PageLayout";

export default function AnimalDonorList() {
  return (
    <PageLayout bgcolor="secondary.light" color="primary.contrastText">
      <GridDonorAnimal />
    </PageLayout>
  );
}
