import React, { useEffect, useState } from "react";
import { firestoreService } from "../Firebase";
import { getDocs, collection, getDoc, doc, orderBy,query } from "@firebase/firestore/lite";
import { Link } from "react-router-dom";
import Search from "./Search";

const db = firestoreService;
const BoardList = ({ setIsBoard,user}) => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const getBoardData = async () => {
      const list = [];
      const querySnapshot = await getDocs(query(collection(db, "board"),orderBy("date","desc")));
      for (const e of querySnapshot.docs) {
        const user = await getDoc(doc(db, "User", e.data().writer));
        list.push({
          ...e.data()
          , writer: user.data()
          ,id:e.id
        });
      }
      console.log(list);
      setBoardList(list);
    };
    getBoardData();
  }, []);
  return (
    <div className="board-wrapper">
     <Search setBoardList={setBoardList}/>
          <div className="board-list">
          {boardList.map((e, idx) => (
            <Link to={`/board/${e.id}`} style={{color:'inherit',textDecoration:'inherit'}} key={idx}>
            <div className="board-list__board" >
              <div>
                {Object.keys(e.image).length<1 ? <div className="board-noimage">No Image</div> : <img src={e.image.src} alt="boardImage" />}
                <span>{`${idx + 1} ${e.interest}`}</span>
              </div>
              <span>{e.title}</span>
              <span>{`기간 ${e.term[0]}~${e.term[1]}`}</span>
              <span>{e.writer.name}</span>
              <span>{`등록일 ${e.date} `}{e.isModified&&"(수정됨)"}</span>
            </div>
            </Link>
          ))}
      </div>
      {user && user.role==="선생님" && <button onClick={() => setIsBoard(false)} className="btn-append" 
      disabled={user.black}>글쓰기</button>}
    </div>
  );
};

export default BoardList;
