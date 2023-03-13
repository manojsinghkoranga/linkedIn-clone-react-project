
import styled from "styled-components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const Rightside = (props) => {
    return (
        <Container>
            <NewsFeeds>
                <header>LinkedIn News</header>
                    <div>
                        <ul>
                            <li>
                                <h5>Mid-level IT staff under the radar</h5>
                                <p>1d ago &#183;4684 readers</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <h5>Zypp Electric raises $25M</h5>
                                <p>3h ago &#183;548 readers</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <h5>Microsoft's AI-driven play for search</h5>
                                <p>1h ago &#183;4801 readers</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <h5>Indians making beeline for Dubai homes</h5>
                                <p>2d ago &#183;2422 readers</p>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <h5>Hybrid hiring is here to stay</h5>
                                <p>3d ago &#183;3150 readers</p>
                            </li>
                        </ul>
                    </div>
                <ShowMore>
                    Show more <ExpandMoreIcon />
                </ShowMore>
            </NewsFeeds>

            <AboutSection>
                <div>About</div>
                <div>Accessibility</div>
                <div>Help Center</div>
                <div>Privacy & Terms <ArrowDropDownIcon /></div>
                <div>Ad Choices</div>
                <div>Advertising</div>
                <div>Business Services <ArrowDropDownIcon /></div>
                <div>Get the LinkedIn app</div>
                <div>More</div>
            </AboutSection>
            <CopyRight>
                <img src="images/LinkedIn-Logo.wine.svg" alt="" />LinkedIn Corporation © 2023
            </CopyRight>
            
            
        </Container>
    )
}

const Container = styled.div`
    
`;

const NewsFeeds = styled.div`
    padding-top: 15px;
    width: 300px;
    background-color: white;
    border-radius: 5px;
    & > header{
        font-size: large;
        font-weight: 500;
        margin-left: 15px;
    }
    & > div {
        &:hover{
            background-color: lightgray;
        }
        & > ul{
            margin-left: -15px;
            list-style-type: circle;
            & > li{
                & > h5{
                    font-size: medium;
                    font-weight: 400;
                    margin: 5px;
                }
                & > p{
                    font-size: small;
                    color: gray;
                    margin: 5px;
                }
            }
        }
    }
    @media(max-width: 480px){
        
    }
    
    
`;

const ShowMore = styled.div`
    display: flex;
    align-items: center;
    width: 98px;
    margin-left: 10px;
    margin-bottom: 10px;
    padding: 3px;
    border-radius: 3px;
    color: rgba(0, 0, 0, 0.7);
    &:hover{
        background-color: lightgray;
    }
`;

const AboutSection = styled.div`
    margin-left: 50px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 200px;
    font-size: small;
    font-weight: 400;
    margin-top: 30px;
    color: gray;
    & > div{
        margin: 5px;
        display: flex;
        align-items: center;
        &:hover{
            color: blue;
            text-decoration: underline;
        }
    }
    @media(max-width: 480px){
        
    }
`;

const CopyRight = styled.div`
    display: flex;
    align-items: center;
    font-size: small;
    margin-left: 30px;
    & > img{
        height: 50px;
    }
    @media(max-width: 480px){
        
    }
`;



export default Rightside;