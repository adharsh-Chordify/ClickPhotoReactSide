import logo from './logo.svg';
import './App.css';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import UploadImage from './UploadImage';
import Homepage from './Homepage';

import Edit from './Edit';
import ForgotPassword from './ForgotPassword';
import ChatSide from './ChatSide';


function App() {
  return (
    <>
    <Routes>
      <Route path='login' element={<Login></Login>} ></Route>
      <Route path='Register' element={<Register></Register>} ></Route>
      <Route path='upload' element={<UploadImage></UploadImage>}></Route>
      <Route path='/' element={<Homepage></Homepage>}></Route>
      <Route path='edit/:id' element={<Edit></Edit>}></Route>
      <Route path='forgotpassword' element={<ForgotPassword></ForgotPassword>}></Route>
    </Routes>
    
    </>
  );
}

export default App;
