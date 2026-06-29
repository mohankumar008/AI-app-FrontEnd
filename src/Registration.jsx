import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState,useContext } from "react";
import axios from "axios";
import { UserDetailContext } from "./context/UserDetailContext";
import { Routes,Route,Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Subplans from "./Subplans";


const Registration = () => {



  const { saveUserDetails} =
    useContext(UserDetailContext);
  const [formData, setformData] = useState({
    Yourname: "",
    youremail: "",
    password: "",
  });


  

  const [savedData, setsaveddata] = useState([]);
  const [ischecked, setischecked] = useState(true);
  const [show, setshow] = useState("password");
  const [hide, sethide] = useState("Showpassword");


  const navigate =useNavigate();

  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setformData({ ...formData, [name]: value });
    
  };

  const handleterms = () => {
    setischecked(!ischecked);
  };

  const handleshow = () => {
    setshow(show === "password" ? "text" : "password");
    sethide(hide === "Showpassword" ? "Hidepassword" : "Showpassword");
  };
  const gologinpage = () => {
    navigate("/login");

  }; 
  const url = `${import.meta.env.VITE_API_URL}/reg`;
  const handlelogin = async () => {
    // setsaveddata([...savedData, formData]);
    saveUserDetails(formData);
    
   

    if (ischecked) {
      alert("please accept the terms and conditions to process");
    } else {
      try {
        const response = await axios.post(url, {
          Yourname: formData.Yourname,
          youremail: formData.youremail,
          password: formData.password,
        });
        const data = response.data;

        if (response.status === 200) {
          if (!data.success) {
            alert("Email aleady exists,please login or use another email");
          } else {
            if (data.success) {
             
              navigate("/plan");
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <div>
        <div className="card " style={{ width: "30rem", height: "42rem" }}>
          <div className="card-body">
            <h5 className="text-primary ">Create your Account</h5>
            <p className="text-center small">Enter your details</p>
            <div>
              {/* <div className="row g-3">
                  <div className="col-12"> */}
              <div>
                <label
                  htmlFor="name"
                  className="form-label d-flex align-items-start"
                >
                  Your name
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="Yourname"
                  onChange={handlechange}
                />
              </div>

              {/* </div> */}

              {/* <div className="col-12"> */}
              <div className="mt-3">
                <label
                  htmlFor="email"
                  className="form-label d-flex align-items-start"
                >
                  Your email
                </label>

                <input
                  type="email"
                  name="youremail"
                  onChange={handlechange}
                  className="form-control"
                
                />
              </div>

              {/* </div> */}
              {/* <div className="col-12"> */}
              <div className="mt-3">
                <label
                  htmlFor="Password"
                  className="d-flex align-items-start form-label"
                >
                  Password
                </label>

                <input
                  type={show}
                  onChange={handlechange}
                  name="password"
                  className="form-control"
                />
                <button
                  className="btn btn-primary form-control mt-3"
                  onClick={handleshow}
                >
                  {hide}
                </button>
              </div>
              {/* </div> */}
              {/* <div className="col-12 text-center"> */}
              <input
                type="checkbox"
                className="mt-3 create"
                onClick={handleterms}
              />
              <label className="mt-3" htmlFor="conditions">
                I agree and accept the terms and conditions
              </label>
              {/* </div> */}
              {/* <div className="col-12"> */}
              <button
                onClick={handlelogin}
                className="btn btn-outline-primary  mt-3 btn-lg btn-block form-control"
                disabled={ischecked}
              >
                Create account
              </button>
              {/* </div> */}
              {/* <div className="col-12"> */}
              <p className="mt-3">Already have an account?</p>
              {/* </div> */}
              {/* <div className="col-12"> */}

              <button onClick={gologinpage} className="btn btn-outline-primary btn-lg btn-block form-control">
                login
              </button>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
