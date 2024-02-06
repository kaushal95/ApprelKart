import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function Signup() {
  const { token, user, signupHandler, logoutHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      toast.error("Please enter valid email and password combination");
    }
    if (password !== confirmPassword) {
      console.error("password not matching");
      toast.error(`password isn't matching`);
      return;
    }
    //   loginHandler({ email, password });

    signupHandler({ email, password });
  };
  return (
    <main className="login-container">
      <form className="form login-form">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="name@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <div className="login-password-input">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <span
              className="material-icons-outlined"
              onClick={() => setShowPassword(false)}
            >
              visibility
            </span>
          ) : (
            <span
              className="material-icons-outlined"
              onClick={() => setShowPassword(true)}
            >
              visibility_off
            </span>
          )}
        </div>
        <label htmlFor="confirm-password">Confirm Password</label>
        <div className="login-password-input">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmPassword ? (
            <span
              className="material-icons-outlined"
              onClick={() => setshowConfirmPassword(false)}
            >
              visibility
            </span>
          ) : (
            <span
              className="material-icons-outlined"
              onClick={() => setshowConfirmPassword(true)}
            >
              visibility_off
            </span>
          )}
        </div>
        <button
          className="btn signup-btn"
          action="submit"
          onClick={handleSignup}
        >
          Signup
        </button>
        <Link to="/login">
          Already have an account? <span>Login</span>
        </Link>
      </form>
    </main>
  );
}

export default Signup;
