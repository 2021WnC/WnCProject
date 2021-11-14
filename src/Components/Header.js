import React, { useState, useEffect } from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { Link, useHistory } from "react-router-dom";
import { authService } from "../Firebase";
import { isAdminFunction } from "../Func";
const Header = ({ isMain }) => {
  const history = useHistory();

  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    authService.onAuthStateChanged(async (user) => {
      setIsAdmin(await isAdminFunction(authService.currentUser.uid));
    });
  }, []);

  const userLogOut = () => {
    authService.signOut().then(() => history.push("/"));
  };

  return (
    <>
      <header>
        <div className="inner">
          <a href="/main" className="logo">
            <GoOrganization size="30" color="#666" />
          </a>
          <div className="sub-menu">
            <ul className="menu">
              <li>
              <p>
                    <button className="btn-header" onClick={()=>{
                      history.push("/main");
                      if(isMain){
                    history.go(0);
                      }
                    }}>과외 학생 모집</button>
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
                <FaUserCircle size="30" />
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
    </>
  );
};

export default Header;
