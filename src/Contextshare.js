// ContextShare.js
import React, { createContext, useState } from 'react';

export const LoginDataContext = createContext();

export const MypostContext=createContext();

export const DeletedContext=createContext();

export const EditContext=createContext()

// export const ChatFeatureContext=createContext()


function ContextShare({ children }) {
  const [loggedInData, setLoggedInData] = useState(''); // Make sure loggedInData is initialized correctly
  const [mypost,setmypost]=useState('')
  const [deletedContxt,setdeletedContxt]=useState('')
  const [editContxt,seteditContxt]=useState('')
  const [chatVisibility,setchatVisibility]=useState('')

  return (
    <LoginDataContext.Provider value={{ loggedInData, setLoggedInData }}>
      <MypostContext.Provider value={{mypost,setmypost}} >
      <DeletedContext.Provider value={{deletedContxt,setdeletedContxt}}>
        <EditContext.Provider value={{editContxt,seteditContxt}}>
          
          {children}
          
        
        </EditContext.Provider>
     
      </DeletedContext.Provider>
      
            
      </MypostContext.Provider>
      
    </LoginDataContext.Provider>
  );
}

export default ContextShare;
