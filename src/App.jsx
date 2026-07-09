import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Registration from "./Registration";
import Subplans from "./Subplans";
import NextLogin from "./NextLogin";
import Error from "./Error";
import Fileupload from "./Fileupload";
import Payment from "./Payment";

function App() {
  const [count, setCount] = useState();

  useEffect(() => {
    const handlestyr = async () => {
      const tokken = localStorage.getItem("token");
      setCount(tokken !== null);
    };
    handlestyr();
    window.addEventListener("token-update", handlestyr);
    return () => {
      window.removeEventListener("token-update", handlestyr);
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/plan" element={<Subplans />} />
      <Route path="/login" element={<NextLogin />} />
      <Route path="/payment" element={<Payment />} />
      <Route
        path="/fileupload"
        element={count ? <Fileupload /> : <Navigate to="/error" />}
      />
      <Route path="/error" element={<Error />} />
    </Routes>
  );
}

export default App;
