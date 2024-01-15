import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./register.css"
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import instance from './baseUrl'


const schema=yup.object().shape({
    Email:yup.string().email().required("This field cannot be empty"),
    FirstName:yup.string().required("This field cannot be empty"),
    LastName:yup.string().required("This field cannot be empty"),
    Password:yup.string().min(5).required("This field cannot be empty"),
   ConfirmPassword:yup.string().required("This field cannot be empty"),
  //  profilePic:yup.mixed().required('This field is required')

})
function Register() {
    const navigate=useNavigate()
    const [confirmError,setconfrimError] =useState('')
    const [imageConfirm,setImageConfirm]=useState('')
    const {register,handleSubmit,reset,formState: {errors}}=useForm({
        resolver:yupResolver(schema)
         })
    const [imgage,setImage]=useState()






  return (
    <>
     <div className='w-75 mx-auto temp1  row'>
     <h1 className='text-center'>Register</h1>
          <div className='col-lg-6 loginrightside'> 
          
             <img src='https://i.postimg.cc/8CYTkmwF/Data-security-05.jpg' className='w-75'></img>
          </div>
          <div className='col-lg-6'> 
                 <form className='inputformdata'onSubmit={handleSubmit (async(data)=>{
                      console.log(data);
                      const formData=new FormData();
                      formData.append('Email',data.Email)
                      formData.append('firstName',data.FirstName)
                      formData.append('lastName',data.LastName)
                      formData.append('Password',data.Password)
                   
                      
                      if(data.Password!=data.ConfirmPassword){
                        setconfrimError(true)
                      }
                      else{

                        setconfrimError('');
                        if(imgage){
                          formData.append('img',imgage)
                          setImageConfirm('')
                          try{
                            const registerData= await instance.post('/adduser',formData)
                           
                            if(registerData.data.message=="User already exist please login to continue"){
                              console.log(registerData);
                              toast.success(registerData.data.message);
                              setTimeout(() => {
                                navigate('/login');
                                reset(); 
                              }, 2000);
                             
                            }
                            else if(registerData.data.message=="User registered successfully"){
                              toast.success(registerData.data.message);
                              setTimeout(() => {
                                navigate('/login');
                                reset(); 
                              }, 2000);
                             
                            }
                           
                          }
                          catch(err){
                            const te=err.response.data.slice(30,)
                            toast.error(te)
                          }
                        }
                        else{
                          setImageConfirm('true')
                        }
                        
                      
                      
                      }
                     
                    
                 })} >
                    <input {...register('Email')} placeholder='Email' className='inputfield'  type='email'></input>
                    <p className="error" >{errors.Email?.message}</p> 
                    <input {...register('FirstName')} placeholder='firstName' className='inputfield'  type='text'></input>
                    <p className="error" >{errors.FirstName?.message}</p>  
                    <input {...register('LastName')} placeholder='lastName' className='inputfield'  type='text'></input>
                    <p className="error" >{errors.LastName?.message}</p>  
                    <input {...register('Password')} placeholder='Password' className='inputfield'type='password'></input>
                    <p className="error" >{errors.Password?.message}</p>  
                    <input {...register('ConfirmPassword')} placeholder='ConfirmPassword' className='inputfield'  type='Password'></input> 
                    {confirmError?
                      <p className="error" >Password mismatch</p> 
                       
                    :''}
                    <label style={{fontWeight:'bolder'}}>Upload your Profile Picture</label>
                    <input  placeholder='profile picture' style={{textDecoration:'none'}} type="file" name="img" id="img" accept="image/*" onChange={(e)=>{setImage(e.target.files[0])}}></input>
                    {imageConfirm?
                      <p className="error" >This field is required</p> 
                       
                    :''} 
                    <a href='login'> Already Our Member ?? </a>
                    <button className='registerButton btn btn-success' type='submit'> Register</button>

                 </form>
        </div>

       </div>
       <ToastContainer position="top-center" />
    </>
  )
}

export default Register
