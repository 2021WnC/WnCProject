import React from "react";
import { FaUserCircle, FaBell, FaRegSun } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <Link to="/main">과외 학생 모집</Link>
      <Link to="/board/3">선생님 목록</Link>
      <FaUserCircle size="24" />
      <FaBell size="24" />
      <FaRegSun size="24" />
      <button>Logout</button>
    </>
  );
};

export default Header;
