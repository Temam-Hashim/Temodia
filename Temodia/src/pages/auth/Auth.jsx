import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo_1.png";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "./../../actions/AuthAction.js";
import Loader from "../../components/loader/Loader";

function Auth() {
  const dispatch = useDispatch();

  const { loading, authData } = useSelector((state) => state.AuthReducer);

  const [isLoginPage, setIsLoginPage] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const ResetForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoginPage) {
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
        data.username =
          data.email.split("@")[0] + Math.floor(0 + (999 - 0) * Math.random());
        data.mobile = "251" + data.mobile;
        try {
          dispatch(signUp(data));
        } catch (error) {
          console.log(error);
        }

        data.mobile = data.mobile.substring(3, 12);
        setErrorMessage("");
        // ResetForm();
      }
    } else {
      if (data.email === "") {
        setErrorMessage("username or email is required");
      } else if (data.password === "") {
        setErrorMessage("password is required");
      } else {
        setErrorMessage("");
        dispatch(logIn(data));
      }
      setErrorMessage("something went wrong. please try again");
    }
  };

  return (
    <div className="auth">
      <div className="a-left">
        <img
          src={Logo}
          alt=""
          className="logo-icon"
          style={{ width: 100, height: 100 }}
        />
        <div className="web-name">
          <h1>Temodia</h1>
          <h6>explore your ideas throughout the world</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="info-form auth-form" onSubmit={handleSubmit}>
          <h3>{isLoginPage ? "LOGIN" : "SIGN UP"}</h3>
          {!isLoginPage && (
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
              type={isLoginPage ? "text" : "email"}
              className="info-input"
              placeholder={isLoginPage ? "email or username" : "email address"}
              name={"email" || "username"}
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
            {!isLoginPage && (
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
              setIsLoginPage((prev) => !prev);
              ResetForm();
            }}
          >
            <span className="have-account">
              {isLoginPage
                ? "Don't have an Account. SIGN UP"
                : "Already have an Account. Login"}
            </span>
          </div>

          <button
            className="button info-button"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <Loader data=" Verifying " />
            ) : isLoginPage ? (
              "LOGIN"
            ) : (
              "SIGN UP"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
