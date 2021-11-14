import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { authService } from "../Firebase";
import { getUserInfo, isAdminFunction } from "../Func";
const Header = ({ isMain }) => {
  const history = useHistory();
  const [UserInfo, setUserInfo] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        const loadUserInfo = async () => {
          setUserInfo(await getUserInfo(authService.currentUser.uid));
        };
        loadUserInfo().then(() =>
          setIsAdmin(isAdminFunction(authService.currentUser.uid))
        );
      }
    });
  }, []);

  return (
    <>
      <header>
        <div className="inner">
          <a href="/" className="logo">
            <GoOrganization size="66" color="#666" />
          </a>
          <div className="sub-menu">
            <ul className="menu">
              <li>
                <p>
                  <button
                    className="btn-header"
                    onClick={() => {
                      history.push("/");
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
              {isAdmin && (
                <li>
                  <Link to="/admin">
                    <button className="btn-header">관리자</button>
                  </Link>
                </li>
              )}
              <li>
                <FaUserCircle size="30" />
              </li>
              <li>
                <FaBell size="30" />
              </li>
              <li>
                <FaRegSun size="30" />
              </li>
              <li>
                <GrLogout size="30" />
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
