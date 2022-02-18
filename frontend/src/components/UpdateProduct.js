import React,{useEffect, useState} from "react";
import { useParams,useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [getItem, setItem] = useState({
    name: "",
    category: "",
    price: "",
    company: "",
  });
  const navigate =useNavigate();
  const productid = useParams().productid
  console.log(productid)
  useEffect(()=>{
    submit();
      getProductById(productid)
     
  },[productid])
  async function getProductById(productid){
    const response = await fetch(`http://localhost:8000/updateproduct/${productid}`,{
        mathod:"patch"
    })
    const getProduct = await response.json()
    console.log(getProduct)
    setItem({
        name: getProduct.name,
        category: getProduct.category,
        price: getProduct.price,
        company: getProduct.company,
      })

  }
  const change = (e) => {
    const { name, value } = e.target;
    setItem((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  

  const submit = async(e) => {
    e.preventDefault();
    const { name, category, price, company } = getItem;
    const response = await fetch(`http://localhost:8000/updateproduct/${productid}`, {
      method: "put",
      body: JSON.stringify({_id:productid,
        name, 
        category,
         price, 
         company}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    alert("Product Updated");
    navigate("/");
    
   
  };
  return (
    <>
      <h1 className="formHeading">Update Product</h1>
      <form className="addProduct" onSubmit={submit}>
        <input
          className="inputBox"
          type="text"
          placeholder="Add Product Name"
          name="name"
          onChange={change}
          value={getItem.name}
        />
       
        <input
          className="inputBox"
          type="text"
          placeholder="Add Category"
          name="category"
          onChange={change}
          value={getItem.category}
        />
        
        <input
          className="inputBox"
          type="text"
          placeholder="Add Price"
          name="price"
          onChange={change}
          value={getItem.price}
        />
       
        <input
          className="inputBox"
          type="text"
          placeholder="Add Company Name"
          name="company"
          onChange={change}
          value={getItem.company}
        />
       
        <button className="additem" type="submit">
          Update Product
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
