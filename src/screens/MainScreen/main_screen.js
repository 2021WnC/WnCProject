import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BoardList from "../../Components/BoardList";
import WritePost from "../../Components/WritePost";
import { authService } from "../../Firebase";
import { getUserInfo } from "../../Func";

function MainScreen() {
  const [isBoard, setIsBoard] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const location = useLocation();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        const loadUserInfo = async () => {
          setUserInfo(await getUserInfo(authService.currentUser.uid));
        };
        loadUserInfo();
      }
    });
  }, []);
  console.log(isBoard);
  console.log(userInfo);
  console.log(authService.currentUser);

  return (
    <>
    {isBoard ? <BoardList setIsBoard={setIsBoard} user={userInfo}/> : <WritePost isEdit={false} setIsBoard={setIsBoard} userid={userInfo.id}/>}
   </>
  );
}

export default MainScreen;
