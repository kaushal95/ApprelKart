import { createContext, useContext, useReducer, useState } from "react";
import { userLogin, userSignup } from "../services/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { initialUserState, authReducer } from "../reducers/authReducer";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const locatUserData =
    JSON.parse(localStorage.getItem("user")) || initialUserState;
  const [token, setToken] = useState(locatUserData?.token);
  const [user, userDispatch] = useReducer(
    authReducer,
    locatUserData?.userDetail
  );
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
        userDispatch({
          type: "LOGIN",
          payload: { ...foundUser, token: token },
        });
        // setUser(foundUser);
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
        userDispatch({
          type: "SIGNUP",
          payload: { ...createdUser, token: token },
        });

        // setUser(createdUser);
        navigate("/");
      } else if (response?.status === 422) {
        toast.error(`Email is already registered.`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setToken("");
    // setUser(null);
    userDispatch({
      type: "LOGOUT",
    });

    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginHandler,
        signupHandler,
        logoutHandler,
        userDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
