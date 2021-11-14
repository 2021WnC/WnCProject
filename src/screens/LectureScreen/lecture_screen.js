import { getDoc, doc } from "@firebase/firestore/lite";
import React, { useEffect, useState } from "react";
import { authService, firestoreService } from "../../Firebase";
import { getUserInfo } from "../../Func";
import { Link,useHistory } from "react-router-dom";
const LectureScreen = () => {
    const [userInfo, setUserInfo] = useState({});
    const [lectures, setLectures] = useState([]);
    const history = useHistory();
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            if (user) {
                const loadUserInfo = async () => {
                    setUserInfo(await getUserInfo(authService.currentUser.uid));
                };
                loadUserInfo();
            }
        });
    }, []);
    useEffect(() => {
        if (Object.keys(userInfo).length>0) {
            if(userInfo.role==="학생"){
            const loadLectures = async () => {
                const list = [];
                for (const e of userInfo.lectures) {
                    const lecture = await getDoc(doc(firestoreService, "board", e));
                    list.push({...lecture.data(),id:lecture.id});
                }
                setLectures(list);
            }
            loadLectures();
        }
        else {
            alert("학생만 접근 가능합니다.");
            history.goBack();
        }
    }
    }, [userInfo,history]);
    console.log(lectures,userInfo);
    return (
        <>
            <div className="lecture-wrapper">
                {!userInfo ? <span>Loading...</span> : 
                    (!lectures ? <span>Load Lectures...</span> :
                        <ul>
                       { lectures.map((e,idx) =>(
                           <li key={idx}>
                            <Link to={`/board/${e.id}`}>
                                <span>{`강의명 : ${e.title}`}</span>
                            </Link>
                            </li>
                        ))}
                        </ul>
                        )
                }
            </div>
        </>
    );
}
export default LectureScreen;