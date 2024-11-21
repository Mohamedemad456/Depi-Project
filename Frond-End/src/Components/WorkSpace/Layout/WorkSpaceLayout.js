import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router";
import style from "./WorkSpace.module.css";
import WorkSpaceNav from "./WorkSpaceNav";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Store/AuthSlice";
import { useEffect } from "react";
import Spinner from "../../UI/Spinner/Spinner";
const WorkSpaceLayout = () => {
  // const workspaces = useSelector((state) => state.workSpace.workSpaces);
  const user = useSelector(state=>state.auth.user)
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      const user = JSON.parse(localStorage.user);

      dispatch(loginUser({username:user.email, password:user.password}));
    }
  },[]);
  return (
    <>
    
    {user!== null ?(
    <div className={style["work-space"]}>
      <SideBar />
      <main>
        <WorkSpaceNav />
        <Outlet />
      </main>
    </div>
    ):<Spinner/>}
    </>
  );
};

export default WorkSpaceLayout;
