import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const NextLogin = () => {
  const [show, setshow] = useState("password");
  const [hide, sethide] = useState("Showpassword");
  const [logindatas, setlogindatas] = useState({
    youremail: "",
    password: "",
  });

  const handleshow = () => {
    setshow(show === "password" ? "text" : "password");
    sethide(hide === "Showpassword" ? "Hidepassword" : "Showpassword");
  };

  const navigate = useNavigate();

  const handlecreate = () => {
    navigate("/");
  };

  const handlechangeinlogin = (e) => {
    const name = e.target.name;

    const value = e.target.value;
    console.log(name, ":", value);
    setlogindatas({ ...logindatas, [name]: value });
    console.log(logindatas);
  };

  const url = `https://ai-app-backend-production-b9e9.up.railway.app/savelogin`;

  const handleAuthenticate = async () => {
    try {

      
      const response = await axios.post(url, {
        youremail: logindatas.youremail,
        password: logindatas.password,
      });

      if (response.status === 201) {
        alert("user not found");
      } else {
        if (response.status === 202) {
          alert("invalid password");
        } else {
          if (response.status === 203) {
            alert("Your plan expired,please create new account!");
            navigate("/plan")
          } else {
            const tokens = response.data.token;
            console.log(tokens);
            localStorage.setItem("token", tokens);
            window.dispatchEvent(new Event("token-update"));

            navigate("/fileupload");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div>
        <div className="card " style={{ width: "30rem" }}>
          <div className="card-body">
            <h5 className="text-primary ">Login to Your Account</h5>
            <p className="text-center small">
              Enter your email and password to login
            </p>
            <div>
              {/* <div className="row g-3">
                  <div className="col-12"> */}

              <label
                htmlFor="email"
                className=" form-label d-flex align-items-start"
              >
                Email
              </label>
              <div className="input-group">
                <div className="input-group-text">@</div>
                <input
                  type="email"
                  onChange={handlechangeinlogin}
                  className="form-control"
                  name="youremail"
                />
              </div>

              {/* </div> */}

              {/* <div className="col-12"> */}

              {/* </div> */}
              {/* <div className="col-12"> */}
              <div className="mt-3">
                <label
                  htmlFor="password"
                  className="d-flex align-items-start form-label"
                >
                  Password
                </label>

                <input
                  type={show}
                  onChange={handlechangeinlogin}
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

              {/* </div> */}
              {/* <div className="col-12"> */}
              <button
                onClick={handleAuthenticate}
                className="btn btn-outline-primary btn-lg mt-3 btn-block form-control"
              >
                Login
              </button>
              {/* </div> */}
              {/* <div className="col-12"> */}
              <p className="mt-3 d-flex align-items-start">
                Don't have an account?
              </p>
              {/* </div> */}
              {/* <div className="col-12"> */}
              <p className="text-primary  create" onClick={handlecreate}>
                <u>Create an account </u>
              </p>
              {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NextLogin;
