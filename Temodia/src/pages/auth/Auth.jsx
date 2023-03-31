import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo-social.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn, signUp } from "../../Actions/AuthAction";

function Auth() {
  const dispatch = useDispatch();
  const [login, setLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!login) {
      if (data.firstName === "") {
        setErrorMessage(" first name is required");
      } else if (data.lastName === "") {
        setErrorMessage("last name is required");
      } else if (data.mobile === "") {
        setErrorMessage("mobile number is required");
      } else if (isNaN(data.mobile)) {
        setErrorMessage("invalid mobile number");
      } else if (data.mobile.length < 9) {
        setErrorMessage("minimum mobile number is of length 9");
      } else if (!data.mobile.startsWith(9)) {
        setErrorMessage(
          "mobile number must start with digit 9, ignoring 0 or 251"
        );
      } else if (data.email === "") {
        setErrorMessage("email address is required");
      } else if (data.password === "") {
        setErrorMessage("password is required");
      } else if (data.password !== data.confirmPassword) {
        setErrorMessage("confirm password is not matching");
      } else {
        // dispatch the data
        dispatch(signUp(data));
        setErrorMessage("");
        data.mobile = "251" + data.mobile;
        try {
          await axios
            .post("http://localhost:5000/api/v1/user", {
              username: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
              mobile: data.mobile,
            })
            .then((res) => {
              if (res.data) {
                setSuccessMessage("Registration Successful. Login Now");
                console.log(res.data);
              }
            });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      dispatch(logIn(data));
    }
  };
  const ResetForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="" className="logo-icon" />
        <div className="web-name">
          <h1>Temodia</h1>
          <h6>explore your ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="info-form auth-form" onSubmit={handleSubmit}>
          <h3>{login ? "LOGIN" : "SIGN UP"}</h3>
          {!login && (
            <>
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  className="info-input"
                  name="firstName"
                  onChange={handleChange}
                  value={data.firstName}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="info-input"
                  name="lastName"
                  onChange={handleChange}
                  value={data.lastName}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="info-input"
                  placeholder="Mobile Number"
                  name="mobile"
                  onChange={handleChange}
                  value={data.mobile}
                />
              </div>
            </>
          )}

          <div>
            <input
              type="text"
              className="info-input"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <input
              type="password"
              className="info-input"
              name="password"
              placeholder="Password"
              style={{ width: "100%" }}
              onChange={handleChange}
              value={data.password}
            />
            {!login && (
              <input
                type="password"
                className="info-input"
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={data.confirmPassword}
              />
            )}
          </div>

          <span
            style={{
              display: errorMessage === "" ? "none" : "block",
              color: "red",
              fontSize: 12,
              alignSelf: "center",
              marginRight: 5,
            }}
          >
            {" "}
            * {errorMessage}
          </span>

          <span
            style={{
              display: successMessage === "" ? "none" : "block",
              color: "blue",
              fontSize: 14,
              alignSelf: "center",
              marginRight: 5,
            }}
          >
            {" "}
            * {successMessage}
          </span>

          <div
            onClick={() => {
              setLogin((prev) => !prev);
              ResetForm();
            }}
          >
            <span className="have-account">
              {login
                ? "Don't have an Account. SIGN UP"
                : "Already have an Account. Login"}
            </span>
          </div>

          <button className="button info-button" type="submit">
            {login ? "LOGIN" : "SIGN UP"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
