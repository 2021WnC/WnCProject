import React, { useState, useEffect } from "react";
import {
  getDocs,
  collection,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore/lite";
import { firestoreService } from "../../Firebase";

function AdminScreen() {
  const [ReportList, setReportList] = useState([]);
  const db = firestoreService;
  useEffect(() => {
    let reportList = [];
    const getReportList = async () => {
      const q = query(collection(db, "report"), where("checked", "==", false));
      const querySnapshot = (await getDocs(q)).docs;
      for (let report of querySnapshot) {
        const body = {
          ...report.data(),
          id: report.id,
        };
        reportList.push(body);
      }
    };

    getReportList().then(() => setReportList(reportList));
  }, [db]);
  const reportCheck = (id) => {
    updateDoc(doc(db, "report", id), {
      checked: true,
    });
  };
  const reportedBlacklist = (id) => {
    updateDoc(doc(db, "User", id), {
      black: true,
    });
    console.log("blacklist");
  };
  return (
    <div className="wrapper-admin" >
      <table className="admin-table">
        <thead>
          <tr>
            <td>순서</td>
            <td>신고한학생id</td>
            <td>신고당한선생님id</td>
            <td>신고한이유</td>
            <td>처리완료버튼</td>
            <td>블랙리스트추가</td>
          </tr>
        </thead>
        <tbody>
          {ReportList.map((e, index) => {
            return (
              <tr key={index}>
                <td>{index}</td>
                <td>{e.reporter}</td>
                <td>{e.reported}</td>
                <td>{e.reason}</td>
                <td>
                  <button onClick={() => reportCheck(e.id)}>처리</button>
                </td>
                <td>
                  <button onClick={() => reportedBlacklist(e.reported)}>
                    블랙리스트
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AdminScreen;
