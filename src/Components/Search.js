import React, { useState, useRef } from "react";
import { getDoc, query, where, orderBy, getDocs, doc, collection } from "@firebase/firestore/lite";
import { firestoreService } from "../Firebase";
const Search = ({ setBoardList }) => {
    const [text, setText] = useState("");
    const selectRef = useRef(null);
    const sort = [
        "제목",
        "선생님",
        "모집 인원"
    ];
    const textChangeHandler = (e) => {
        setText(e.target.value);
    }
    const searchBoard = () => {
        if (selectRef.current.value === "제목") {
            searchBoardbyTitle();
        } else if (selectRef.current.value === "선생님") {
            searchBoardbyTeacher();
        } else if(selectRef.current.value==="모집 인원") {
            searchBoardbyRecruit();
        }
    }
    const searchBoardbyTitle = async () => {
        const list = [];
        const querySnapshot = await getDocs(collection(firestoreService, "board"));
        for (const e of querySnapshot.docs) {
            const user = await getDoc(doc(firestoreService, "User", e.data().writer));
            if(e.data().title.toLowerCase().includes(text.toLowerCase())) {
                list.push({
                    ...e.data()
                    , writer: user.data()
                    , id: e.id
                });
            }
            
        };
        list.sort((a, b) => {
            var res = 0;
            if (a.date < b.date) res = 1;
            if (a.date > b.date) res = -1;
            if (a === b) res = 0;
            return res;
        });
        setBoardList(list);
    }
    const searchBoardbyTeacher = async () => {
        const list = [];
        const querySnapshot = await getDocs(collection(firestoreService, "board"));
        for (const e of querySnapshot.docs) {
            const user = await getDoc(doc(firestoreService, "User", e.data().writer));
            if (user.data().name.toLowerCase().includes(text.toLowerCase())) {

                list.push({
                    ...e.data()
                    , writer: user.data()
                    , id: e.id
                });
            }
        };
        list.sort((a, b) => {
            var res = 0;
            if (a.date < b.date) res = 1;
            if (a.date > b.date) res = -1;
            if (a === b) res = 0;
            return res;
        });
        setBoardList(list);
    }
    const searchBoardbyRecruit = async () => {
        const list = [];
        const querySnapshot = await getDocs(query(collection(firestoreService, "board"),where("recruitNumber","==",text)));
        for (const e of querySnapshot.docs) {
            const user = await getDoc(doc(firestoreService, "User", e.data().writer));
                list.push({
                    ...e.data()
                    , writer: user.data()
                    , id: e.id
            });
        };
        list.sort((a, b) => {
            var res = 0;
            if (a.date < b.date) res = 1;
            if (a.date > b.date) res = -1;
            if (a === b) res = 0;
            return res;
        });
        setBoardList(list);
    }
    return (<div>
        <select ref={selectRef}>
            {sort.map((e) => (
                <option key={e}>{e}</option>
            ))}
        </select>
        <input type="text" value={text} onChange={textChangeHandler} />
        <button onClick={() => searchBoard()}>검색</button>
    </div>);
}
export default Search;