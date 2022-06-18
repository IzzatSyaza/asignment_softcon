import { useState } from "react";
import { useAuth } from "../../Context/Auth";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import NavContext from "../../Context/NavContext";
import Navbar from "../Navbar/Navbar";
import Container from "../Container/Container";
import RightNavbar from "../RightNavbar/RightNavbar";

export const RequireAuth = ({allowUser, children}) => {
    const location = useLocation()
    const auth =useAuth()
    const [nav, setNav] = useState(false);
    const value = { nav, setNav };

    if(auth.user.username && allowUser.includes(auth.user.user_type) ){
        return (
        <NavContext.Provider value={value}>
            <Navbar type={auth.user.user_type}/>
            <Container stickyNav={<RightNavbar/>} content={children}/>
        </NavContext.Provider>)
    }
    if(!auth.user.username){
        return <Navigate to ='/login' state={{path: location.pathname}} />
    }
    if(!allowUser.includes(auth.user.user_type)){
        // alert(allowUser)
        return <Navigate to ='/login' state={{path: location.pathname}} />
    }

    // return (
    //     <NavContext.Provider value={value}>
    //         <Navbar type={auth.user.user_type}/>
    //         <Container stickyNav={<RightNavbar/>} content={children}/>
    //     </NavContext.Provider>
    // )
}
