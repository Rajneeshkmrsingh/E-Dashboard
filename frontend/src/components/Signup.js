import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const[data,setData]=useState({
        name:"",
        email:"",
        password:"",
        phone:""
    });
    const [error,setError] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        const auth = localStorage.getItem("user");
       if(auth){
        navigate("/")
       }
    },[data])
    
    const change = (e)=>{
        const{name,value}= e.target;
        
        setData((preval)=>{
            return {
                ...preval,[name]:value
            }
        })
    }
    const {name,email,password,phone} = data;
    const submit = async (e)=>{
        e.preventDefault();
        try {
            if(!name || !email || !password || !phone){
                setError(!error)
              return false;
            }
            else{
                let result =await fetch("http://localhost:8000/register",{
                method:"post",
                body:JSON.stringify({name:name,email:email,password:password,phone:phone}),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            result = await result.json();
           
                console.warn(result)
                localStorage.setItem("user",JSON.stringify(result))
                navigate("/")
            
           
            

            }
            
        } catch (error) {
            console.warn("Error:",error)
        }
           /*  setData({
                name:"",
                email:"",
                password:"",
                phone:""
            })  */ 
    }
    return (
        <>
            <div className="container">
                <h1 className='formHeading'>Registration</h1>
                <form className="signup" onSubmit={submit}>
                    <input className="inputBox" autoComplete='off' type="text" placeholder='name' onChange={change} name='name' value={data.name}/>
                    {error && !name && <span className='error'><sup>*</sup>Enter valid name.</span>}
                    <input className="inputBox" type="email" placeholder='email' onChange={change} name='email' value={data.email}/>
                    {error && !email && <span className='error'><sup>*</sup>Enter valid email.</span>}
                    <input className="inputBox" autoComplete='off' type="password" placeholder='password' onChange={change} name='password' value={data.password}/>
                    {error && !password && <span className='error'><sup>*</sup>Enter valid password.</span>}
                    <input className="inputBox" type="number" placeholder='Phone number' onChange={change} name='phone' value={data.phone}/>
                    {error && !phone && <span className='error'><sup>*</sup>Enter valid phone.</span>}
                    <button className="signUpBtn" type="submit">Submit</button>
                </form>
            </div>
        </>
    );
};

export default Signup;