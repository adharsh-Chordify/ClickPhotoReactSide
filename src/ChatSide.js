import React, { useState } from 'react'

import { io } from 'socket.io-client'
import Message from './Message'

const socket=io.connect("http://localhost:4001")
function ChatSide() {
    const[username,setUsername]=useState("")
    const[roomname,setRoomname]=useState("")


    const joinRoom=()=>{

        if(username !=='' && roomname !==''){
           socket.emit("join_room",roomname)
        }

    }

  return (
    
<div>
    <h3> Join this Chat</h3>
    <input type='text' placeholder='Username' onChange={(e)=>setUsername(e.target.value)}></input>
    <input type='text' placeholder='RoomId' onChange={(e)=>setRoomname(e.target.value)}></input>
    <button onClick={joinRoom}>Join A Room</button>
    <Message socket={socket} username={username} roomname={roomname}></Message>
</div>
  )
}

export default ChatSide
