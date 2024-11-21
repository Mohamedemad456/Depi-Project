import React from "react";
import style from "./SideBar.module.css";
import BrandIcon from "../../UI/BrandIcon/BrandIcon";
import SideMenu from "./SideMenu";
import WorkspacesMenu from "./WorkspacesMenu";
import { useSelector } from "react-redux";

const SideBar = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <aside className={style["side-bar"]}>
      <h3 className={`${style["brand-icon"]} `}>
        TASK
        <BrandIcon />
      </h3>
      <p className={`${style["side-item"]} ${style["username"]}`}>
        {user && (
          <>
            <span className={style["pre-username"]}>
              {user.username[0] + user.username[1]}
            </span>
            {user.username}
          </>
        )}
      </p>
      <SideMenu />
      <WorkspacesMenu />
    </aside>
  );
};

export default SideBar;
