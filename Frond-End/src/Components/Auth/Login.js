// Login.js

import React, { useReducer, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Store/AuthSlice";
import style from "./Login.module.css";
import AuthCard from "../UI/Auth/AuthCard";
import BrandIcon from "../UI/BrandIcon/BrandIcon";
import bg from "../../BG4.jpg";

const credentialsReducer = (state, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.value };
    case "SET_PASSWORD":
      return { ...state, password: action.value };
    default:
      return state;
  }
};

const initialCredentials = { username: "", password: "" };

const Login = () => {
  const [userCredentials, dispatchUser] = useReducer(
    credentialsReducer,
    initialCredentials
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isInputTouched, setIsInputTouched] = useState(false);

  const authError = useSelector((state) => state.auth.error); // Get error from Redux state
  const loading = useSelector((state) => state.auth.loading);

  const showErrorMessage = authError && !isInputTouched
  const inputChangeHandler = (type, value) => {
    dispatchUser({ type, value });
    setIsInputTouched(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(userCredentials));
    if (!authError && !loading) {
        navigate("/work-space");
    }
    setIsInputTouched(false);
  };

  return (
    <div className={style["login"]}>
      <AuthCard>
        <h1>
          TASK <BrandIcon />
        </h1>
        <h4>Login to TaskOO</h4>
        <form className={style["login-form"]} onSubmit={submitHandler}>
          {showErrorMessage && (
            <p className={style["wrong-credentials"]}>{authError}</p>
          )}
          <input
            onChange={(e) => {
              inputChangeHandler("SET_USERNAME", e.target.value);
            }}
            className={style["form-inpt"]}
            type="email"
            placeholder="Enter your email"
          />
          <input
            onChange={(e) => {
              inputChangeHandler("SET_PASSWORD", e.target.value);
            }}
            className={style["form-inpt"]}
            type="password"
            placeholder="Enter your password"
          />
          <input
            className={`${style["form-inpt"]} ${style["submit-btn"]}`}
            type="submit"
            value={"Login"}
          />
          <NavLink className={style["signup"]} to={"/auth/signup"}>
            Create an account
          </NavLink>
        </form>
      </AuthCard>
      <img src={bg} loading="lazy" alt="" />
    </div>
  );
};

export default Login;
