import { Avatar, Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUser } from "../../services/firebase/user";
import { getImageUrl } from "../../services/firebase/user-image";
import NavBar from "../../shared/components/NavBar";
  
const User = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    experiences: [],
  });
  const [userImageUrl, setUserImageUrl] = useState(null);

  const auth = useSelector((state) => state.auth);

  const { userId } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userId);
      setUser(user);
    };

    const fetchUserImage = async () => {
      try {
        const url = await getImageUrl(userId);
        setUserImageUrl(url);
      } catch (error) {
        if (error.code !== "storage/object-not-found") {
          throw new Error(error);
        }
      }
    };

    fetchUser();
    fetchUserImage();
  }, [userId]);

  console.log(userImageUrl);

  return (
    <>
      <Grid container flexDirection="column" alignItems="center">
        <Grid item>
          <Avatar
            alt="Remy Sharp"
            src={userImageUrl}
            sx={{ width: 56, height: 56, mt: 2 }}
          />
        </Grid>
        <Box sx={{ my: 2 }}>
          <Grid item>
            <Typography variant="h6">First Name:</Typography>
            <Typography>{user.firstName}</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">Last Name:</Typography>
            <Typography>{user.lastName}</Typography>
          </Grid>
        </Box>
        {auth.userId === userId && (
          <Grid item sx={{ mt: 2 }}>
            <Link to={`/user/${userId}/edit`}>
              <Button>Edit</Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default User;