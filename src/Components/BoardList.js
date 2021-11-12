import React, { useEffect, useState } from "react";
import { firestoreService } from "../Firebase";
import { getDocs,collection, getDoc ,doc} from "@firebase/firestore/lite";

const sort = [
  "제목",
  "선생님",
  "모집 인원"
];
const db=firestoreService;
const BoardList = ({ setIsBoard }) => {
  const [boardList,setBoardList] = useState([]);
  useEffect(()=> {
    const getBoardData=async()=>{
    const list=[];
    const query = await getDocs(collection(db,"board"));
    for(const e of query.docs) {
      const user=await getDoc(doc(db,"User",e.data().writer));
      list.push({
        ...e.data()
        ,writer:user.data()
      });
    };
    console.log(list);
    setBoardList(list);
  }
  getBoardData();
  },[]);
useEffect(()=>{
  console.log(boardList);
},[boardList]);
  return (
    <div>
      <div>
        <select>
          {sort.map((e) =>
            <option key={e}>{e}</option>
          )}
        </select>
        <input type="text" />
        <button>검색</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>번호</td>
              <td>제목</td>
              <td>과외 기간</td>
              <td>작성자</td>
              <td>등록일</td>
            </tr>
          </thead>
          <tbody>
            {boardList.map((e,idx)=>(
              <tr key="idx">
              <td>{idx}</td>
              <td>{e.title}</td>
              <td>{`${e.term[0]}~${e.term[1]}`}</td>
              <td>{e.writer.name}</td>
              <td>{e.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={()=>setIsBoard(false)}>글쓰기</button>
      </div>
    </div>
  );
}

export default BoardList;