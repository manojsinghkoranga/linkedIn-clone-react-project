
import NavBar from "../../shared/components/NavBar";
import Leftside from "./leftContainer";
import Rightside from "./rightContainer";
import Center from "./center";
import styled from "styled-components";


function Home() {
  return (
    <>
      <NavBar />
      <Container>
        <Layout>
          <Leftside />
          <Center />
          <Rightside />
        </Layout>
      </Container>
    </>
  );
}

const Container = styled.div`
  max-width: 100%;
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

export default Home;