
import { signOut } from "../../services/firebase/auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

function NavBar() {
  const [userImage, setUserImage] = useState("/images/user.svg");
  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);

  useEffect(() => {
    if(userInfo.imageUrl !== undefined){
      setUserImage(userInfo.imageUrl);
    }
  }, [userInfo])

  const onLogOutButtonClick = () => {
    signOut();
  };

  return (
    <>
       <Container>
            <Content>
                <Logo >
                    <a href="/home">
                        <img src="/images/home-logo.svg" alt="" />
                    </a>
                </Logo>
                <Search>
                    <div>
                        <input type={'text'} placeholder={'Search'} />
                    </div>
                    <SearchIcon>
                        <img src="/images/search-icon.svg" alt="" />
                    </SearchIcon>
                </Search>
                <Nav>
                    <NavListWrap>
                        <NavList className="active">
                            <a >
                                <img src="/images/nav-home.svg" alt=""/>
                                <span>Home</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src="/images/nav-network.svg" alt=""/>
                                <span>My Networks</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src="/images/nav-jobs.svg" alt=""/>
                                <span>Jobs</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src="/images/nav-messaging.svg" alt=""/>
                                <span>Messaging</span>
                            </a>
                        </NavList>
                        <NavList>
                            <a >
                                <img src="/images/nav-notifications.svg" alt=""/>
                                <span>Notifications</span>
                            </a>
                        </NavList>

                        <User>
                            <a>
                              <Avatar
                                alt="Remy Sharp"
                                src={userImage}
                                sx={{ width: 30, height: 30, mt: 1 }}
                              />
                                <span>Me
                                    <img src="/images/down-icon.svg" alt=""/>
                                </span>
                            </a>
                            <Sign >
                                <button onClick={onLogOutButtonClick}>
                                    Sign Out
                                </button>
                            </Sign>
                        </User>
                        <Work>
                            <a>
                                <img src="/images/nav-work.svg" alt=""/>
                                <span>
                                    work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </a>

                        </Work>

                    </NavListWrap>
                </Nav>
            </Content>
        </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  background-color: white;
  align-items: center;
  flex-direction: row;
  width: 100vw;
`;

const Content = styled.div`
  margin: 0px 40px 0px 40px;
  display: flex;
  align-items: center;
  @media(max-width: 900px){
    margin-left: 20px;
  }
`;

const Logo = styled.span`
  
`;

const Search = styled.div`
  height: 48px;
  width: 250px;
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20px;
  justify-content: center;
  background-color: lightgray;
  & > div > input{
    background-color: lightgray;
    border: none;
    height: 30px;
  }
  @media(max-width: 800px){
    width: 200px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  opacity: 0.6;
  @media(max-width: 800px){
    display: none;
  }
`;

const Nav = styled.nav`
  position: absolute;
  right: 60px;
  @media(max-width: 900px){
    right: 20px;
  }
`;

const NavListWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  
`;
const NavList= styled.div`
  margin-left: 40px;
  & > a {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > img{
      height: 30px;
      width: 30px;
    }
    & > span{
      font-size: smaller;
    }
  }
  &:hover{
    opacity: 0.9;
  }
  @media(max-width: 1000px){
    margin-left: 20px;
  }
  @media(max-width: 768px){
    display: none;
  }
`;

const Sign = styled.div`
  display: none;
  position: absolute;
  width: 80px;
  left: -12px;
  &>button{
    border: none;
    background-color: white;
    padding: 5px;
  }
`;

const User = styled(NavList)`
  position: relative;
  align-items: center;
  & > a {
    & > Avatar{
      height: 30px;
      width: 30px;
      border-radius: 50%;
    }
    & > span{
      display: flex;
      align-items: center;
    }
  }
  &:hover{
    ${Sign}{
      display: flex;
    }
  }
  @media(max-width: 768px){
    display: flex;
    position: absolute;
    right: 30px;
  }
  
`;
const Work = styled(User)`
  @media(max-width: 768px){
    display: none;
  }
`;

export default NavBar;