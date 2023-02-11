import { Link } from "react-router-dom";
import styled from "styled-components";

const Navigation = () => {

    return (
     <ContainerWrapper >
        <Link to="/">
          <LogoContainer >
            <img src="images/LinkedIn-Logo.wine.svg" alt=""/>
          </LogoContainer>
        </Link>
      </ContainerWrapper> 
    )
}

const ContainerWrapper = styled.div`
  height: 60px;
  width: 100vw;;
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
`;

const LogoContainer = styled.div`
  height: 48px;
  width: auto;
  display: flex;
  align-items: center;
  margin-left: 50px;
  & > img{
    height: 60px;
    width: auto;
  }
  &:hover{
    opacity: 0.8;
  }
`;

const SearchBar = styled.div`
  height: 30px;
  background-color: rgba(232, 230, 230, 0.6);
  width: 200px;
  display: flex;
  align-items: center;
  & > img{
    height: 20px;
    width: auto;
    margin-left: 12px;
  }
`;

const Text = styled.p`
  color: gray;
  margin-left: 5px;
`;

const LogoutContainer = styled.div`
  position: absolute;
  right: 60px;
`;

export default Navigation;