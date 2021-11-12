import React from "react";
const sort = ["제목", "선생님", "모집 인원"];
const BoardList = ({ setIsBoard }) => {
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
          <tbody></tbody>
        </table>
        <button onClick={() => setIsBoard(false)}>글쓰기</button>
      </div>
    </div>
  );
};

export default BoardList;
