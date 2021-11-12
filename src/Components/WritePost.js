import { addDoc, collection } from "@firebase/firestore/lite";
import React, { useState, useRef } from "react";
import { firestoreService } from "../Firebase";
const WritePost = ({ setIsBoard ,userid}) => {
    const db = firestoreService;
    const inputRefs = useRef([]);
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

    const postHanlder = async() => {
        const date = new Date();
        const today = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0")
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
                writer:userid
            }
            await addDoc(collection(db,"board"),
                thisContents
            );
            setIsBoard(true);
        }
    }
    return (
        <>
            <div>
                <div>
                    <span>제목</span>
                    <input type="text" ref={(el) => inputRefs.current[0] = el} />
                </div>
                <div>
                    <span>그룹 과외</span>
                    <input type="radio" name="isGroup" ref={(el) => inputRefs.current[5] = el } checked />
                    <span>1대 1 과외</span>
                    <input type="radio" name="isGroup" ref={(el) => inputRefs.current[6] = el} />
                </div>
                <div>
                    <span>분야</span>
                    <select ref={(el) => inputRefs.current[7] = el}>
                        {interest.map((e) =>
                            <option>{e}</option>
                        )}
                    </select>
                </div>
                <div>
                    <span>모집 인원</span>
                    <input type="number" ref={(el) => inputRefs.current[2] = el} />
                </div>
                <div>
                    <span>내용</span>
                    <textarea ref={(el) => inputRefs.current[1] = el} />
                </div>
                <div>
                    <span>과외 기간</span>
                    <input type="date" onChange={(e) => console.log(e.target.value)} ref={(el) => inputRefs.current[3] = el} />
                    <input type="date" onChange={(e) => console.log(e.target.value)} ref={(el) => inputRefs.current[4] = el} />
                </div>
                <button onClick={() => postHanlder()}>등록하기</button>
            </div>
        </>
    )
}
export default WritePost;