import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link,useNavigate } from "react-router-dom";
import NextLogin from "./NextLogin";
import { useContext } from "react";
import { UserDetailContext } from "./context/UserDetailContext";
import { useEffect } from "react";
import axios from "axios";

const Subplans = () => {
  const { planDetails, userCompleteDetails } = useContext(UserDetailContext);

 const url = `https://ai-app-backend-production-b9e9.up.railway.app/planreg`;
  useEffect(() => {
    const sendData = async () => {
      const data = userCompleteDetails();
      console.log(data);
      const respones = await axios.post(url, {
        Yourname: data.Yourname,
        youremail: data.youremail,
        password: data.password,
        plan: data.plan,
      });
    };
    return sendData;
  }, [userCompleteDetails]);

  const navigate = useNavigate();

  const handleAccount = (e) => {
    const value = e.target.name;
    planDetails(value);

    navigate("/login");
  };

  
  return (
    <>
      <div>
        <h4>
          <u className="text-primary">Select your Plan</u>
        </h4>
        <p>
          "From active listening to strategic implementation, we redefine
          systems for enhanced efficiency, simplified processes, and informed
          decision- making"
        </p>
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-6 mt-3 col-lg-4 col-sm-12 d-flex justify-content-center align-items-center">
            <div
              className="card text-bg-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-white text-primary">
                <h5>Free Trial</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Expires in 24 hours</h6>
                <h6 className="d-flex align-items-start">
                  Max file size : 5 MB
                </h6>
                <h6 className="d-flex align-items-start">OCR support : YES</h6>
                <h6 className="d-flex align-items-start">
                  Customer support : NO
                </h6>
                <h6 className="d-flex align-items-start">
                  Total sessions : Unlimited
                </h6>
                <button
                  className="btn mt-3 form-control btn-outline-light  text-dark"
                  onClick={handleAccount}
                  name={"Free Trial"}
                >
                  Create a free account
                </button>

                {/* <p>OCR support : YES</p> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-3 col-lg-4 col-sm-12 d-flex justify-content-center align-items-center">
            <div
              className="card text-bg-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-white text-primary">
                <h5>Pro</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Rs 999/week</h6>
                <h6 className="d-flex align-items-start">
                  Max file size : 5 MB
                </h6>
                <h6 className="d-flex align-items-start">OCR support : YES</h6>
                <h6 className="d-flex align-items-start ">
                  Customer support : YES
                </h6>
                <h6 className="d-flex align-items-start">
                  Total sessions : Unlimited
                </h6>
                <button
                  className="btn mt-3 form-control btn-outline-light  text-dark"
                  onClick={handleAccount}
                  name={"Pro"}
                >
                  Select plan
                </button>
                {/* <button className="btn mt-3 form-control btn-outline-light  text-dark">
                  Pay now
                </button> */}

                {/* <p>OCR support : YES</p> */}
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 mt-3 d-flex justify-content-center align-items-center">
            <div
              className="card text-bg-primary mb-3"
              style={{ maxWidth: "18rem" }}
            >
              <div className="card-header bg-white text-primary">
                <h5>Advanced</h5>
              </div>
              <div className="card-body">
                <h6 className="card-title">Rs 3499/month</h6>
                <h6 className="d-flex align-items-start">
                  Max file size : 5 MB
                </h6>
                <h6 className="d-flex align-items-start">OCR support : YES</h6>
                <h6 className="d-flex align-items-start">
                  Customer support : YES
                </h6>
                <h6 className="d-flex align-items-start">
                  Total sessions : Unlimited
                </h6>
                <button
                  className="btn mt-3 form-control btn-outline-light  text-dark"
                  onClick={handleAccount}
                  name={"Advanced"}
                >
                  Select plan
                </button>
                {/* <button className="btn mt-3 form-control btn-outline-light  text-dark">
                  Pay now
                </button> */}

                {/* <p>OCR support : YES</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subplans;
