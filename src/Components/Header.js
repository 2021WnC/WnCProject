import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { authService, firestoreService } from "../Firebase";
import { getUserInfo, isAdminFunction } from "../Func";
import { updateDoc, doc } from "firebase/firestore/lite";
import Modal from "./Modal";
const Header = ({ isMain }) => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [UserName, setUserName] = useState("");
  const [UserRole, setUserRole] = useState("");

  const db = firestoreService;
  const userId = useRef();
  useEffect(() => {
    authService.onAuthStateChanged(async () => {
      if (authService.currentUser) {
        setIsAdmin(await isAdminFunction(authService.currentUser.uid));
        const user = await getUserInfo(authService.currentUser.uid);
        setUserName(user.name);
        setUserRole(user.role);
        userId.current = user.id;
      }
    });
  }, []);

  const userLogOut = () => {
    authService.signOut().then(() => history.push("/"));
  };
  const nameChange = (e) => {
    setUserName(e.target.value);
  };
  const roleChange = (e) => {
    setUserRole(e.target.value);
  };
  const userEdit = async () => {
    await updateDoc(doc(db, "User", userId.current), {
      name: UserName,
      role: UserRole,
    }).then(() => console.log("updateFinished"));
  };
  const userDelete = async () => {};

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
                    과외 학생 모집
                  </button>
                </p>
              </li>
              <li>
                <Link to="/teachers">
                  <button className="btn-header">선생님 목록</button>
                </Link>
              </li>
              <li>
                <Link to="/lectures">
                  <button className="btn-header">강의 목록</button>
                </Link>
              </li>

              <li>
                <FaUserCircle onClick={() => setIsEdit(!isEdit)} size="30" />
              </li>
              <li>
                <FaBell size="30" />
              </li>
              {isAdmin === true && (
                <li>
                  <Link to="/admin">
                    <FaRegSun onClick={() => console.log(isAdmin)} size="30" />
                  </Link>
                </li>
              )}
              <li>
                <GrLogout size="30" onClick={userLogOut} />
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
            nameChange={nameChange}
            roleChange={roleChange}
            userEdit={userEdit}
            modalToggle={() => setIsEdit(!isEdit)}
          />
        </div>
      )}
    </>
  );
};

export default Header;
