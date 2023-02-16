import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../services/firebase/user";

import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import NavBar from "../../shared/components/NavBar";
import { getImageUrl, uploadImage } from "../../services/firebase/user-image";
import styled from "styled-components";

const UserInfoEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userImageUrl, setUserImageUrl] = useState("");
  const userImageRef = useRef(null);

  const navigate = useNavigate();

  const { userId } = useParams();

  const fetchUser = useCallback(async () => {
    const user = await getUser(userId);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setUserImageUrl(user.userImageUrl)
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(userImageRef.current !== null){
      await uploadImage(userImageRef.current, userId);
      const url = await getImageUrl(userId);
      await updateUser(userId, { firstName, lastName, userImageUrl: url });
    }else{
      await updateUser(userId, { firstName, lastName, userImageUrl: userImageUrl });
    }

    navigate(-1);
  };

  const onFileChange = async (event) => {
    userImageRef.current = event.target.files[0];
  };

  return (
    <>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="first name"
            value={firstName}
            required
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>
        <div>
          <TextField
            label="last name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>
        <div>
          <TextField type="file" onChange={onFileChange} />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div{
    margin: 10px;
  }
`;

export default UserInfoEdit;