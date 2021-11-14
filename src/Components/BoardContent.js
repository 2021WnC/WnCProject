import React from "react";
import { deleteDoc ,doc, updateDoc} from "@firebase/firestore/lite";
import { firestoreService } from "../Firebase";
import { useHistory } from "react-router";
const BoardContent = ({boardInfo,userInfo,setEdit,boardID}) => {
    const history=useHistory();
    const delBoard = async() => {
        await deleteDoc(doc(firestoreService,"board",boardID)).then(()=>history.push("/main"));
    }
    const applyLecture = async() => {
        await updateDoc(doc(firestoreService,"board",boardID), {
            currentNumber : String(Number(boardInfo.currentNumber) + 1)
        })
        await updateDoc(doc(firestoreService,"User",userInfo.id), {
            lectures : [...userInfo.lectures,boardID]
        })
        history.go(0);
    }
    const deleteLecture = async() => {
        const list = [...userInfo.lectures].filter((e)=>e!==boardID);
        await updateDoc(doc(firestoreService,"board",boardID), {
            currentNumber : String(Number(boardInfo.currentNumber) - 1)
        })
        await updateDoc(doc(firestoreService,"User",userInfo.id), {
            lectures : [...list]
        })
        history.go(0);
    }
    return (<div className="boardscreen-wrapper">
    {!boardInfo ? <span>loading...</span> :
    <>
        <div className="boardscreen-header">
            {Object.keys(boardInfo.image).length<1?<div className="boardscreen-noimage">No Image</div>:<img src={boardInfo.image.src} alt="boardimg" />}
            <div className="boardscreen-contents">
                <span>{boardInfo.interest}</span>
                <span>{boardInfo.title}</span>
                <div className="boardscreen-contents__detail">
                     <span>과외 분류 : {boardInfo.isGroup ? "그룹 과외" : "1대1 과외"}</span>
                    <span>{`모집 인원 : ${boardInfo.recruitNumber} 명`}</span>
                    <span>{`과외 기간 : ${boardInfo.term[0]}~${boardInfo.term[1]}`}</span>
                </div>
                <div className="boardscreen-contents__footer">
                <span>{boardInfo.writer.name}</span>
                <span>{`등록일 ${boardInfo.date} `}{boardInfo.isModified&&"(수정됨)"}</span>
                </div>
                <span>{`현재 수강생 ${boardInfo.currentNumber}명`}</span>
                {userInfo && userInfo.role==="학생" &&
                (!userInfo.lectures.includes(boardID) ?<button onClick={()=>applyLecture()}>신청</button> :
                <>
                <h3>신청 완료</h3>
                <button onClick={()=>deleteLecture()}>취소하기</button>
                </>
                )}
            </div>
        </div>
        <div className="boardscreen-main">
            <span>강의 내용</span>
            <div>
                <p>{boardInfo.contents}</p>
            </div>
            {boardInfo&&userInfo&&boardInfo.writer.id===userInfo.id && <>
            <button onClick={()=>setEdit(true)}>수정</button>
            <button onClick={()=>delBoard()}>삭제</button>
            <button onClick={()=>history.push("/main")}>돌아가기</button>
            </>
            }
        </div>
    </>
    }
</div>);
}
export default BoardContent;