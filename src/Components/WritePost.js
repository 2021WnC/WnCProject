import { addDoc, collection, updateDoc,doc } from "@firebase/firestore/lite";
import React, { useState, useRef, useEffect } from "react";
import { firestorageService, firestoreService } from "../Firebase";
import { uploadBytes,ref, getDownloadURL } from "@firebase/storage";
import { useHistory } from "react-router";
const WritePost = ({ isEdit,setIsBoard ,userid,boardInfo,boardID,setBoardInfo}) => {
    const db = firestoreService;
    const inputRefs = useRef([]);
    const [File, setFile] = useState();
    const history = useHistory();
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
    useEffect(()=> {
        if(isEdit&&boardInfo) {
            inputRefs.current[0].value = boardInfo.title;
            inputRefs.current[1].value = boardInfo.contents;
            if(!boardInfo.isGroup) {
                inputRefs.current[5].defaultChecked = false;
                inputRefs.current[6].defaultChecked = true;
            } else {
                inputRefs.current[5].defaultChecked = true;
                inputRefs.current[6].defaultChecked = false;
            }
            inputRefs.current[2].value = boardInfo.recruitNumber;
            inputRefs.current[7].value = boardInfo.interest;
            inputRefs.current[3].value = boardInfo.term[0];
            inputRefs.current[4].value = boardInfo.term[1];
        }
    },[boardInfo,isEdit]);
    const postHanlder = async() => {
        const date = new Date();
        const today = date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0") + " " 
        + String(date.getHours()).padStart(2, "0") + ":"+String(date.getMinutes()).padStart(2,"0");
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
                writer:userid,
                image:{}
            }
            if(!isEdit) {
           await addDoc(collection(db,"board"),
                thisContents
            ).then((e)=>{
            if(File){
            getFileURL(e.id)
            }}
            );
            setIsBoard(true);
        } else {
            await updateDoc(doc(db,"board",boardID),{
                title,
                contents,
                isGroup,
                interest,
                recruitNumber,
                term:[termStart,termEnd],
                isModified:true,
            }
            );
            if(Object.keys(boardInfo.image).length<1) {
            getFileURL(boardID).then(()=>history.push("/main"));
            } else {
                history.push("/main");
            }
            
        }
        }
    }
    const onFileChange = (e) => {
        const theFile = e.target.files[0];
        setFile(theFile);
    }
    const getFileURL = async(id) => {
        const storage = firestorageService;
        await uploadBytes(
            ref(storage, `images/${id}/${File.name}`),
            File
          );
          
        await getDownloadURL(ref(storage,`images/${id}/${File.name}`)).then(async(e)=>{
            await updateDoc(doc(db,"board",id),{
                image:{
                    src:e,
                    name:File.name
                }
            })
        })
    }
    const deleteImage = async() => {
        await updateDoc(doc(db,"board",boardID),{
            image:{}
        })
        setBoardInfo({...boardInfo,image:{}});
    }
    const backHandler = () => {
        if(isEdit) {
            history.push(`/main`);
        } else {
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
                <form>
                    <span>그룹 과외</span>
                    <input type="radio" name="isGroup" ref={(el) => inputRefs.current[5] = el } defaultChecked />
                    <span>1대 1 과외</span>
                    <input type="radio" name="isGroup" ref={(el) => inputRefs.current[6] = el} />
                </form>
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
                <div>
                    <span>모집 이미지</span>
                    {(isEdit&&Object.keys(boardInfo.image).length>0) ? <>
                        <span>{` ${boardInfo.image.name} (등록됨)`}</span>
                        <button onClick={()=>deleteImage()}>삭제</button>
                        </>
                    :<input type="file" onChange={onFileChange}/>}
                </div>

                <button onClick={() => postHanlder()}>{isEdit?"수정하기":"작성하기"}</button>
                <button onClick={()=>backHandler()}>돌아가기</button>
            </div>
        </>
    )
}
export default WritePost;
