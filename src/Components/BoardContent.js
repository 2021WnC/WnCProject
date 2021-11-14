import React, { useRef } from "react";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "@firebase/firestore/lite";
import { firestoreService } from "../Firebase";
import { useHistory } from "react-router";
const BoardContent = ({ boardInfo, userInfo, setEdit, boardID }) => {
  const history = useHistory();
  const inputRef = useRef(null);
  const delBoard = async () => {
    await deleteDoc(doc(firestoreService, "board", boardID)).then(() =>
      history.push("/main")
    );
  };
  const applyLecture = async () => {
    await updateDoc(doc(firestoreService, "board", boardID), {
      currentNumber: String(Number(boardInfo.currentNumber) + 1),
    }).then(async () => await updateDoc(doc(firestoreService, "User", userInfo.id), {
      lectures: [...userInfo.lectures, boardID],
    })).then(() => history.go(0));
  };
  const deleteLecture = async () => {
    const list = [...userInfo.lectures].filter((e) => e !== boardID);
    await updateDoc(doc(firestoreService, "board", boardID), {
      currentNumber: String(Number(boardInfo.currentNumber) - 1)
    }).then(async () => await updateDoc(doc(firestoreService, "User", userInfo.id), {
      lectures: [...list]
    })
    ).then(() => history.go(0));
  }
  const reportBoard=async()=>{
    alert("신고가 접수되었습니다.");
    await addDoc(collection(firestoreService,"report"),{
      checked:false,
      reason:inputRef.current.value,
      reported:boardInfo.writer.id,
      reporter:userInfo.id,
    });
  }
  return (
    <div className="boardscreen-wrapper">
      {!boardInfo ? (
        <span>loading...</span>
      ) : (
        <>
          <div className="boardscreen-header">
            {Object.keys(boardInfo.image).length < 1 ? (
              <div className="boardscreen-noimage">No Image</div>
            ) : (
              <img src={boardInfo.image.src} alt="boardimg" />
            )}
            <div className="boardscreen-contents">
              <span>{boardInfo.interest}</span>
              <span>{boardInfo.title}</span>
              <div className="boardscreen-contents__detail">
                <span>
                  과외 분류 : {boardInfo.isGroup ? "그룹 과외" : "1대1 과외"}
                </span>
                <span>{`모집 인원 : ${boardInfo.recruitNumber} 명`}</span>
                <span>{`과외 기간 : ${boardInfo.term[0]}~${boardInfo.term[1]}`}</span>
              </div>
              <div className="boardscreen-contents__footer">
                <span>{boardInfo.writer.name}</span>
                <span>
                  {`등록일 ${boardInfo.date} `}
                  {boardInfo.isModified && "(수정됨)"}
                </span>
              </div>
              <span>{`현재 수강생 ${boardInfo.currentNumber}명`}</span>
              {userInfo && userInfo.role === "학생" &&
                (!userInfo.lectures.includes(boardID)? (boardInfo.recruitNumber>boardInfo.currentNumber&& <button onClick={() => applyLecture()}>신청</button>) :
                  <>
                    <h3>신청 완료</h3>
                    <button onClick={() => deleteLecture()}>취소하기</button>
                  </>
                )}
                {boardInfo.recruitNumber===boardInfo.currentNumber&& <span>모집 마감</span>}
            </div>
          </div>
          <div className="boardscreen-main">
            <span>강의 내용</span>
            <div>
              <p>{boardInfo.contents}</p>
            </div>
            {boardInfo && userInfo && boardInfo.writer.id === userInfo.id && (
              <div>
                <button onClick={() => setEdit(true)}>수정</button>
                <button onClick={() => delBoard()}>삭제</button>
                <button onClick={() => history.push("/main")}>돌아가기</button>
              </div>
            )}
            {
              userInfo.lectures.includes(boardID) &&
              <div>
                <input type="text" placeholder="신고사유를 적어주세요." ref={inputRef}/>
                <button onClick={() => reportBoard()}>신고하기</button>
              </div>
            }
          </div>
        </>
      )}
    </div>
  );
};
export default BoardContent;
