import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
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

function TeacherScreen() {
  const location = useLocation();
  const history = useHistory();
  const [User, setUser] = useState();
  const [TeacherList, setTeacherList] = useState([]);
  const db = firestoreService;
  const getTeachers = async () => {
    let resultTeachers = [];
    const q = query(collection(db, "User"), where("role", "==", "선생님"));
    const querySnapshot = await (await getDocs(q)).docs;
    querySnapshot.forEach((e) => resultTeachers.push(e.data()));
    setTeacherList(resultTeachers);
  };
  const searchTeacherListWithInterest = async (interest) => {
    let resultTeachers = [];
    const q = query(
      collection(db, "User"),
      where("role", "==", "선생님"),
      where("interest", "==", interest)
    );
    const querySnapshot = await (await getDocs(q)).docs;
    querySnapshot.forEach((e) => resultTeachers.push(e.data()));
    setTeacherList(resultTeachers);
  };
  const searchTeacherListWithCareer = async (text) => {
    let resultTeachers = [];
    const q = query(
      collection(db, "User"),
      where("role", "==", "선생님"),
      where("career", "in", text)
    );
    const querySnapshot = await (await getDocs(q)).docs;
    querySnapshot.forEach((e) => resultTeachers.push(e.data()));
    setTeacherList(resultTeachers);
  };
  useEffect(() => {
    getTeachers().then(() => setUser(location.state.userInfo));
    console.log("www");
  }, [location.state.userInfo]);

  return (
    <div>
      teacher Screen
      <button onClick={getTeachers}>getTeachers</button>
      <button onClick={() => console.log(TeacherList)}>TeacherList</button>
      <button onClick={() => console.log(User)}>User</button>
      <div>
        <li></li>
      </div>
    </div>
  );
}

export default TeacherScreen;
