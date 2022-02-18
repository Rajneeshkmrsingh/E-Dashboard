import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[data,setData]=useState({email:"",password:""});
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth){
            navigate("/")
        }
     },[])
    const change = (e)=>{
        const{name,value}=e.target;
        setData((preVal)=>{
            return {...preVal,[name]:value}
        })
    }
    const submit =async (e)=>{
        e.preventDefault();
            const{email,password} = data;
        let response = await fetch ("http://localhost:8000/login",{
            method:"post",
            body:JSON.stringify({email:email,password:password}),
            headers:{
                "Content-Type":"application/json"
            }
        })
        response =await response.json();
        console.warn(response)
        if(response.name){
            localStorage.setItem("user",JSON.stringify(response))
            navigate("/");
        }

    }
    return (
        <>
        <div className="container">
            <h1 className='formHeading'>Login</h1>
            <form className="login" onSubmit={submit}>
                <input className="inputBox" type="email" placeholder='Enter Email' name="email" onChange={change} value={data.email} />
                <input className="inputBox" type="password" placeholder='Enter Password' name="password" onChange={change} value={data.password} />
                <button className="loginBtn" type="submit">Submit</button>
            </form>
        </div>
        </>
    );
};

export default Login;