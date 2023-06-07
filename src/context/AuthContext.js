import { createContext, useContext, useReducer, useState } from "react";
import { userLogin, userSignup } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const locatUserData = JSON.parse(localStorage.getItem("user"));
  const [token, setToken] = useState(locatUserData?.token || "");
  const [user, setUser] = useState(locatUserData?.userDetail);
  const location = useLocation();
  const navigate = useNavigate();

  const loginHandler = async (user) => {
    try {
      const response = await userLogin(user);
      if (response?.status === 200) {
        const { foundUser, encodedToken } = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ token: encodedToken, userDetail: foundUser })
        );
        setToken(encodedToken);
        setUser(foundUser);
        navigate(location?.state?.from?.pathname || "/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const signupHandler = async (user) => {
    try {
      const response = await userSignup(user);
      if (response?.status === 201) {
        const { createdUser, encodedToken } = await response.json();
        localStorage.setItem(
          "user",
          JSON.stringify({ token: encodedToken, userDetail: createdUser })
        );
        setToken(encodedToken);
        setUser(createdUser);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setToken("");
    setUser(null);
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{ token, user, loginHandler, signupHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
