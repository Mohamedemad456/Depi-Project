import React from "react";
import ReactDOM from "react-dom";
import style from "./EditModal.module.css";
const EditModal = ({ isOpen, onClose, children, task }) => {
  if (!isOpen) {
    return null;
  }
  const taskDueDate = new Date(task.dueDate);
  const taskStartDate = new Date(task.startDate);

  return ReactDOM.createPortal(
    <>
      <div className={style.backdrop} onClick={onClose}></div>
      <div className={style.modal}>
        <div className={style["task-content"]}>
          {/* <p className={style[""]}>Title</p> */}
          <section>
            <span className={style["section-header"]}>Task Title</span>
            <h3 className={style.taskTitle}>
              {task.name}
              {/* Trello Tip: This is where assigned tasks live so that your team
              can see who's working on what and when it's due. */}
            </h3>
          </section>
          <section>
            <span className={style["section-header"]}>Desc</span>
            <p className={style[""]}>
              {task.description}
              {/* Trello Tip: This is where assigned tasks live so that your team
              can see who's working on what and when it's due. */}
            </p>
          </section>
          <div className={style["date-container"]}>
            <section>
              <span className={style["section-header"]}>Start Date</span>
              <p className={style[""]}>{taskStartDate.toDateString()}</p>
            </section>
            <section>
              <span className={style["section-header"]}>End Date</span>
              <p className={style[""]}>{taskDueDate.toDateString()}</p>
            </section>
            <section>
              <span className={style["section-header"]}>Periority</span>
              <p className={style[""]}>Mideum</p>
            </section>
          </div>
        </div>
        <button onClick={onClose} className={style.closeButton}>
          X
        </button>
        {/* <div>{children}</div> */}
          <button className={style["edit-task-btn"]}>Edit Task</button>
      </div>
    </>,
    document.getElementById("edit-modal")
  );
};

export default EditModal;
