import { getDoc, doc } from "@firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import BoardContent from "../../Components/BoardContent";
import WritePost from "../../Components/WritePost";
import { firestoreService } from "../../Firebase";
import { authService } from "../../Firebase";
import { getUserInfo } from "../../Func";
const BoardScreen = () => {
    const boardNumber = useLocation().pathname.split("/")[2]
    const db = firestoreService;
    const [boardInfo, setBoardInfo] = useState();
    const [userInfo,setUserInfo] = useState();
    const [edit,setEdit] = useState(false);
    useEffect(()=> {
        authService.onAuthStateChanged((user)=>{
          if(user) {
        const loadUserInfo = async() => {
        setUserInfo(await getUserInfo(authService.currentUser.uid));
        }
        loadUserInfo();
      } 
      });
      },[]);
    useEffect(() => {
        const getBoardInfo = async () => {
            const info = await getDoc(doc(db, "board", boardNumber));
            const writer = await getDoc(doc(db,"User",info.data().writer));
            setBoardInfo({
                ...info.data(),
                writer:{
                    ...writer.data(),
                    id:info.data().writer
                }
            });
        }
        getBoardInfo();
    }, [db,boardNumber]);
    console.log(boardInfo);
    return (<>{!edit ?
    <BoardContent boardInfo={boardInfo} userInfo={userInfo} setEdit={setEdit} boardID={boardNumber}/>
    :<WritePost isEdit={true} boardInfo={boardInfo} boardID={boardNumber} setBoardInfo={setBoardInfo}/>
    }</>);
}

export default BoardScreen;