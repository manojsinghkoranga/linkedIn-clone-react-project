import { Button, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, updateUser } from "../../services/firebase/user";

import { DeleteOutline as DeleteOutlineIcon } from "@mui/icons-material";
import NavBar from "../../shared/components/NavBar";
import { uploadImage } from "../../services/firebase/user-image";

const createEmptyExperience = () => {
  return {
    companyName: "",
    startDate: "",
    endDate: "",
    id: Math.random(),
  };
};

const UserInfoEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [experiences, setExperiences] = useState([]);
  const userImageRef = useRef(null);

  const navigate = useNavigate();

  const { userId } = useParams();

  const fetchUser = useCallback(async () => {
    const user = await getUser(userId);
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setExperiences(
      user.experiences.map((exp) => ({ ...exp, id: Math.random() }))
    );
  }, [userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const promiseArray = [
      updateUser(userId, { firstName, lastName, experiences }),
    ];
    if (userImageRef.current) {
      promiseArray.push(uploadImage(userImageRef.current, userId));
    }
    await Promise.all(promiseArray);
    navigate(-1);
  };

  const onFileChange = async (event) => {
    userImageRef.current = event.target.files[0];
  };

  const handleCompanyNameChange = (index, value) => {
    setExperiences((prevState) => {
      return prevState.map((exp, i) => {
        if (i === index) {
          return {
            ...exp,
            companyName: value,
          };
        }

        return exp;
      });
    });
  };

  const handleFirstNameChange = (index, value) => {
    setExperiences((prevState) => {
      return prevState.map((exp, i) => {
        if (i === index) {
          return {
            ...exp,
            startDate: value,
          };
        }

        return exp;
      });
    });
  };

  const handleLastNameChange = (index, value) => {
    setExperiences((prevState) => {
      return prevState.map((exp, i) => {
        if (i === index) {
          return {
            ...exp,
            endDate: value,
          };
        }

        return exp;
      });
    });
  };

  const handleAddMoreExpClick = () => {
    setExperiences([...experiences, createEmptyExperience()]);
  };

  const handleDeleteClick = (index) => {
    setExperiences((prevState) => {
      return prevState.filter((exp, i) => i !== index);
    });
  };

  return (
    <>
      {/* <NavBar /> */}
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
          {/* <Grid item>
            <Typography>Experience:</Typography>
          </Grid> */}
          {/* {experiences.map((exp, index) => (
            <Grid item key={exp.id} sx={{ my: 1 }}>
              <Grid
                container
                alignItems="center"
                flexDirection="column"
                spacing={1}
              >
                <Typography>Company {index + 1}</Typography>
                <Grid item>
                  <TextField
                    label="company name"
                    value={exp.companyName}
                    required
                    onChange={(event) =>
                      handleCompanyNameChange(index, event.target.value)
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="start date"
                    value={exp.startDate}
                    required
                    onChange={(event) =>
                      handleFirstNameChange(index, event.target.value)
                    }
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="end date"
                    value={exp.endDate}
                    required
                    onChange={(event) =>
                      handleLastNameChange(index, event.target.value)
                    }
                  />
                </Grid>
                <Grid item>
                  <Tooltip title="Delete">
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleDeleteClick(index)}
                    >
                      <DeleteOutlineIcon />
                    </Button>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          ))} */}
          {/* <Grid item>
            <Button variant="outlined" onClick={handleAddMoreExpClick}>
              Add more experience
            </Button>
          </Grid> */}
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