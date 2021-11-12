import React from "react";
const WritePost = ({setIsBoard}) => {
    return (
        <>
        <div>
        <span>제목</span>
        <input type="text"/>
        
        <button onClick={()=>setIsBoard(true)}>돌아가기</button>
        </div>
        </>
    )
}
export default WritePost;