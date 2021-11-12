import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import { firestoreService } from "../../Firebase";
import { addDoc, collection } from "firebase/firestore/lite";
// 이름 분야 선생님인지/학생인지 - 선생님의경우 경력,학생일경우 중/고등학생인지

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
const student = ["중학생", "고등학생"];

function UserInputScreen() {
  const [UserName, setUserName] = useState("");
  const [UserInterest, setUserInterest] = useState("0");
  const [UserRole, setUserRole] = useState("0"); // 0-학생,1-선생님,2-관리자(직접)
  const [UserStudent, setUserStudent] = useState("0");
  const [UserCareer, setUserCareer] = useState("");
  const location = useLocation();
  const history = useHistory();

  const inputChange = (e) => {
    switch (e.target.name) {
      case "name":
        setUserName(e.target.value);
        break;
      case "interest":
        setUserInterest(e.target.value);
        break;
      case "role":
        setUserRole(e.target.value);
        break;
      case "student":
        setUserStudent(e.target.value);
        break;
      case "career":
        setUserCareer(e.target.value);
        break;
      default:
        break;
    }
  };
  const submitToMainScreen = async (e) => {
    if (UserName) {
      const user = location.state.user;
      const body = {
        uid: user.uid,
        name: UserName,
        interest: interest[UserInterest],
        role: role[UserRole],
        student: student[UserStudent],
        career: UserCareer,
      };
      const db = firestoreService;
      console.log(user);
      await addDoc(collection(db, "User"), body).then(() =>
        history.push("/main", {
          userInfo: body,
        })
      );
    }
  };
  return (
    <div className="user-input-screen">
      정보를 입력해주세요
      <div className="user-input-container">
        <input
          required
          name="name"
          onChange={inputChange}
          value={UserName}
          placeholder="이름을 입력하세요"
        />
        <select name="interest" onChange={inputChange} value={UserInterest}>
          {interest.map((item, index) => (
            <option value={index} key={index}>
              {item}
            </option>
          ))}
        </select>
        <select name="role" onChange={inputChange} value={UserRole}>
          {role.map((item, index) => (
            <option value={index} key={index}>
              {item}
            </option>
          ))}
        </select>
        {UserRole === "0" ? (
          <select name="student" onChange={inputChange} value={UserStudent}>
            {student.map((item, index) => (
              <option value={index} key={index}>
                {item}
              </option>
            ))}
          </select>
        ) : (
          <input
            required
            name="career"
            onChange={inputChange}
            value={UserCareer}
            placeholder="경력을 입력하세요"
            maxLength="150"
          />
        )}
        <button type="submit" onClick={submitToMainScreen}>
          정보입력완료
        </button>
      </div>
    </div>
  );
}

export default UserInputScreen;
