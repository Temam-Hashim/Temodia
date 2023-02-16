import React from "react";
import "./Auth.css";
import Logo from "../../img/logo-social.png";

function Auth() {
  return (
    <div className="auth">
      <div className="a-left">
        <img src={Logo} alt="" className="logo-icon" />
        <div className="web-name">
          <h1>Temodia</h1>
          <h6>explore your ideas throughout the world</h6>
        </div>
      </div>
      {/* sign up */}
      <Login />
    </div>
  );
}

function Login() {
  return (
    <div className="a-right">
      <form className="info-form auth-form login-form">
        <h3>Login</h3>

        <div>
          <input
            type="text"
            className="info-input"
            placeholder="Username or Email"
            name="username"
          />
        </div>
        <div>
          <input
            type="password"
            className="info-input"
            name="password"
            placeholder="Password"
          />
        </div>
        <div>
          <span className="have-account">Don't have an account. Signup</span>
        </div>
        <button className="button info-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
function Signup() {
  return (
    <div className="a-right">
      <form className="info-form auth-form">
        <h3>Sign Up</h3>
        <div>
          <input
            type="text"
            placeholder="First Name"
            className="info-input"
            name="firstName"
          />
          <input
            type="text"
            placeholder="Last Name"
            className="info-input"
            name="lastName"
          />
        </div>
        <div>
          <input
            type="text"
            className="info-input"
            placeholder="Username"
            name="username"
          />
        </div>
        <div>
          <input
            type="text"
            className="info-input"
            placeholder="Email Address"
            name="email"
          />
        </div>
        <div>
          <input
            type="password"
            className="info-input"
            name="password"
            placeholder="Password"
          />
          <input
            type="password"
            className="info-input"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        </div>
        <div>
          <span className="have-account">Already have an Account. Login</span>
        </div>
        <button className="button info-button" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}
export default Auth;
