import { Button } from "@mui/material";
import { Avatar } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createPostAsync } from "../../redux/slices/postSlice";
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import YouTubeIcon from '@mui/icons-material/YouTube';
import EventIcon from '@mui/icons-material/Event';
import ArticleIcon from '@mui/icons-material/Article';
import { getPostUrl, uploadPostImage } from "../../services/firebase/user-image";
import { updateProfile } from "firebase/auth";

const CreatePost = (props) => {
 
  const [postInputValue, setPostInputValue] = useState("");
  const [userImageUrl, setUserImageUrl] = useState('');
  const [uploadPhoto, setUploadPhoto] = useState(false);
  const userPostFile = useRef(null);
  const auth = useSelector((state) => state.auth);
  const userInfo = useSelector((state) => state.userInfo);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    setUserImageUrl(userInfo.imageUrl)
  },[userInfo])

  const onFormSubmit = async (event) => {
    event.preventDefault();
    if(postInputValue === "" && uploadPhoto === false){
      return;
    }
    if(uploadPhoto === true && userPostFile.current.value === ""){
      return;
    }
    
    const postNo = Math.random();

    if(uploadPhoto){
      await uploadPostImage(userPostFile.current, postNo);
      try{
        const imageUrl = await getPostUrl(postNo);
        dispatch(createPostAsync(postInputValue, imageUrl , auth.userId));
      }catch (error) {
        console.log(error);
      }
    }else{
      dispatch(createPostAsync(postInputValue, 'null' , auth.userId));
    }
    setPostInputValue('');
    setUploadPhoto(false);
    userPostFile.current.value = null;
  };

  return (
    <Container>
      <div>
        <ProfileImage>
          <Avatar
            alt="Remy Sharp"
            src={userImageUrl}
            sx={{ width: 36, height: 36, mt: 1 }}
          />
        </ProfileImage>
        
        <input
          placeholder="Start a post..."
          value={postInputValue}
          onChange={(event) => setPostInputValue(event.target.value)}
        />
        <Button variant="contained" onClick={onFormSubmit}>
          POST
        </Button>
      </div>
      <FileInputBox >
        {uploadPhoto && <input type={'file'} ref={userPostFile} onChange={event => userPostFile.current = event.target.files[0]}/>}
      </FileInputBox>
      <IconContainer >
        <button onClick={() => setUploadPhoto(!uploadPhoto)}>
            <InsertPhotoIcon color="primary"/>
            Photo
        </button>
        <button>
            <YouTubeIcon color="success"/>
            Video
        </button>
        <button>
            <EventIcon color="warning"/>
            Event
        </button>
        <button>
            <ArticleIcon color="warning"/>
            Write article
        </button>
      </IconContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: rgb(250, 250, 250);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid lightgray;
  border-radius: 10px;

  &>div{
    width: 100%;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    &>input{
      height: 50px;
      width: 60%;
      background-color: rgba(230, 230, 230, 0.8);
      border: none;
      border-radius: 15px;
      border: 1px solid gray;
      font-size: medium;
    }
  }
`;

const ProfileImage = styled.div`
  @media(max-width: 325px){
    display: none;
  }
`;

const FileInputBox = styled.div`
  align-self: center;
`;

const IconContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 10px;
  align-items: center;
  justify-content: space-between;
  &>button{
    border: none;
    display: flex;
    align-items: center;
    background-color: transparent;
    justify-content: center;
    font-size: small;
    &:hover{
      opacity: 0.9;
    }
  }
  @media(max-width: 330px){
    & > button{
      font-size : x-small;
    }
  }

`;

export default CreatePost;