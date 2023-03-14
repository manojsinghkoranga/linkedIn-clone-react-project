import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Leftside = (props) => {
    const [userName, setUserName] = useState('')
    const userInfo = useSelector((state) => state.userInfo);
    useEffect(() => {
        setUserName(userInfo.firstName); 
    }, [userInfo]);
    
    return (
        <Container>
            <ArtCard >
                <UserInfo >
                    <CardBackground />
                    <a>
                        <Photo />
                        <Link>Welcome {userName}</Link>
                    </a>
                    <a>
                        <AddPhotoText>Add a photo</AddPhotoText>
                    </a>
                </UserInfo>
                <Line />
                <Widget>
                    <a>
                        <div>
                            <span>Connections</span>
                            <span>Grow your network</span>
                        </div>
                        <p>115</p>
                    </a>
                    <a>
                        <div>
                            <span>Invitation</span>
                        </div>
                        <p>18</p>
                    </a>
                </Widget>
                <Line />
                <Item>
                    <img src="/images/item-icon.svg" alt="" />
                    <span>
                        My Items
                    </span>
                </Item>
            </ArtCard>
            <CommunityCard >
                <a>
                    <span>Groups</span>
                </a>
                <a>
                    <span>
                        Events
                    </span>
                    <img src="/Images/plus-icon.svg" alt="" />
                </a>
                <a>
                    <span>Follow Hashtags</span>
                </a>
                <Line />
                <div>
                    <span>Discover More</span>
                </div>
            </CommunityCard>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    width: 225px;
    @media(max-width: 695px){
        width: 450px;
    }
    @media(max-width: 480px){
        width: 95%;
    }

`;

const ArtCard = styled.div`
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
`;

const UserInfo = styled.div`
    position: relative;
    margin-bottom: 30px;
    font-size: large;
`;

const CardBackground = styled.div`
    background: url("/images/card-bg.svg");
    height: 50px;
`;

const Line = styled.hr`
    border: 1px solid lightgray;
    margin: 0px;
`;

const Photo = styled.div`
    background-image: url("/images/photo.svg");
    height: 70px;
    width: 70px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    left: calc(50% - 35px);
    top: 20px;
`;

const Link = styled.div`
    margin-top: 50px;
    display: flex;
    justify-content: center;
    font-weight: 600;
`;

const AddPhotoText = styled.div`
    display: flex;
    justify-content: center;
    font-size: medium;
`;

const Widget = styled.div`
    font-size: medium;
    &>a{
        &>div{
            margin-left: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        &>p{
            margin-right: 10px;
        }
        display: flex;
        justify-content: space-between;
        &:hover{
            background-color: lightgray;
        }
    }
`;

const Item = styled.div`
    padding: 10px;
    &>img{
        opacity: 0.6;
    }
   &>span{
        margin-left: 10px;
        opacity: 0.9;
   }
   &:hover{
    background-color: lightgray;
   }
`;

const CommunityCard = styled(ArtCard)`
    background-color: white;
    display: flex;
    flex-direction: column;
    &>a{
        padding: 3px;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        justify-content: space-between;
        color: rgb(7, 158, 245);
        &:hover{
            text-decoration: underline;
        }
    }
    &>div{
        padding: 10px;
        display: flex;
        justify-content: center;
        &:hover{
            background-color: lightgray;
        }
    }
`;


export default Leftside;