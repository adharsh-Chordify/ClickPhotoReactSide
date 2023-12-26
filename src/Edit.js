import React, { useContext, useEffect, useState } from 'react'
import instance from './baseUrl'
import { DeletedContext, EditContext, LoginDataContext, MypostContext } from './Contextshare'
import Mypost from './Mypost'
import { useNavigate, useParams } from 'react-router-dom'
import Footer from './Footer'
const baseURL = 'http://localhost:4001'



function Edit() {

  const fileUpload = ''

  const [loggedData,setLoggedData]=useState()
  const [imgage, setImage] = useState()
  const [title, setTitle] = useState()
  const [preview, setPreview] = useState('')
  const [token, setToken] = useState('')
  const [captionError,setcaptionError]=useState()
  const [imageError,setImageError]=useState()
  const [uuidData,setuuidData]=useState()
   const navigate=useNavigate()
   const[editData,setEditData]=useState('')
  
  const{editContxt,seteditContxt}=useContext(EditContext)
  
  const {id}=useParams()

  const tokend = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTQ1M2QxYWEtZjMzMC00NzRhLThjMjItZjgyMWQ2NTQ1N2FhIiwiaWF0IjoxNzAzMTY5MzMwLCJleHAiOjE3MDMxODAxMzB9.ZJyz0pj0nscwjfs1LblyVL1lpop-aPNYXgNZyGkG_OU'
  const uuid = "5453d1aa-f330-474a-8c22-f821d65457aa"
  const formsubmit = async (e) => {
    e.preventDefault()
    if(!title){
      setcaptionError('true')
    }
    else if(!imgage){
      setImageError('true')
    }
    else{
      setImageError('')
      setcaptionError('')
      const formData = new FormData();
      formData.append("id", id)
    formData.append("caption", title)
    formData.append('img', imgage)
    //  formData.append('token',token)
    //  console.log(title,imgage);
    try{
      const fileUpload = await instance.post('/updatepost', formData, { headers: { token } })
      console.log(fileUpload.data);
    //   setPreview(`${baseURL}/uploads/${fileUpload.data.image}`)
      alert("Data ha been updated")
         navigate('/upload') 
    //   console.log(preview);
    }
    catch(err){
      console.log(err);
    }
    
    }
    



  }
  

 

  const SubmitLogout=async(e)=>{
    e.preventDefault()
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('uuid')
    sessionStorage.removeItem('userName')
    navigate('/') 
   }

  useEffect(() => {
    
      setToken(sessionStorage.getItem('token'))
      setuuidData(sessionStorage.getItem('uuid'))
      setEditData(editContxt)
      

  console.log(id);

  }, [id])



  return (




    <>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="https://i.postimg.cc/xjgp0XF2/christmas-2012-new-2856.jpg" alt="Bootstrap" width="80" height="54"/>
    </a>
    <a class="navbar-brand" href="/upload"> <button class="btn btn-info me-2" type="submit" >Back</button>  </a>
  </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          {/* <a class="nav-link disabled" aria-disabled="true">Disabled</a> */}
        </li>
      </ul>
      <form class="d-flex" role="search">
        {/* <h5 className='me-2 text-center'></h5> */}
        <button class="btn btn-danger me-2" type="submit" onClick={SubmitLogout}>Logout</button>      
      </form>
    </div>
  </div>
</nav>









<div className='w-75 mx-auto CreatePostMain  '>
        <div className='w-100 CreatePostOverview row'>
        <h2 className='text-center mt-3'>Choose To Upload</h2>
        <div className='col-lg-6 CreatePostLeft'> 
        
           <img src='https://i.postimg.cc/gj8zTLVx/Work.jpg' className='w-75'></img>
        </div>
        <div className='col-lg-6 CreatePostRight'> 
                   <form onSubmit={formsubmit}>
        <label className='createImageCaption'>Image Caption</label> <br></br>
        <input defaultValue={editData.caption} type='text' placeholder='Caption' className='Createinputfield' onChange={(e) => setTitle(e.target.value)} ></input> <br></br>
        {captionError?
                      <p className="error" >Field is required</p> 
                       
                    :''}
        <label className='createImageCaption mt-5'>Select the Image</label> <br></br>
        <input defaultValue={editData.image} type="file" id="img" name="img" accept="image/*" className='mt-3 fs-5' onChange={(e) => { setImage(e.target.files[0]) }} /><br></br>
        {imageError?
                      <p className="error" >Field is required</p> 
                       
                    :''}
        <button type='submit' className='mt-5 btn btn-success w-25'>Submit</button>
      </form>
               
      </div>
        </div>
        
        
     </div>
    <Footer></Footer>

   
     
      
    </>
  )
}

export default Edit


 