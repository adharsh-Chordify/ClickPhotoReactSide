import React, { useContext, useEffect, useState } from 'react'
import { DeletedContext, EditContext, MypostContext } from './Contextshare'
import "./login.css"
import instance from './baseUrl'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'
const baseURL='http://localhost:4001'

function Mypost() {
    const [allData, setAllData] = useState('')
    const { mypost, setmypost } = useContext(MypostContext)
    const {deletedContxt,setdeletedContxt}=useContext(DeletedContext)
    const [token, setToken] = useState('')
    const [deletedItem,setDeleteditem]=useState()
    const {editContxt,seteditContxt}=useContext(EditContext)
    const navigate=useNavigate()

    const deleteItem =async(id)=>{
        try{
            const deleted=await instance.get(`/deletepost/${id}`,{headers:{token}})
            alert(deleted.data.message)
            setDeleteditem(deleted)
            setdeletedContxt(deleted)
        }
        catch(err){
            console.log(err);
        }
        
    }

    const EditData=async(id)=>{
        try{
            const edit=await instance.get(`/editpost/${id}`,{headers:{token}})
            await seteditContxt(edit.data.data)
            navigate(`/edit/${id}`)
            
        }
        catch(err){
            console.log(err);
        }
    }

    

    useEffect(() => {
        if (mypost) {
            setAllData(mypost)
            setToken(sessionStorage.getItem('token'))

        }

    }, [mypost,allData,deletedItem])

    
    return (
        <>

            {allData.length > 0 ? allData.map(i => (

                <div className='w-25 mx-auto mt-5 card_main ' >

                    <div class="card" style={{ width: "18rem;",borderRadius:"20px" ,boxShadow:"rgba(0, 0, 0, 0.24) 0px 3px 8px"}}>
                        <img src={`${baseURL}/uploads/${i.image}`} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class="card-title">{i.caption}</h5>

                        </div>

                        <div class="card-body mypostfooter">
                            <a href="#" class="card-link" onClick={()=>EditData(i.id)}><button className='btn btn-warning'>Edit</button></a>
                            <a href="#" class="card-link" onClick={()=>deleteItem(i.id)}><button className='btn btn-danger'>Delete</button></a>
                            <p className='card-link ' >Updated  {i.updatedAt.slice(0,10)}</p>
                        </div>
                    </div>


                </div>

            )) : <p>No data found</p>

            }







        </>


    )
}

export default Mypost
