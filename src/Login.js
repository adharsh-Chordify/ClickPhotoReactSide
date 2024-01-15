import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';
import "./login.css"
import "./temp.css"
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
       <h1 className='text-center'>Welcome Back</h1>
          <div className='col-lg-6 loginrightside'> 
          
             <img src='https://i.postimg.cc/bvCX3R8H/ui-ux-representations-with-smartphone.jpg' className='w-75'></img>
          </div>
          <div className='col-lg-6'> 
                 <form className='inputformdata'onSubmit={handleSubmit(async(data)=>{
                         
                         const body=data
                         try{
                         const loginData=await instance.post('/login',body);
                         
                         
                           if(loginData.data.message=="Login Successful"){
                              console.log(loginData);
                              sessionStorage.setItem("token", loginData.data.token);
                              sessionStorage.setItem("userName",loginData.data.user.fistName);
                              sessionStorage.setItem("uuid",loginData.data.user.uuid)
                              setLoggedInData(loginData)
                              toast.success(loginData.data.message)
                              reset()
                              setTimeout(() => {
                                 navigate('/')
                               }, 2000);
                              
                              
                           }
                           else if (loginData.data.message=="User not found please register first"){
                              
                               toast.error(loginData.data.message)
                              setTimeout(() => {
                                 navigate('/Register') 
                               }, 2000);
                              
                           }
                           else if (loginData.data.message=="Incorrect password"){
                              toast.error(loginData.data.message)
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
                   <div className='d-flex gap-4'>
                   <a href='register'> New Here?? </a>

                   <a href='forgotpassword'> Forgot Password ?? </a>
                   </div>
                    
                    <button className='registerButton btn btn-success' type='submit'> Login</button>

                 </form>
                 
        </div>

       </div>
                
       <ToastContainer position="top-center" />
    </>
  )
}

export default Login
