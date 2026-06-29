import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Registration from './Registration'

import Subplans from "./Subplans";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import NextLogin from './NextLogin'
import Dashboard from './context/Dashboard'
import Error from './Error'
import Fileupload from "./Fileupload"






function App()  {
  const [count, setCount] = useState();
useEffect(()=>{
  const handlestyr = async () => {
    const tokken = localStorage.getItem("token");
    setCount(tokken !== null);
    console.log(count);
    
  };
  handlestyr();
window.addEventListener("token-update",handlestyr);

return()=>{
window.removeEventListener("token-update", handlestyr);

}

},[]

)
 

  
  return (
    <>
      <div className=" d-flex justify-content-center align-items-center">
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/plan" element={<Subplans />} />
          <Route path="/login" element={<NextLogin />} />
          <Route
            path="/fileupload"
            element={count ? <Fileupload /> : <Navigate to="/error" />}
          />
          <Route path="/error" element={<Error />} />
          {/* <Route path="/fileupload" element={<Fileupload />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App
