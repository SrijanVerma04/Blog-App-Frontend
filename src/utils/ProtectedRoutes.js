import { Navigate , Outlet} from "react-router-dom";

const ProtectedRoutes = ( { isLoggedIn } ) => {

    if(!isLoggedIn){
        return <Navigate to={"/auth"}/>
    }

    return <Outlet />

}

export default ProtectedRoutes;

