import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-hot-toast";
export default function Login() {
  const { token, user, loginHandler, signupHandler, logoutHandler } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    loginHandler({ email, password });
  };
  const handleGuestLogin = (e) => {
    e.preventDefault();
    const email = "abc@gmail.com";
    const password = "abc@123";
    setEmail(email);
    setPassword(password);
    loginHandler({ email, password });
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
        <button className="btn login-btn" type="submit" onClick={handleLogin}>
          Login
        </button>
        <button
          className="btn login-btn"
          type="submit"
          onClick={handleGuestLogin}
        >
          Login as guest
        </button>
        <Link to="/signup">
          Don't have an account? <span>SignUp</span>
        </Link>
      </form>
    </main>
  );
}
