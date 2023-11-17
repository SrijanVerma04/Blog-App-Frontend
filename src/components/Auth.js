import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import { authActions } from '../store';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Auth = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [inputs, setInputs] = useState({
    name : "", 
    email: "",
    password : ""
  })

  const handleChange = (e) => {
    setInputs((prevState) => ({
        ...prevState,
        [e.target.name] : e.target.value,
    }));
  };

  const sendRequest = async(type="login") => {
    const res = await axios.post(`http://localhost:4000/api/user/${type}` , {
      name: inputs.name,
      email: inputs.email,
      password : inputs.password,
    }).catch((err) => console.log(err));

    const data = await res.data;
    // console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(inputs);

    if(isSignup){
      sendRequest("signup").then((data) => localStorage.setItem("userId" , data.user._id)).then(() => dispatch(authActions.login())).then(() => navigate("/blogs"));
    }
    else{
      sendRequest().then((data) => localStorage.setItem("userId" , data.user._id)).then(() => dispatch(authActions.login())).then(() => navigate("/blogs"));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <Box maxWidth={400} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={'center'} boxShadow={'10px 10px 20px #ccc'} padding={3} margin={'auto'} marginTop={5} borderRadius={5}>

          <Typography variant='h2' padding={3} textAlign={'center'}> { isSignup ? "Signup" : "Login" } </Typography>

          { isSignup && <TextField name='name' value={inputs.name} placeholder='Name' margin='normal' onChange={handleChange}/> }

          <TextField name='email' value={inputs.email} type='email' placeholder='Email' margin='normal' onChange={handleChange}/>

          <TextField name='password' value={inputs.password} type='password' placeholder='Password' margin='normal' onChange={handleChange}/>

          <Button type='submit' variant='contained' color='warning' sx={{borderRadius : 3 , marginTop : 3}}> Submit </Button>

          <Button onClick={() => setIsSignup(!isSignup)} sx={{borderRadius : 3 , marginTop:3 }}> Change To { isSignup ? "Login" : "Signup" } </Button>

        </Box>
      </form>
    </div>
  )
}

export default Auth;