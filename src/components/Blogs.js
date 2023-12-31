import React, { useEffect , useState } from 'react';
import axios from "axios";
import BlogCard from './BlogCard';

const Blogs = () => {

  const [blogs , setBlogs] = useState('');

  const sendRequest = async() => {
    const res = await axios.get("https://nodejs-blogapp.onrender.com/api/blog").catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, [])

  // console.log(blogs);

  return (
    <div>
      { blogs && blogs.map((blog , index) => (
        <BlogCard isUser={localStorage.getItem("userId") === blog.user._id} id={blog._id} title={blog.title} description={blog.description} imageURL={blog.image} userName={blog.user.name}/>
      )) 
      }
    </div>
  )
}

export default Blogs