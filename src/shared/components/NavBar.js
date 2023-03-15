
import { signOut } from "../../services/firebase/auth";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';

function NavBar() {
  const [showVerticalIcons, setShowVerticalIcons] = useState(false);
  const [userImage, setUserImage] = useState("/images/user.svg");
  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);

  const location = useLocation();
  
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
                        <Link to={'/'}>
                          <img src="/images/home-logo.svg" alt="" />
                        </Link>
                    </Logo>
                    <Search>
                        <div>
                            <input type={'text'} placeholder={'Search'} />
                        </div>
                        <SearchIcon>
                            <img src="/images/search-icon.svg" alt="" />
                        </SearchIcon>
                    </Search>
                </Content>
                <Nav>
                    <NavListWrap>
                        <NavList>
                            <span >
                                <Link to={'/'}>
                                  <HomeIcon style={{color: location.pathname === '/' ? "black" : "gray", fontSize: "xx-large"}}/>         
                                </Link>
                                <span>Home</span>
                            </span>
                        </NavList>
                        <NavList>
                            <span >
                                <GroupIcon style={{color: "gray", fontSize: "xx-large"}} />
                                <span>My Networks</span>
                            </span>
                        </NavList>
                        <NavList>
                            <span >
                              <BusinessCenterIcon  style={{color: "gray", fontSize: "xx-large"}}/>
                                <span>Jobs</span>
                            </span>
                        </NavList>
                        <NavList>
                            <span >
                                <SmsIcon style={{color: "gray", fontSize: "xx-large"}} />
                                <span>Messaging</span>
                            </span>
                        </NavList>
                        <NavList>
                            <span >
                                <NotificationsIcon style={{color: "gray", fontSize: "xx-large"}}/>
                                <span>Notifications</span>
                            </span>
                        </NavList>

                        <User>
                            <span>
                              <Link to={`/user/${auth.userId}`} style={{textDecoration: 'none'}}>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={userImage}
                                  sx={{ width: 30, height: 30, mt: 1 }}
                                />
                              </Link>
                                <span>Me
                                    <img src="/images/down-icon.svg" alt=""/>
                                </span>
                            </span>
                            <Sign >
                                <button onClick={onLogOutButtonClick}>
                                    Sign Out
                                </button>
                            </Sign>
                        </User>
                        <Work>
                            <span>
                                <img src="/images/nav-work.svg" alt=""/>
                                <span>
                                    work
                                    <img src="/images/down-icon.svg" alt="" />
                                </span>
                            </span>
                        </Work>
                    </NavListWrap>
                </Nav>
                <VerticalNavBar>
                      <button onClick={() => setShowVerticalIcons(!showVerticalIcons)}><MenuIcon /></button>
                </VerticalNavBar>
        </Container>

        {showVerticalIcons && <ListItem>
                          <NavList>
                              <span >
                                  <Link to={'/'}>
                                    <HomeIcon style={{color: location.pathname === '/' ? "black" : "gray", fontSize: "xx-large"}}/>
                                  </Link>
                                  <span>Home</span>
                              </span>
                          </NavList>
                          <NavList>
                              <span >
                                  <GroupIcon style={{color: "gray", fontSize: "xx-large"}} />
                                  <span>My Networks</span>
                              </span>
                          </NavList>
                          <NavList>
                              <span >
                                <BusinessCenterIcon  style={{color: "gray", fontSize: "xx-large"}}/>
                                  <span>Jobs</span>
                              </span>
                          </NavList>
                          <NavList>
                              <span >
                                  <SmsIcon style={{color: "gray", fontSize: "xx-large"}} />
                                  <span>Messaging</span>
                              </span>
                          </NavList>
                          <NavList>
                              <span >
                                  <NotificationsIcon style={{color: "gray", fontSize: "xx-large"}}/>
                                  <span>Notifications</span>
                              </span>
                          </NavList>

                          <User>
                              <span>
                                <Link to={`/user/${auth.userId}`} style={{textDecoration: 'none'}}>
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={userImage}
                                    sx={{ width: 30, height: 30, mt: 1 }}
                                  />
                                </Link>
                                  <span>Me
                                      <img src="/images/down-icon.svg" alt=""/>
                                  </span>
                              </span>
                              <Sign >
                                  <button onClick={onLogOutButtonClick}>
                                      Sign Out
                                  </button>
                              </Sign>
                          </User>
                          <Work>
                              <span>
                                  <img src="/images/nav-work.svg" alt=""/>
                                  <span>
                                      work
                                      <img src="/images/down-icon.svg" alt="" />
                                  </span>
                              </span>
                          </Work>
                        </ListItem>}
    </>
  );
}

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px 20px;
  
  @media(max-width: 788px){
    justify-content: space-between;
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
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
  @media(max-width: 400px){
    height: 36px;
    width: 125px;
    &>div>input{
      width: 100px;
    }
  }
  
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 20px;
  opacity: 0.6;
  @media(max-width: 400px){
    display: none;
  }
  
`;

const Nav = styled.nav`
  @media(max-width: 2000px){
    margin-left: 200px;
  }
  @media(max-width: 1024px){
    margin-left: 100px;
  }
  @media(max-width: 930px){
    margin-left: 0px;
  }
  @media(max-width: 788px){
      display: none;
    }
`;

const VerticalNavBar = styled.div`
    display: none;
    &>button{
      border: none;
    }
    @media(max-width: 788px){
      display: flex;
      flex-direction: column;
    }
`;

const NavListWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
`;
const NavList= styled.div`
  margin: 10px;
  & > span {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    & > span{
      font-size: smaller;
    }
  }
  &:hover{
    opacity: 0.9;
  }
  
`;

const ListItem = styled.div`
  position: absolute;
  z-index: 2;
  top: 50px;
  right: 0px;
  width: 100px;
  background-color: white;
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
  & > span {
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
  
  
`;
const Work = styled(User)`
  
`;

export default NavBar;