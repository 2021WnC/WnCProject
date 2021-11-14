import React from "react";

const interest = [
  "수학",
  "영어",
  "국어",
  "과학",
  "물리",
  "화학",
  "생명과학",
  "지구과학",
  "코딩",
];
const role = ["학생", "선생님"];

function Modal(props) {
  return (
    <div className="modal-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontSize: "24px" }}>회원정보 수정하기</span>
        </div>
        <button className="modal-button" onClick={props.modalToggle}>
          닫기
        </button>
      </div>
      <div className="modal-input">
        <div className="modal-input-container">
          <label style={{ fontWeight: "bold" }}>이름</label>
          <input
            value={props.nameValue}
            onChange={props.nameChange}
            placeholder="이름을 입력하세요"
          />
        </div>
        <div className="modal-input-container">
          <label style={{ fontWeight: "bold" }}>신분</label>
          <select value={props.roleValue} onChange={props.roleChange}>
            {role.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="modal-input-container">
          <label style={{ fontWeight: "bold" }}>분야</label>
          <select value={props.interestValue} onChange={props.interestChange}>
            {interest.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </div>
        {props && props.roleValue === "선생님" && (
          <div className="modal-input-container">
            <div>
              <label style={{ fontWeight: "bold" }}>경력</label>
              <input
                placeholder="경력을 추가하세요"
                value={props.tempCareerValue}
                onChange={props.tempCareerChange}
              />
              <button onClick={props.addCareer}>경력추가</button>
            </div>
            <ol>
              {props &&
                props.careerValue.map((e) => {
                  return <li>{e}</li>;
                })}
            </ol>
          </div>
        )}
      </div>
      <div
        style={{
          marginTop: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button className="modal-button" onClick={props.userDelete}>
          회원탈퇴하기
        </button>
        <button className="modal-button" onClick={props.userEdit}>
          수정하기
        </button>
      </div>
    </div>
  );
}

export default Modal;
