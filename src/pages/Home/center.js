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
    max-width: 550px;
    position: relative;
    row-gap: 15px;
    
`;

const Line = styled.hr`
    border: 1px solid rgb(144, 140, 140);
    width: 98%;
`;
export default Center;