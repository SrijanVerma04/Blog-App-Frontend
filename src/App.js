import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import {BrowserRouter as Router , Routes , Route} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";
import ProtectedRoutes from "./utils/ProtectedRoutes";


function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    if(localStorage.getItem("userId")){
      dispatch(authActions.login());
    }
  } , [dispatch])

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  return <Router>

    <Header/>

    <Routes> 

      <Route path="*" element={ <Auth /> } />

      <Route element={ <ProtectedRoutes isLoggedIn={isLoggedIn} />} >
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/add" element={<AddBlog />} />
        <Route path="/myBlogs" element={<UserBlog />} />
        <Route path="/myBlogs/:id" element={<BlogDetail />} />
      </Route>

    </Routes>

  </Router>
}

export default App;
