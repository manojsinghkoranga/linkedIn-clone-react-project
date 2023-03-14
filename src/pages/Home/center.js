import styled from "styled-components";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Center = () => {
    return (
        <Container>
            <CreatePost />
            <Line />
            <Posts />
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 550px;
    position: relative;
    row-gap: 15px;
    @media(max-width: 1140px){
        width: 450px;
    }
    @media(max-width: 678px){
        width: 90%;
    }
    @media(max-width: 480px){
        width: 95%;
    }
`;

const Line = styled.hr`
    border: 1px solid rgb(144, 140, 140);
    width: 98%;
`;
export default Center;