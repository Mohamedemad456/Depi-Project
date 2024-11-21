import React, { useState } from "react";
import style from "./NewSpace.module.css";
import { workSpaceActions } from "../../../Store/WorkspaceSlice";
import { createWorkspace } from "../../../Store/WorkspaceSlice";
import { useDispatch, useSelector } from "react-redux";
const NewSpaceForm = (props) => {
  const dispatch = useDispatch();
  const [newSpaceName, setNewSpaceName] = useState("");
  const [spaceNameError, setSpaceNameError] = useState(false);
  
  const user = useSelector((state) => state.auth.user);
  const workspaces = useSelector((state) => state.workSpace.workSpaces);
  
  
  const spaceNameChangeHandler = (e) => {
    setNewSpaceName(e.target.value);
    Object.keys(workspaces).includes(e.target.value)
      ? setSpaceNameError(true)
      : setSpaceNameError(false);

  };
  const addSpaceSubmitHandler = () => {
    !spaceNameError &&
      dispatch(
        createWorkspace({ name: newSpaceName,userId:user.userId,categories:[] })
      );
  };
  return (
    <form className={style["add-space-form"]} onSubmit={addSpaceSubmitHandler}>
      <input
        type="text"
        placeholder="Add a Workspace title "
        onChange={spaceNameChangeHandler}
      />
      {spaceNameError && (
        <p className={style["space-name-error"]}>This name is already exist </p>
      )}
      <div className={style["ctrl"]}>
        <button
          className={style["add-btn"]}
          onClick={() => {
            props.newSpaceToggler();
            addSpaceSubmitHandler();
          }}
        >
          Add
        </button>
        <button
          className={style["cancel-btn"]}
          onClick={() => props.newSpaceToggler()}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default NewSpaceForm;
