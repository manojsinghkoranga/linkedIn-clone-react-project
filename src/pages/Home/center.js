import styled from "styled-components";
import CreatePost from "./CreatePost";
import Posts from "./Posts";

const Center = () => {
    return (
        <Container>
            <CreatePost />
            <Posts />
        </Container>
    )
}
const Container = styled.div`
    display: flex;
    flex-direction: column;

    max-width: 600px;
    position: relative;
    row-gap: 15px;
    
`;
export default Center;