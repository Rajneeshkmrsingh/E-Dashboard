import React, { useState } from 'react';

const AddProduct = () => {
    const [getItem,setItem]= useState({
        name:"",
        category:"",
        price:"",
        company:""
    })
    const [error,setError] = useState(false)
    const change = (e)=>{
        const{name,value} = e.target;
        setItem((preval)=>{
            return {
                ...preval,[name]:value
            }
        })
    }
    const {name,category,price,company} = getItem;
    
    const submit = async (e)=>{
        e.preventDefault();
       if(!name || !category || !price || !company){
           setError(!error)
            return false;
       }
      
        let userId = localStorage.getItem("user");
        userId=JSON.parse(userId)._id;
        let result = await fetch("http://localhost:8000/add-product",{
            method:"POST",
            body:JSON.stringify({name,category,price,company,userId}),
            headers:{
                'Content-Type':'application/json'
            }
        })
         result = await result.json()
         console.log(result) 
         alert("Product Added")
         setItem({
            name:"",
            category:"",
            price:"",
            company:""
        })
    } 

    return (
        <>
            <h1 className='formHeading'>Add Product</h1>
            <form className='addProduct' onSubmit={submit}>
                <input className="inputBox" type="text" placeholder='Add Product Name' name="name" onChange={change} value={getItem.name}/>
                {error && !name && <span className='error'><sup>*</sup>Enter valid name.</span>}
                <input className="inputBox" type="text" placeholder='Add Category' name="category" onChange={change} value={getItem.category}/>
                {error && !category && <span className='error'><sup>*</sup>Enter valid category.</span>}
                <input className="inputBox" type="text" placeholder='Add Price' name="price" onChange={change} value={getItem.price}/>
                {error && !price && <span className='error'><sup>*</sup>Enter valid price.</span>}
                <input className="inputBox" type="text" placeholder='Add Company Name' name="company" onChange={change} value={getItem.company}/>
                {error && !company && <span className='error'><sup>*</sup>Enter valid company.</span>}
                <button className='additem' type='submit'>Add Product</button>
            </form>
        </>
    );
};

export default AddProduct;