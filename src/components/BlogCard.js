import React from 'react'
import { Box, Avatar , Card, CardContent , CardHeader, CardMedia , Typography, IconButton } from '@mui/material'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom"
import axios from 'axios';

const BlogCard = ({title , description , imageURL , userName , isUser , id}) => {
  // console.log(title , isUser);

  const navigate = useNavigate();

  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`)  
  }

  const deleteRequest = async() => {
    const res = await axios.delete(`http://localhost:4000/api/blog/${id}`).catch((err) => console.log(err));

    const data = await res.data;
    return data;
  }

  const handleDelete = () => {
     deleteRequest()
     .then(() => navigate("/"))
     .then(() => navigate("/blogs"));
  };

  return (
<div>
    <Card sx={{ width: "40%", margin:'auto', mt:2, padding: 2, boxShadow:"5px 5px 10px #ccc" , ":hover":{
        boxShadow: "10px 10px 20px #ccc"}
    }}>

      { isUser && (
          <Box display={'flex'}>
            <IconButton sx={{marginLeft:'auto'}} onClick={handleEdit}>
               <ModeEditOutlineIcon color='secondary'/> 
            </IconButton>

            <IconButton onClick={handleDelete}>
              <DeleteForeverIcon color='error'/> 
            </IconButton>
          </Box>  
        )
      }

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {userName}
          </Avatar>
        }

        title= {title}
      />

      <CardMedia
        component="img"
        height="194"
        image = { imageURL }
        alt='Random Image'
      />
      
      <CardContent>
        <hr/>
        <br/>

        <Typography variant="body2" color="text.secondary">
            <b> {userName} </b> {" : "} {description}
        </Typography>
      </CardContent>
    </Card>
</div>
  )
}

export default BlogCard