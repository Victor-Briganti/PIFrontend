import GridRequestAnimal from "../components/GridRequestAnimal";
import PageLayout from "../components/layouts/PageLayout";
import UserContextNode from "../components/UserContextNode";

export default function AnimalRequestList() {
  return (
    <UserContextNode>
      <PageLayout bgcolor="secondary.light" color="primary.contrastText">
        <GridRequestAnimal />
      </PageLayout>
    </UserContextNode>
  );
}
