import React, {useEffect, useState, useContext} from "react";
import styles from "./login.module.scss";
import Axios from "axios";
// import {useAuth} from '../../Context/Auth';
import { useNavigate, useLocation } from "react-router-dom";
import {useAuth} from '../../../Context/Auth';





const BurgerLogin = () => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    // const redirectPath = location.state?.path


    Axios.defaults.withCredentials = true;

    const BurgerLogin = (e) => {
        
        e.preventDefault();
        console.log(username);
        Axios.post("http://localhost:3001/burger/login",{
          username: username,
          password: password,
        }).then((response)=>{
          if(response.data.err){
            alert(response.data.err);
          }
          else{
            console.log(response.data.user)
            auth.login({ 
              username: username,
              id: response.data.user.id, 
              address: response.data.user.address, 
           });
            alert(response.data.message)
            navigate('/order', {replace: true});
        }
        }).catch(err =>{
            alert(err);
            
        })
      }


    return (
        <div className={styles.container}>
            <main>
            <div className={styles.login}>
                <div>RCE ISKANDAR</div>
                <div>
                    <form className={styles.loginForm} onSubmit={BurgerLogin}>
                        <div className={styles.loginDetail}>
                            <label className={styles.loginLabel}>Username</label>
                            <input className={styles.loginInput} type="text"  value={username} placeholder="username" onChange={(e)=>{setUsername(e.target.value)}}/>
                        </div>
                        <div className={styles.loginDetail}>
                            <label className={styles.loginLabel}>Password</label>
                            <input className={styles.loginInput} type="password" value={password} placeholder="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <button className={styles.loginButton}>LOGIN</button>
                    </form>
                </div>
                
            </div></main>
        </div>
    )
}

export default BurgerLogin;