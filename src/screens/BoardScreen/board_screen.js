import React from "react";
import { useLocation } from "react-router";
const BoardScreen = () => {
    const boardNumber = useLocation().pathname.split("/")[2]
    return <span>Board Screen Number:{boardNumber}</span>
}

export default BoardScreen;