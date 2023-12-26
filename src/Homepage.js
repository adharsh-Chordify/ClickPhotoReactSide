import React, { useContext, useEffect, useState } from 'react'
import './login.css'
import instance from './baseUrl'
import { useNavigate } from 'react-router-dom'
import { LoginDataContext } from './Contextshare'
import Footer from './Footer'
const baseURL='http://localhost:4001'

function Homepage() {
  const navigate=useNavigate()
   const [allData,setallData]=useState([])
   const[loginCheck,setloginCheck] =useState('')
     const getall=async()=>{
      try{
        const data=await instance.get('/getall')
        console.log(data.data);
        setallData(data.data)
      }
      catch(err){
        console.log(err);
      }
        
    }
    const [loggedData,setLoggedData]=useState()

    useEffect(()=>{

       getall()
       setLoggedData(sessionStorage.getItem("token"))

       if(loggedData){
        
          setloginCheck("true")
             }
       else{
         setloginCheck('')
       }
      

    },[loggedData])
 

 
    


    
  return (
    <>
     <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
  <div class="container">
    <a class="navbar-brand" href="/">
      <img src="https://i.postimg.cc/xjgp0XF2/christmas-2012-new-2856.jpg" alt="Bootstrap" width="80" height="54"/>
    </a>
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
        {loginCheck?
        <>
          <h5 class="navbar-brand" >Welcome {sessionStorage.getItem('userName')}</h5> 
          <button class="btn btn-success me-2" type="submit" onClick={()=>navigate('upload')}>Create Post</button>
        </>
        
        :''
          
        }
       
       { loginCheck?   

<button class="btn btn-danger me-2" type="submit" onClick={()=>sessionStorage.removeItem('token')}>Logout</button>
:
<button class="btn btn-info" type="submit" onClick={()=>navigate('login')}>Sign In</button>
}

        
      
      </form>
    </div>
  </div>
</nav>

{allData.length > 0 ? allData.map((i)=>(
  

    <div className='homepagetemp '>
    <div className="card t1 " style={{ width: "30rem" }}>
      <img src={`${baseURL}/uploads/${i.image}`} className="card-img-top " alt="..." />
      <div className="card-body">
        <p className="card-text">{i.caption}</p>
        <img className='Homeprofileimg ' src={`${baseURL}/uploads/${i.userImg}`}></img> <span className="card-text">{i.userName}</span>  <span className="card-text ms-5">Uploaded on {i.updatedAt.slice(0,10)}</span>
      </div>
    </div>
    </div>

  )):<h3>No data Found Sorry....</h3>
}


<Footer></Footer>
    
       
    </>
  )
}

export default Homepage
