import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { firestoreService } from "../../Firebase";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore/lite";
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
  const db = firestoreService;
  const location = useLocation();
  const history = useHistory();
  const getDataFromFirestore = async () => {
    const q = query(
      collection(db, "User"),
      where("uid", "==", location.state.user.uid)
    );
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs;
    if (user.length !== 0) {
      const DocData = await getDoc(doc(db, "User", user[0].id));
      const getData = DocData.data();
      history.push("/", {
        userInfo: { ...getData, docId: DocData.id },
      });
    }
  };
  useEffect(() => {
    getDataFromFirestore();
  });
  const [UserName, setUserName] = useState("");
  const [UserInterest, setUserInterest] = useState("0");
  const [UserRole, setUserRole] = useState("0"); // 0-학생,1-선생님,2-관리자(직접)
  const [UserStudent, setUserStudent] = useState("0");
  const [CareerInput, setCareerInput] = useState("");
  const [UserCareer, setUserCareer] = useState([]);

  const addCareer = () => {
    if (CareerInput === "") {
      alert("경력을 입력해주세요");
    } else {
      setUserCareer([...UserCareer, CareerInput]);
      setCareerInput("");
    }
  };

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
      case "careerInput":
        setCareerInput(e.target.value);
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
        lectures: [],
      };
      await addDoc(collection(db, "User"), body).then((e) =>
        history.push("/main", {
          userInfo: { ...body, docId: e.id },
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
          <div>
            <input
              name="careerInput"
              onChange={inputChange}
              value={CareerInput}
              placeholder="경력을 입력하세요"
            />
            <button onClick={addCareer}>경력추가</button>
          </div>
        )}
        {UserCareer.map((e, index) => {
          return <div key={index}>{e}</div>;
        })}
        <button type="submit" onClick={submitToMainScreen}>
          정보입력완료
        </button>
      </div>
    </div>
  );
}

export default UserInputScreen;
