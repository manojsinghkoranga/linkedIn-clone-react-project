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
    margin-left: 100px;
    /* align-items: center; */
    /* justify-content: center; */
    grid-area: center;
    max-width: 400px;
    position: relative;
    @media (max-width: 1000px){
        max-width: 400px;
    }
    
`;
export default Center;