import Main from "../components/container/Main";
import Content from "../components/container/Content";
import Header from "../components/Header";
import Footer from "../components/Footer";

// const axiosUser = new AxiosUser();

export default function Teste() {
  // const [sessionId, setSessionId] = React.useState(null);

  // React.useEffect(() => {
  //   async function fetchSessionId() {
  //     try {
  //       const session = await axiosUser.getSessionId();
  //       console.log(session);
  //     } catch (error) {
  //       console.error("Error fetching session ID:", error);
  //     }
  //   }
  //   fetchSessionId();
  // }, []); // Empty dependency array to run effect only once

  return (
    <Main bgcolor="secondary.light" color="primary.contrastText">
      <Header />
      <Content>
        <h1>Teste</h1>
      </Content>
      <Footer />
    </Main>
  );
}
