
import { useDispatch, useSelector } from "react-redux";
import { getUser, updatePost } from "../../services/firebase/user";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deletePostAsync } from "../../redux/slices/postSlice";
import styled from "styled-components";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { Avatar } from "@mui/material";

const Post = (props) => {
  const { body, id, imageUrl, createdBy, likes, comments } = props;
  const [likeCount, setLikeCount] = useState(likes);
  const [commentsCounter, setCommentsCounter] = useState(comments);
  const [openComments, setOpenComments] = useState(false);
  const [postComment , setPostComment] = useState('');
  const [postOwnerInfo, setPostOwnerInfo] = useState({
    firstName: "",
    lastName: "",
    userImageUrl: "",
    id: null,
  });

  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(createdBy);
      setPostOwnerInfo(user);
    };

    fetchUser();
  }, [createdBy]);

  useEffect(() => {
    updatePost(id, {body, imageUrl, createdBy, likes: likeCount, comments: commentsCounter});
  }, [likeCount, commentsCounter])

  const handleLike = () => {
    if(likeCount.includes(auth.userId)){
      const newLikeCount = likeCount.filter((element) => {
        return element !== auth.userId;
      })

      setLikeCount(newLikeCount);
      return;
    }

    setLikeCount([...likeCount, auth.userId]);
  }

  const addCommentOnPost = () => {
    setCommentsCounter([...commentsCounter, {name: userInfo.firstName, body: postComment}]);
    setPostComment('');
  }

  const handleDeleteClick = async () => {
    dispatch(deletePostAsync(id));
  };

  return (
    <PostContainer >
      <PostOwnerDetails>
        <Avatar alt="Remy Sharp" src={postOwnerInfo.userImageUrl} sx={{ width: 30, height: 30, mt: 1 }}/>
        <OwnerName>
          <p>
            <Link to={`/user/${createdBy}`} style={{textDecoration: 'none'}}>
              {postOwnerInfo.firstName}
            </Link>
          </p>
        </OwnerName>
      </PostOwnerDetails>
      
      <BodyContainer>
        <p>{body}</p>
        {imageUrl !== 'null' && <img src={imageUrl} alt=""/>}
      </BodyContainer>
      {createdBy === auth.userId && (
        <ButtonContainer onClick={handleDeleteClick}>
          <button > <MoreHorizIcon /></button>
          <DeleteText>Delete</DeleteText>
        </ButtonContainer>
      )}
      <Line />
      <SocialCounter>
        <LikesCounter>
          <button onClick={handleLike}> <ThumbUpAltOutlinedIcon /> {likeCount.length} likes</button>
        </LikesCounter>
        <CommentsCounter>
          <button onClick={() => setOpenComments(!openComments)}><InsertCommentOutlinedIcon /> {commentsCounter.length} comments</button>
        </CommentsCounter>
      </SocialCounter>
      {openComments && <CommentSection >
        <NewComment>
          <input value={postComment} onChange={(event) => setPostComment(event.target.value)}/> <button onClick={addCommentOnPost}>Post</button>
        </NewComment>
        {commentsCounter.map((comment) => {
            return <li>
                <header>{comment.name}</header>
                <p> <SubdirectoryArrowRightIcon sx={{fontSize: "15px"}}/> {comment.body}</p>
            </li>
        }
        )}
      </CommentSection>}
    </PostContainer>
  );
};

const PostContainer = styled.div`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  width: 550px;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const OwnerName = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  font-size: large;
  background-color: white;
  & > p{
    margin-left: 15px;
    &:hover{
      text-decoration: underline;
      font-weight: 500;
    }
  }
`;

const BodyContainer = styled.div`
  font-weight: 600;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: large;
  background-color: white;
  & > p{
    margin-left: 15px;
    margin-top: 5px;
    align-self: baseline;
  }
  & > img{
    max-width: 500px;
  }
`;

const DeleteText = styled.p`
  position: absolute;
  top: 20px;
  right: -5px;
  margin: 0px;
  background-color: red;
  color: white;
  padding: 5px;
  display: none;
  border-radius: 8px;
`;

const PostOwnerDetails = styled.div`
  margin-left: 10px;
  display: flex;
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  font-size: small;
  &>button{
    border: none;
    background-color: transparent;
  }
  &:hover{
    ${DeleteText}{
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;
const SocialCounter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding-bottom: 10px;
`;

const LikesCounter = styled.div`
  & > button{
    border: none;
    background-color: white;
    display: flex;
    align-items: center;
  }
`;

const CommentsCounter = styled.div`
  & > button{
    border: none;
    background-color: white;
    display: flex;
    align-items: center;
  }
`;

const CommentSection = styled.div`
  list-style-type: none;
  
  &>li{
    margin-left: 20px;
    &>header{
      margin-top: 5px;
      font-size: large;
      font-weight: 400;
    }
    &>P{
      margin-top: 2px;
      margin-left: 30px;
      font-size: medium;
      display: flex;
      align-items: center;
    }
  }
`;

const NewComment = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: space-evenly;
  background-color: white;
  &>input{
    width: 80%;
  }
`;

const Line = styled.hr`
  border: 1px solid gray;
  width: 95%;
`;


export default Post;