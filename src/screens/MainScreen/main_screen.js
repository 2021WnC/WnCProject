import React, { useState } from "react";
import BoardList from "../../Components/BoardList";
import WritePost from "../../Components/WritePost";

function MainScreen() {
  const [isBoard, setIsBoard] = useState(true);
  console.log(isBoard);
  return (
    <>
      {isBoard ? (
        <BoardList setIsBoard={setIsBoard} />
      ) : (
        <WritePost setIsBoard={setIsBoard} />
      )}
    </>
  );
}

export default MainScreen;
