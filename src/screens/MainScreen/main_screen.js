import React, { useState } from "react";
import { useLocation } from "react-router";
import BoardList from "../../Components/BoardList";
import WritePost from "../../Components/WritePost";
import { authService } from "../../Firebase";


function MainScreen() {
  const [isBoard,setIsBoard] = useState(true);
  const location = useLocation();
  console.log(useLocation().state.userInfo);
  console.log(isBoard)
  return (
    <>
    {isBoard ? <BoardList setIsBoard={setIsBoard}/> : <WritePost setIsBoard={setIsBoard} userid={location.state.userInfo.docId}/>}
   </>
  );
}

export default MainScreen;
