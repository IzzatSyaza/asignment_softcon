import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";


const ProductList = () => {
  const [itemName, setItemName] = useState("");
  const [product, setProduct] = useState([]);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  var i = 0;


useEffect(() => {
      Axios.get("http://localhost:3001/burger/getproduct",).then((res) => {
          console.log(res.data);
          // history.push("/ClinicList");
          setProduct(res.data)

      }).catch(err =>{
          alert(err);
      })
  
}, [])
  

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
                    <td className={styles.reportTh}>Price</td>
                  </tr>
                  {product.map((val, index) => {
                    return (
                      <tr key={index}>
                        <td className={styles.listItem}>{++index}</td>
                        <td className={styles.listItem}>{val.name}</td>
                        <td className={styles.listItem}>{val.price}</td>
                      </tr>
                    )
                  })}
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
