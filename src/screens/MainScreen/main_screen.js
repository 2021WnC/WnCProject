import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BoardList from "../../Components/BoardList";
import WritePost from "../../Components/WritePost";
import { authService } from "../../Firebase";
import { getUserInfo } from "../../Func";

function MainScreen() {
  const [isBoard, setIsBoard] = useState(true);
  const [userInfo, setUserInfo] = useState();
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
  useEffect(()=> {
    if(userInfo) {
      if(userInfo.black) {
        alert("당신은 블랙리스트에 등록되었습니다. 글쓰기 기능이 제한됩니다");
      }
    }
  },[userInfo]);
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
