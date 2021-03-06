import React, { useState, useEffect, useRef } from "react";
import { firestoreService } from "../../Firebase";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
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
function TeacherScreen() {
  const [TeacherList, setTeacherList] = useState([]);
  const [Interest, setInterest] = useState(0);
  const db = firestoreService;
  const isLoaded = useRef(false);

  const searchTeacherListWithInterest = async () => {
    let resultTeachers = [];
    const q = query(
      collection(db, "User"),
      where("role", "==", "선생님"),
      where("interest", "==", interest[Interest].toString())
    );
    const querySnapshot = await (await getDocs(q)).docs;
    querySnapshot.map((e) => resultTeachers.push(e.data()));
    setTeacherList(resultTeachers);
  };
  useEffect(() => {
    if (TeacherList.length === 0 && isLoaded.current.valueOf() === false) {
      const getTeachers = async () => {
        let resultTeachers = [];
        const q = query(collection(db, "User"), where("role", "==", "선생님"));
        const querySnapshot = await (await getDocs(q)).docs;
        querySnapshot.forEach((e) => resultTeachers.push(e.data()));
        setTeacherList(resultTeachers);
      };
      isLoaded.current = true;
      getTeachers();
    }
  }, [TeacherList, db]);
  const interestChange = (e) => {
    setInterest(e.target.value);
  };

  return (
    <div className="teacher-screen">
      
      <div className="teacher-screen-search-result">
      <div className="teacher-screen-search">
        <select
          onChange={interestChange}
          value={Interest}
        >
          {interest.map((item, index) => (
            <option key={index} value={index}>
              {item}
            </option>
          ))}
        </select>
        <button
          onClick={searchTeacherListWithInterest}
        >
          검색하기
        </button>
      </div>
      <div className="teacher-screen-cards">
        {TeacherList.map((teacher) => {
          return (
            <div key={teacher.uid} className="teacher-screen-card">
              <div className="teacher-name">
                {teacher.name}선생님 ({teacher.interest})
              </div>
              <div className="teacher-carrer">경력사항</div>
              <div>
                <ul className="teacher-carrer-list">
                  {teacher.career &&
                    teacher.career.map((e, index) => {
                      return (
                        <li key={index} className="teacher-carrer-list-item">
                          {e}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default TeacherScreen;
