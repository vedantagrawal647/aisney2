import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#71c55d',
    },
  },
});


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const AddUserForm = () => {
  
  const navigate = useNavigate();

    const backend_url = `https://mern-backened-userinfo.onrender.com`
  

  const [user,setUser] = useState({firstName:"",lastName:"",phoneNumber:"",countryCode:"",id:""});

  let name ,value;
  const handleInputs = (event) => {
    name=event.target.name;
    value=event.target.value;
    setUser({...user,[name]:value});
  }

  const PostData = async (event) =>  {
    event.preventDefault();

    const {firstName,lastName,phoneNumber,countryCode,id} = user;

    const  res = await fetch(`${backend_url}/addUser`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firstName:firstName,
        lastName:lastName,
        phoneNumber:phoneNumber,
        countryCode:countryCode,
        id:id
      })
    });

    if(res.status === 422)
    {
      window.alert("please enetr the detail correctly")
    }
    else{
      window.alert("add user successfull");
      console.log(res.status);
      console.log("successfull");
      navigate("/contactInformation");
    }
  }



  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Add User
          </Typography>
          <Box component="form" noValidate onSubmit={PostData} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} >
                <CssTextField 
                  autoComplete="given-name"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  name="firstName"
                  value={user.firstName}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <CssTextField 
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="off"
                  name="lastName"
                  value={user.lastName}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField 
                  required
                  fullWidth
                  id="phoneNumber"
                  label="Phone Number"
                  autoComplete="off"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField 
                  required
                  fullWidth
                  label="Country Code"
                  id="countryCode"
                  autoComplete="off"
                  name="countryCode"
                  value={user.countryCode}
                  onChange={handleInputs}
                />
              </Grid>
              <Grid item xs={12}>
                <CssTextField 
                  required
                  fullWidth
                  label="ID"
                  id="id"
                  autoComplete="off"
                  name="id"
                  value={user.id}
                  onChange={handleInputs}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{
                backgroundColor:"rgb(34,193,195)",
                background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,126,253,1) 100%)"
              }}
            >
                Add User
            </Button>
          </Box>
        </Box>
        <Box 
          style={{
            paddingBottom:"6px" , 
            paddingTop:"6px"
            ,borderRadius:"6px",
            backgroundColor:"rgb(34,193,195)",
            background: "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(45,126,253,1) 100%)"
          }}
        >
            <NavLink class="" to="/contactInformation"  style={{textDecoration:"none",margin:"10px auto"}} >View User Data</NavLink>
        </Box>
        
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default AddUserForm;