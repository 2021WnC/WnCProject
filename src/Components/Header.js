import React from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { GrLogout } from "react-icons/gr";
import { Link,useHistory } from "react-router-dom";
const Header = ({isMain}) => {
  const history = useHistory();
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
