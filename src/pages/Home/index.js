
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

const Content = styled.div`
    max-width: 1128px;
    margin-left: auto;
    margin-right: auto;
`;

const Layout = styled.div`
    display: grid;
    grid-template-areas: "leftside center rightside";
    /* grid-template-columns: minmax(0 5fr) minmax(0, 12fr) minmax(300px, 7fr); */
    column-gap: 25px;
    row-gap: 25px;
    /* grid-template-rows: auto; */
    margin: 25px 0;
    @media(max-width: 768px){
        display: flex;
        flex-direction: column;
        padding: 0 5px;
    }
    @media(max-width: 1080px){
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
`;

export default Home;