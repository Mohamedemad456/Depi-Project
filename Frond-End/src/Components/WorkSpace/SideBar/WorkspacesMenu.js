import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import { NavLink } from "react-router-dom";
import NewSpaceForm from "./NewSpaceForm";
import { useDispatch, useSelector } from "react-redux";
import { getWorkspaces } from "../../../Store/WorkspaceSlice";
import { deleteWorkspace } from "../../../Store/WorkspaceSlice";
const TasksMenu = () => {
  const [isNewWorkspace, setIsNewWorkspace] = useState(false);
  const dispatch = useDispatch();
  const userId = useSelector(state=>state.auth.user.userId);
  const user = useSelector(state=>state.auth.user);
  
  const workspaces = useSelector((state) =>
    state.workSpace.workSpaces
  );
  
  useEffect(() => {
    setTimeout(() => {
      dispatch(getWorkspaces(userId));
    }, 200);
  }, [dispatch, isNewWorkspace]);

  const newWorkspaceHandler = () => {
    setIsNewWorkspace((state) => !state);
  };

  const deleteWorkspaceHandler = (workspaceId) => {
    dispatch(deleteWorkspace(workspaceId));
  };

  return (
    <ul className={style["side-menu"]}>
      <div className={style["create-task"]}>
        <p className={style["side-icon"]} onClick={newWorkspaceHandler}>
          + Add New Workspace
        </p>
      </div>
      {isNewWorkspace && <NewSpaceForm newSpaceToggler={newWorkspaceHandler} />}
      
      {Object.keys(workspaces).map((spaceName) => (
        <div
          className={`${style["side-item"]} ${style["workspace-nav-link"]}`}
          key={workspaces[spaceName]._id}
        >
          <NavLink
            to={`/work-space/${workspaces[spaceName].name}`}
          >
            {workspaces[spaceName].name}
          </NavLink>
          <button
            className={style["delete-space-btn"]}
            onClick={() => {
              deleteWorkspaceHandler(workspaces[spaceName]?._id);
            }}
          >
            <i className={`bx bx-trash`}></i>
          </button>
        </div>
      ))}
    </ul>
  );
};

export default TasksMenu;
