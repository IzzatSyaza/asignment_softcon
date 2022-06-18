import React, {useState, useEffect} from "react";
import styles from "./SchoolRegister.module.scss";
import { Link } from "react-router-dom";
import { WiStars } from "react-icons/wi";
import { FaArrowRight } from "react-icons/fa";
import Axios from "axios";


const AddProduct = () => {
  const [itemName, setItemName] = useState("");
  const [price, setPrice] = useState("");

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
    if (!itemName){
        errors.itemName = "Product Name is required!";
    }

    if (!price){
        errors.price = "Quantity is required!";
    }


    return errors
}


useEffect(() => {
  console.log(formErrors);
  if(Object.keys(formErrors).length === 0 && isSubmit){
      Axios.post("http://localhost:3001/burger/addproduct", {
        itemName: itemName,
        price: price,
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
            <h2>Add Product</h2>
            <form className={styles.addExhibitionForm} onSubmit={handleSubmit}>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Product Name</label>
                  <input className={styles.exhibitionDetailInput} type="text" value={itemName} 
                  placeholder="Burger Ayam" 
                  onChange={(event) =>{
                    setItemName(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.itemName}</p>
              </div>
              <div className={styles.exhibitionDetail}>
                  <label className={styles.exhibitionDetailLabel}>Price</label>
                  <input className={styles.exhibitionDetailInput} type="number" value={price} 
                  placeholder="12"
                  onChange={(event) =>{
                    setPrice(event.target.value);}} />
                  <p className={styles.errorText}>{formErrors.price}</p>
              </div>

              <button className={styles.createButton}>Add Product</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
