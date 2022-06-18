import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Container from "./components/Container/Container";
import Axios from "axios";

// import Container2 from "./components/Container2/Container2";



import { AuthProvider } from "./Context/Auth";
import BurgerLogin from "./pages/burger/login/login";
import BurgerRegister from "./pages/burger/register/BurgerRegister";
import AddProduct from "./pages/burger/addProduct/AddProduct";
import ProductList from "./pages/burger/ProductList/ProductList";
import Order from "./pages/burger/order/Order";
import Display from "./pages/burger/display/Display";


const ROLES = {
  user1 : "ADMIN",
  user2 : "JURY",
  user3 : "SCHOOL"
}
Axios.defaults.withCredentials = true;


function App() {
  const [nav, setNav] = useState(false);
  const value = { nav, setNav };

  const [user, setUser] = useState({
    username: "",
    uuid: 0,
    user_type: "",
    status: false,
  });

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/user/auth")
  //     .then((response) => {
  //       if (response.data.error) {
  //         console.log(response.data.error)
  //         // setIsLoading(false);
  //       } else {
  //         console.log(response.data)
  //         setUser({
  //           username: response.data.username,
  //           mcms_id: response.data.uuid,
  //           userType: response.data.user_type,
  //           status: response.data.status,
  //         });
  //       }
  //     });
  // }, []);


  return (
    <div className="App">
      {/* <NavContext.Provider value={value}>
        <Navbar />
        <Container
          stickyNav={<RightNavbar />}
          content={
            <Routes>
              <Route path="*" element={<main>NOT FOUND</main>} />
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/campaings" element={<Campaings />} />
              <Route path="/team" element={<Team />} />
              <Route path="/messages" element={<main>Messages</main>} />
              <Route path="/addAdmin" element={<AddAdmin />} />
              <Route path="/addExhibition" element={<AddExhibition />} />
              <Route path="/addJury" element={<AddJury />} />
              <Route path="/addSchool" element={<AddSchool />} />
              <Route path="/adminList" element={<AdminList />} />
              <Route path="/exhibitionList" element={<ExhibitionList />} />


              <Route path="/login" element={<Login />} />


            </Routes>
          }
        />
      </NavContext.Provider> */}
      <AuthProvider value={{user, setUser}} >
      <Routes>
          {/* PUBLIC PAGES */}
          <Route path="*" element={<main>NOT FOUND</main>} />
          <Route path="/login" element={<BurgerLogin />} />
          <Route path="/register" element={<BurgerRegister />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/ProductList" element={<ProductList />} />
          <Route path="/order" element={<Order/>} />
          <Route path="/display" element={<Display/>} />




          
            
      </Routes>
      </AuthProvider>

      
      
    </div>
  );
}

export default App;
