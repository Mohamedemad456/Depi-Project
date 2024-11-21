import React from "react";
import style from "./WorkSpace.module.css";
import { NavLink, useParams } from "react-router-dom";
const WorkSpaceNav = (props) => {
  const params = useParams();
  return (
    <nav className={style["nav"]}>
      <h1 className={style["workspace-title"]}> {params.id}</h1>
      <ul>
        <NavLink to="/workspace/tasks" className={style["active"]}>
          Add
        </NavLink>
        <NavLink to="/workspace/tasks" className={style["active"]}>
          Collaporators
        </NavLink>
        <NavLink to="/workspace/settings" className={style["active"]}>
          Settings
        </NavLink>
      </ul>
      <form action="">
        <span>
          <i className={`bx bx-search ${style["search-icon"]}`}></i>
        </span>
        <input
          type="text"
          className={style["search-input"]}
          placeholder="Search"
        />
      </form>
    </nav>
  );
};

export default WorkSpaceNav;
