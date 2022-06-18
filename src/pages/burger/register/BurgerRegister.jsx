import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";


const BurgerRegister = () => {
  const [schoolName, setSchoolName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmit(true);
  }

  const validate = () => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!address){
        errors.address = "Address is required!";
    }


    if (!username){
        errors.username = "Username is required!";
    }
    
    // user.map(val=>{
    //     if(username === val.username){
    //         errors.username = "The Username Already Exist!";
    //     }
    // })

    if (!password){
        errors.password = "Password is required!";
    }else if(password.length < 4){
        errors.password = "Password must be at least 4 characters!";
    }

    return errors
}


useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/burger/register", {
        
        username: username,
        password: password,
        address: address,
      }).then((res) => {
          console.log(res);
          alert(res.data.message);
          // history.push("/ClinicList");

      }).catch(err =>{
          alert(err);
      })
  }
}, [formErrors])
  

  return (
    <div className={styles.container}>
      <main>
        <div>
          <div className={styles.add}>
            <h2>REGISTER</h2>
            <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Username</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={username} 
                  placeholder="SKSI2022" onChange={(event) =>{
                    setUsername(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.username}</p>
              </div>

              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Password</label>
                  <input className={styles.exhibitionDetailInput} type="password" value={password} 
                  placeholder="Password" onChange={(event) =>{
                    setPassword(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.password}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Address</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={address} 
                  placeholder="Sekolah Kebangsaan Sungai Isap Kuantan 25150 Pahang"
                  onChange={(event) =>{
                    setAddress(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.address}</p>
              </div>
              <button className={styles.createButton}>Register</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BurgerRegister;
