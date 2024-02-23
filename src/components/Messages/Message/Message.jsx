import s from "../Massages.module.css";
import React from "react";


const Message = (props) =>{
    return (
        <div className={s.message}>{props.messageText}</div>
    );
}


export default Message;
