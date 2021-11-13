import React, { useEffect, useState } from "react";
import { firestoreService } from "../Firebase";
import { getDocs, collection, getDoc, doc } from "@firebase/firestore/lite";

const sort = [
  "제목",
  "선생님",
  "모집 인원"
];
const db = firestoreService;
const BoardList = ({ setIsBoard }) => {
  const [boardList, setBoardList] = useState([]);
  useEffect(() => {
    const getBoardData = async () => {
      const list = [];
      const query = await getDocs(collection(db, "board"));
      for (const e of query.docs) {
        const user = await getDoc(doc(db, "User", e.data().writer));
        list.push({
          ...e.data()
          , writer: user.data()
        });
      };
      console.log(list);
      setBoardList(list);
    }
    getBoardData();
  }, []);
  useEffect(() => {
    console.log(boardList);
  }, [boardList]);
  return (
    <div>
      <div>
        <select>
          {sort.map((e) => (
            <option key={e}>{e}</option>
          ))}
        </select>
        <input type="text" />
        <button>검색</button>
      </div>
        <div className="board-list">
          {boardList.map((e, idx) => (
            <div className="board-list__board">
              <div>
                <img src={e.image.src} alt="boardImage" />
                <span>{idx + 1}</span>
              </div>
              <span>{e.title}</span>
              <span>{`기간 ${e.term[0]}~${e.term[1]}`}</span>
              <span>{e.writer.name}</span>
              <span>{`등록일 ${e.date}`}</span>
            </div>
          ))}
        </div>
        <button onClick={() => setIsBoard(false)}>글쓰기</button>
      </div>
  );
};

export default BoardList;
