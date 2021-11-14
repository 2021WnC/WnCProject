import React from "react";

const role = ["학생", "선생님"];

function Modal(props) {
  return (
    <div
      style={{
        position: "absolute",
        top: "10vh",
        left: "35vw",
        width: "30vw",
        height: "300px",
        backgroundColor: "green",
        zIndex: "10",
      }}
    >
      <div>
        <button onClick={props.modalToggle}>닫기</button>
        <label>이름</label>
        <input
          value={props.nameValue}
          onChange={props.nameChange}
          placeholder="이름을 입력하세요"
        />
        <label>신분</label>
        <select value={props.roleValue} onChange={props.roleChange}>
          {role.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
        <button onClick={props.userEdit}>check</button>
      </div>
    </div>
  );
}

export default Modal;
