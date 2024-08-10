import GridDonorAnimal from "../components/GridDonorAnimal";
import PageLayout from "../components/layouts/PageLayout";
import UserContextNode from "../components/UserContextNode";

export default function AnimalDonorList() {
  return (
    <UserContextNode>
      <PageLayout bgcolor="secondary.light" color="primary.contrastText">
        <GridDonorAnimal />
      </PageLayout>
    </UserContextNode>
  );
}
