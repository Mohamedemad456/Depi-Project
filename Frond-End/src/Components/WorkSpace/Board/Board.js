import React, { useEffect, useState } from "react";
import style from "./Board.module.css";
import { useParams } from "react-router";
import TaskState from "./TaskState";
import EditModal from "../../UI/Modal/EditModal";
import { useDispatch, useSelector } from "react-redux";
import Task from "./Task";
import NewCategory from "./NewState";
import { getCategories, getTasks } from "../../../Store/WorkspaceSlice";
const Board = () => {
  const params = useParams();
  const dispatch = useDispatch(); 
  const [reloadCategories, setReloadCategories] = useState(false);
  const isLoading = useSelector((state) => state.workSpace.loading);
  const workspaceId = useSelector(
    (state) =>
      state.workSpace.workSpaces.filter((space) => space.name === params.id)[0]
        ._id
  );
  const categories = useSelector((state) => state.workSpace.categories);
  const tasks = useSelector((state) => state.workSpace.tasks);

  const dataReloadingToggler = () => {
    setReloadCategories((state) => !state);
  };

  useEffect(() => {
    dispatch(getCategories(workspaceId));
    dispatch(getTasks(workspaceId));
  }, [params,reloadCategories]);

  return ( 
    <>
      {!isLoading && (
        <> 
          <div className={style["board-container"]}>
            {categories.map((category) => (
              <TaskState 
                key={category._id}
                categoryId={category._id}
                state={category.name}
                dataReloadingToggler={dataReloadingToggler}
              >
                {tasks.map( 
                  (task) => 
                    task.categoryId._id == category._id && (
                      <Task key={task._id} taskContent={task} />
                    )
                )}
              </TaskState>
            ))}
            <NewCategory dataReloadingToggler={dataReloadingToggler} />
          </div>
          <EditModal></EditModal>
        </>
      )}
    </>
  );
};

export default Board;
