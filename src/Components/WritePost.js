import { addDoc, collection, updateDoc, doc } from "@firebase/firestore/lite";
import React, { useState, useRef } from "react";
import { firestorageService, firestoreService } from "../Firebase";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
const WritePost = ({ setIsBoard, userid }) => {
  const db = firestoreService;
  const inputRefs = useRef([]);
  const [File, setFile] = useState();
  const interest = [
    "수학",
    "영어",
    "국어",
    "과학",
    "물리",
    "화학",
    "생명과학",
    "지구과학",
    "코딩",
  ];

  const postHanlder = async () => {
    const date = new Date();
    const today =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0") +
      " " +
      String(date.getHours()).padStart(2, "0") +
      ":" +
      String(date.getMinutes()).padStart(2, "0");
    console.log(inputRefs.current[4].value);
    const title = inputRefs.current[0].value;
    const contents = inputRefs.current[1].value;
    const isGroup = inputRefs.current[5].checked;
    const interest = inputRefs.current[7].value;
    const recruitNumber = inputRefs.current[2].value;
    const termStart = inputRefs.current[3].value;
    const termEnd = inputRefs.current[4].value;
    if (title === "") {
      alert("제목을 입력해 주세요.");
    } else if (recruitNumber === "") {
      alert("모집 인원을 입력해 주세요.");
    } else if (termStart === "" || termEnd === "") {
      alert("과외 기간을 제대로 선택하여 주십시오.");
    } else {
      const thisContents = {
        title,
        contents,
        isGroup,
        interest,
        recruitNumber,
        term: [termStart, termEnd],
        currentNumber: "0",
        date: today,
        isModified: false,
        writer: userid,
      };
      await addDoc(collection(db, "board"), thisContents).then((e) =>
        getFileURL(e.id)
      );

      setIsBoard(true);
    }
  };
  const onFileChange = (e) => {
    const theFile = e.target.files[0];
    setFile(theFile);
  };
  const getFileURL = async (id) => {
    const storage = firestorageService;
    await uploadBytes(ref(storage, `images/${id}/${File.name}`), File);
    await getDownloadURL(ref(storage, `images/${id}/${File.name}`)).then(
      async (e) => {
        await updateDoc(doc(db, "board", id), {
          image: {
            src: e,
            name: File.name,
          },
        });
      }
    );
  };
  return (
    <>
      <div className="write-wrapper">
        <table cellSpacing="0" className="Write-table">
          <tr>
            <th colSpan="3">과외 등록</th>
          </tr>
          <tr>
            <td>제목</td>
            <td colSpan="2">
              <input
                size="35"
                type="text"
                ref={(el) => (inputRefs.current[0] = el)}
              />
            </td>
          </tr>
          <tr class="even">
            <td>과외 형식</td>
            <td>
              <span>
                그룹 과외
                <input
                  type="radio"
                  name="isGroup"
                  ref={(el) => (inputRefs.current[5] = el)}
                  defaultChecked
                />
              </span>
            </td>
            <td>
              <span>
                1대1 과외
                <input
                  type="radio"
                  name="isGroup"
                  ref={(el) => (inputRefs.current[6] = el)}
                />
              </span>
            </td>
          </tr>
          <tr>
            <td>분야</td>
            <td colSpan="2">
              <select ref={(el) => (inputRefs.current[7] = el)}>
                {interest.map((e) => (
                  <option>{e}</option>
                ))}
              </select>
            </td>
          </tr>
          <tr class="even">
            <td>모집 인원</td>
            <td colSpan="2">
              <input type="number" ref={(el) => (inputRefs.current[2] = el)} />
            </td>
          </tr>
          <tr>
            <td>경력</td>
            <td colSpan="2">
              <textarea
                rows="5"
                cols="35"
                className="textarea"
                placeholder="경력을 입력하세요."
                ref={(el) => (inputRefs.current[1] = el)}
              />
            </td>
          </tr>
          <tr class="even">
            <td>과외 기간</td>
            <td>
              <input
                type="date"
                onChange={(e) => console.log(e.target.value)}
                ref={(el) => (inputRefs.current[3] = el)}
              />
            </td>
            <td>
              <input
                type="date"
                onChange={(e) => console.log(e.target.value)}
                ref={(el) => (inputRefs.current[4] = el)}
              />
            </td>
          </tr>
          <tr>
            <td>모집 이미지</td>
            <td colSpan="2">
              <input type="file" onChange={onFileChange} />
            </td>
          </tr>
        </table>
        <br />
        <button className="btn-write" onClick={() => postHanlder()}>
          등록하기
        </button>
      </div>
    </>
  );
};
export default WritePost;
