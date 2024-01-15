import React from 'react'
import { useForm } from 'react-hook-form';
import "./login.css"
import "./temp.css"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import instance from './baseUrl';


const schema=yup.object().shape({
    Email:yup.string().email().required("This field cannot be empty"), 
    Password:yup.string().min(5).required("This field cannot be empty")

})


function ForgotPassword() {

    const {register,handleSubmit,reset,formState: {errors}}=useForm({
        resolver:yupResolver(schema)
         })

   const navigate=useNavigate()
      

  return (
    <>
    <div className='w-75 mx-auto temp  row'>
       <h1 className='text-center'>Ohh You Forgot Us??</h1>
          <div className='col-lg-6 loginrightside'> 
          
             <img src='https://i.postimg.cc/hvPY9zP1/3275434.jpg' className='w-75'></img>
          </div>
          <div className='col-lg-6'> 
                 <form className='inputformdata'onSubmit={handleSubmit(async(data)=>{
                         
                         const body=data
                         try{
                         const ForgotPasswordData=await instance.post('/forgotpassword',body);
                         alert(ForgotPasswordData.data.message)
                         
                           if(ForgotPasswordData.data.message=="Password has been updated"){
                              navigate('/login')
                              reset()
                           }
                           else if (ForgotPasswordData.data.message=="Unable to Update Please Try Again Later"){
                            navigate('/login')
                            reset()
                           }
                         
                           else if(ForgotPasswordData.data.message=="User not found register first"){
                            navigate('/Register')
                            reset()
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
                   
        
                    <button className='registerButton btn btn-success' type='submit'>Update Password</button>

                 </form>
                 
        </div>

       </div>
                

    </>
      
    
  )
}

export default ForgotPassword
