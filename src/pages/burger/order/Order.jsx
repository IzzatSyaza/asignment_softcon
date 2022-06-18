import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";
import { useAuth } from "../../../Context/Auth";
import { useNavigate, useLocation } from "react-router-dom";



const Order = () => {
  const [itemName, setItemName] = useState("");
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState([]);
  var i =0;
  const auth = useAuth();
  const navigate = useNavigate();
  


  const handleInputNo = (total) => {
    // e.preventDefault();
    const values = [];
    for (let i = 0; i < total; i++) {
        values.splice(i, 0,{ quantity: 0, productId: ""})
      }
      setQuantity(values);      
  }

  const handleChange = (index, event, val) => {
    const value = [...quantity];
    value[index][event.target.name] = event.target.value;
    value[index]["productId"] = val;
    // console.log(value)
    setQuantity(value);
    // handleAddField(index);
  }

useEffect(() => {
      Axios.get("http://localhost:3001/burger/getproduct",).then((res) => {
          console.log(res.data);
          // history.push("/ClinicList");
          setProduct(res.data)
          handleInputNo(res.data.length);

      }).catch(err =>{
          alert(err);
      })
  
}, [])
  
const handleSubmit = (e) => {
  e.preventDefault();
  Axios.post("http://localhost:3001/burger/order", {
    quantity: quantity,
    userid: auth.user.id,
    }).then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate('/display');


    }).catch(err =>{
        alert(err);
    })
  console.log(auth.user.id)
}


  return (
    <div className={styles.container}>
      <main>
        <div>
          <div className={styles.add}>
            <h2>Product List</h2>
            <div>
            <form onSubmit={handleSubmit}>
              <table className={styles.reportTable}>
              <thead>
                  <tr>
                    <td className={styles.reportTh}>Bil</td>
                    <td className={styles.reportTh}>Product Name</td>
                    <td className={styles.reportTh}>Price</td>
                    <td className={styles.reportTh}>Select</td>

                  </tr></thead>
                  {product.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.listItem}>{++i}</td>
                        <td className={styles.listItem}>{val.name}</td>
                        <td className={styles.listItem}>{val.price}</td>
                        <td>
                          <input className={styles.exhibitionDetailInput}  type="number" id="quantity" name="quantity"  placeholder="0"
                            onChange={(e) => handleChange(index, e, val.id)}
                          />
                        </td>
                      </tr>
                    )
                  })}
              </table>
              <button className={styles.addButton}>Order</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Order;
