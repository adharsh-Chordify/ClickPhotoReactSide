import React, { useContext, useEffect, useState } from 'react';
import "./chat.css";
import ScrollToBottom from "react-scroll-to-bottom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';


const schema = yup.object().shape({
    value: yup.string().required("This field cannot be empty"), 
});

// Function to remove duplicate messages based on author, message, and time
function removeDuplicateMessages(messages) {
    const uniqueMessagesMap = new Map();
    messages.forEach((message) => {
        const key = `${message.author}-${message.message}-${message.time}`;
        uniqueMessagesMap.set(key, message);
    });
    return Array.from(uniqueMessagesMap.values());
}

function Message({ socket, username ,roomname}) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
   
   
    
    const [messageList, setMessageList] = useState([]);

    const onSubmit = async (data) => {
        if (data.value !== "") {
            const messageData = {
                room: roomname,
                author: username,
                message: data.value,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            reset(); // Reset the form after submission
        }
    };

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            // Add the new message to the list and remove duplicates
            setMessageList((list) => removeDuplicateMessages([...list, data]));
        });
        
    }, [socket]);

    return (
        <div className="chat-window">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="chat-header">
                    <p>Welcome to the ChatRoom</p> <button>X</button>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent, index) => (
                            <div
                                className="message"
                                key={index}
                                id={username === messageContent.author ? "you" : "other"}
                            >
                                <div>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    <input
                        {...register('value')}
                        type="text"
                        placeholder="Hey..."
                        onChange={(event) => {}}
                    />
                    <button type="submit">&#9658;</button>
                </div>
            </form>
        </div>
    );
}

export default Message;
