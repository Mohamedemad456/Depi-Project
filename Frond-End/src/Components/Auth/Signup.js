import React, { useReducer, useState } from "react";
import style from "./Login.module.css";
import AuthCard from "../UI/Auth/AuthCard";
import BrandIcon from "../UI/BrandIcon/BrandIcon";
import { NavLink, useNavigate } from "react-router-dom";
import bg from "../../BG4.jpg";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../Store/AuthSlice";

const credentialsReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, username: action.value };
    case "SET_EMAIL":
      return { ...state, email: action.value };
    case "SET_PASSWORD":
      return { ...state, password: action.value };
    default:
      return state;
  }
};
const initialCredentials = { username: "", email: "", password: "" };
const Signup = () => {
  const [userCredentials, dispatchUser] = useReducer(
    credentialsReducer,
    initialCredentials
  );
  const authError = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);

  const [confirmPasswordState, setConfirmPasswordState] = useState("");
  const isIdenticalPassword = confirmPasswordState === "Identical Password";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //////////////////////
  const inputChangeHandler = (type, value) => {
    dispatchUser({ type, value });
  };

  //////////////////////
  const submitHandler = async (e) => {
    //Bug hereeeee if you entered an invalid data will navigate to the login
    e.preventDefault();
    await dispatch(signupUser(userCredentials));
    console.log(authError);
    if (authError === null && !loading) {
      console.log(authError);

      console.log("hleoooooooo");
      navigate("/auth/login");
    }
  };
  //////////////////////
  return (
    <div className={style["signup-container"]}>
      <AuthCard>
        <h1>
          TASK <BrandIcon />
        </h1>
        <h4>Signup to TASKOO</h4>
        {authError && <p className={style["wrong-credentials"]}>{authError}</p>}
        <form onSubmit={submitHandler} className={style["login-form"]}>
          <input
            className={style["form-inpt"]}
            type="text"
            placeholder="Enter your Name"
            onChange={(e) => {
              inputChangeHandler("SET_NAME", e.target.value);
            }}
          />
          <input
            className={style["form-inpt"]}
            type="email"
            placeholder="Enter your email"
            onChange={(e) => {
              inputChangeHandler("SET_EMAIL", e.target.value);
            }}
          />
          <input
            className={style["form-inpt"]}
            type="password"
            placeholder="Enter your password"
            onChange={(e) => {
              console.log();

              inputChangeHandler("SET_PASSWORD", e.target.value);
            }}
          />
          <input
            className={style["form-inpt"]}
            type="password"
            placeholder="Confirm password"
            onChange={(e) => {
              e.target.value === userCredentials.password
                ? setConfirmPasswordState("Identical Password")
                : setConfirmPasswordState("Passwords not matched ");
            }}
          />
          <p
            className={
              isIdenticalPassword
                ? style["identical-pass"]
                : style["different-pass"]
            }
          >
            {confirmPasswordState}
          </p>
          <input
            className={`${style["form-inpt"]} ${style["submit-btn"]}`}
            type="submit"
            value={"SIGNUP"}
          />
          <NavLink className={style["signup"]} to={"/auth/login"}>
            Already have an account ?
          </NavLink>
        </form>
      </AuthCard>
      <img src={bg} loading="lazy" alt="" />
    </div>
  );
};

export default Signup;
