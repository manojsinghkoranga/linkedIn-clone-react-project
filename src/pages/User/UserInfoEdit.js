import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../services/firebase/user";

import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import NavBar from "../../shared/components/NavBar";
import { getImageUrl, uploadImage } from "../../services/firebase/user-image";

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
    await uploadImage(userImageRef.current, userId);

    const url = await getImageUrl(userId);
    console.log(url);

    await updateUser(userId, { firstName, lastName, userImageUrl: url });

    navigate(-1);
  };

  const onFileChange = async (event) => {
    userImageRef.current = event.target.files[0];
  };

  return (
    <>
      
      <form onSubmit={handleSubmit}>
        <Grid
          container
          flexDirection="column"
          sx={{
            mt: 4,
          }}
          alignItems="center"
          spacing={2}
        >
          <Grid item>
            <TextField
              label="first name"
              value={firstName}
              required
              onChange={(event) => setFirstName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="last name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </Grid>

          <Grid item>
            <TextField type="file" onChange={onFileChange} />
          </Grid>
          <Grid item>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UserInfoEdit;