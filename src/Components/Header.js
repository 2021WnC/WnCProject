import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { authService, firestoreService } from "../Firebase";
import { getUserInfo, isAdminFunction } from "../Func";
import {
  updateDoc,
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore/lite";
import Modal from "./Modal";
const Header = ({ isMain }) => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [UserName, setUserName] = useState("");
  const [UserRole, setUserRole] = useState("");
  const [UserInterest, setUserInterest] = useState("");
  const [UserCareer, setUserCareer] = useState([]);
  const [tempCareer, setTempCareer] = useState("");
  const db = firestoreService;
  const userId = useRef();
  useEffect(() => {
    authService.onAuthStateChanged(async () => {
      if (authService.currentUser) {
        setIsAdmin(await isAdminFunction(authService.currentUser.uid));
        const user = await getUserInfo(authService.currentUser.uid);
        setUserName(user.name);
        setUserRole(user.role);
        setUserInterest(user.interest);
        setUserCareer(user.career);
        userId.current = user.id;
      }
    });
  }, []);

  const userLogOut = () => {
    authService.signOut().then(() => {
      history.push("/");
      history.go(0);
    });
  };
  const tempCareerChange = (e) => {
    setTempCareer(e.target.value);
  };
  const nameChange = (e) => {
    setUserName(e.target.value);
  };
  const roleChange = (e) => {
    setUserRole(e.target.value);
  };
  const interestChange = (e) => {
    setUserInterest(e.target.value);
  };
  const addCareer = () => {
    setUserCareer([...UserCareer, tempCareer]);
    setTempCareer("");
  };
  const userEdit = async () => {
    await updateDoc(doc(db, "User", userId.current), {
      name: UserName,
      role: UserRole,
      interest: UserInterest,
      career: UserCareer,
    }).then(() => history.go(0));
  };
  const userDelete = async () => {
    const q = query(
      collection(db, "board"),
      where("writer", "==", userId.current)
    );
    const querySnapshot = await (await getDocs(q)).docs;
    for (const e of querySnapshot) {
      await deleteDoc(doc(db, "board", e.id));
    }
    await authService.currentUser
      .delete()
      .then(() => deleteDoc(doc(db, "User", userId.current)))
      .then(() => console.log("deleteFinished"))
      .then(
        async () =>
          await authService.signOut().then(() => {
            history.push("/");
            history.go(0);
          })
      );
  };

  return (
    <>
      <header>
        <div className="inner">
          <GoOrganization size="50" color="#666" />
          <div className="sub-menu">
            <ul className="menu">
              <li>
                <p>
                  <button
                    className="btn-header"
                    onClick={() => {
                      history.push("/main");
                      if (isMain) {
                        history.go(0);
                      }
                    }}
                  >
                    ?????? ?????? ??????
                  </button>
                </p>
              </li>
              <li>
                <Link to="/teachers">
                  <button className="btn-header">????????? ??????</button>
                </Link>
              </li>
              <li>
                <Link to="/lectures">
                  <button className="btn-header">?????? ??????</button>
                </Link>
              </li>

              <li>
                <FaUserCircle
                  className="userIcon"
                  onClick={() => setIsEdit(!isEdit)}
                  size="30"
                />
              </li>
              <li>
                <FaBell className="userIcon" size="30" />
              </li>
              {isAdmin === true && (
                <li>
                  <Link to="/admin">
                    <FaRegSun
                      className="userIcon"
                      onClick={() => console.log(isAdmin)}
                      size="30"
                    />
                  </Link>
                </li>
              )}
              <li>
                <GrLogout className="userIcon" size="30" onClick={userLogOut} />
              </li>
            </ul>
          </div>
        </div>
      </header>
      {isEdit && (
        <div style={{ position: "relative" }}>
          <Modal
            nameValue={UserName}
            roleValue={UserRole}
            interestValue={UserInterest}
            careerValue={UserCareer}
            tempCareerValue={tempCareer}
            addCareer={addCareer}
            tempCareerChange={tempCareerChange}
            nameChange={nameChange}
            roleChange={roleChange}
            interestChange={interestChange}
            userEdit={userEdit}
            modalToggle={() => setIsEdit(!isEdit)}
            userDelete={userDelete}
          />
        </div>
      )}
    </>
  );
};

export default Header;
