import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import { useAuth } from "../../../Context/Auth";


const Display = () => {
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState([]);
  const auth = useAuth();

  var i = 0;
  var x = 0;


useEffect(() => {
      Axios.get("http://localhost:3001/burger/getorder",{
        params:{
          id: auth.user.id
        }
      }).then((res) => {
          console.log(res.data);
          // history.push("/ClinicList");
          // let temp=0;
          setOrder(res.data)
          res.data.forEach( async (item) => {
            x += item.totalprice;
            setTotal(x)
        });
      }).catch(err =>{
          alert(err);
      })
  
}, [])

const calc = (value) => {
  let temp = total;
  temp = total + value;
  setTotal(temp);

  // return value
}
  

  return (
    <div className={styles.container}>
      <main>
        <div>
          <div className={styles.add}>
            <h2>Product List</h2>
            <div>
              <table className={styles.reportTable}>
                  <tr>
                    <td className={styles.reportTh}>Bil</td>
                    <td className={styles.reportTh}>Product Name</td>
                    <td className={styles.reportTh}>Quantity</td>
                    <td className={styles.reportTh}>Total Price</td>

                  </tr>
                  {order.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.listItem}>{++i}</td>
                        <td className={styles.listItem}>{val.name}</td>
                        <td className={styles.listItem}>{val.quantity}</td>
                        <td className={styles.listItem}>{val.totalprice}</td>
                        {/* {x += val.totalprice} */}
                      </tr>
                    )
                  })}
              </table>
              Address: {auth.user.address}
              <span>Total: {total}</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Display;
