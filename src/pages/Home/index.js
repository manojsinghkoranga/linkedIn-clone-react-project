
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
  
`;

const Layout = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
  @media(max-width: 678px){
    flex-wrap: wrap;
    max-width: 90%;
  }
`;

export default Home;