import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form';
import "./login.css"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import instance from './baseUrl';
import { LoginDataContext } from './Contextshare';




const schema=yup.object().shape({
    Email:yup.string().email().required("This field cannot be empty"), 
    Password:yup.string().min(5).required("This field cannot be empty")

})


function Login() {
      
   const { loggedInData, setLoggedInData } = useContext(LoginDataContext);
   
    const {register,handleSubmit,reset,formState: {errors}}=useForm({
        resolver:yupResolver(schema)
         })
   
         

  const navigate=useNavigate()
  return (
    <>
       <div className='w-75 mx-auto temp  row'>
        
          <div className='col-lg-6 loginrightside'> 
          <h2 className='text-center'>Welcome Back</h2>
             <img src='https://i.postimg.cc/gj8zTLVx/Work.jpg' className='w-75'></img>
          </div>
          <div className='col-lg-6'> 
                 <form className='inputformdata'onSubmit={handleSubmit(async(data)=>{
                         
                         const body=data
                         try{
                         const loginData=await instance.post('/login',body);
                         alert(loginData.data.message)
                         
                           if(loginData.data.message=="Login Successful"){
                              console.log(loginData);
                              sessionStorage.setItem("token", loginData.data.token);
                              sessionStorage.setItem("userName",loginData.data.user.fistName);
                              sessionStorage.setItem("uuid",loginData.data.user.uuid)
                              setLoggedInData(loginData)
                              navigate('/')
                              reset()
                           }
                           else if (loginData.data.message=="User not found please register first"){
                              navigate('Register')
                           }
                        
                           

                           
                         }
                         catch(err){
                               console.log(err);
                         }
                        

                 })} >
                    <input {...register('Email')} placeholder='Email' className='inputfield'  type='email'></input>
                    <p className="error" >{errors.Email?.message}</p> 
                    <input {...register('Password')} placeholder='Password' className='inputfield'  type='password'></input>
                    <p className="error" >{errors.Password?.message}</p> 
                   
                    <a href='register'> New Here?? </a>
                    <button className='registerButton btn btn-success' type='submit'> Login</button>

                 </form>
                 
        </div>

       </div>
                

    </>
  )
}

export default Login
