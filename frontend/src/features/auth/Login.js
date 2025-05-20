// src/features/auth/Login.js
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const { user, token } = await response.json();

      dispatch(setCredentials({ user, token }));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    // Your login form
    <input>
      <h3>LOGIN</h3>
    </input>
  );
};
