import GridAdoptionAnimal from "../components/GridAdoptedAnimal";
import PageLayout from "../components/layouts/PageLayout";
import UserContextNode from "../components/UserContextNode";

export default function AnimalAdoptedList() {
  return (
    <UserContextNode>
      <PageLayout bgcolor="secondary.light" color="primary.contrastText">
        <GridAdoptionAnimal />
      </PageLayout>
    </UserContextNode>
  );
}
