import s from "./Massages.module.css";
import DialogName from "./DialogName/DialogName";
import Message from "./Message/Message";
import React from "react";
import { Navigate } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Textarea } from "../additional/Textarea/Textarea";
import { maxLengthCreator, required } from "../../utils/validators";

const maxLength100 = maxLengthCreator(100);

const Messages = (props) => {
    let dialogsArr = props.state.dialogsData.map((el, index)=>(<DialogName key={index} name={el.name} id={el.name}/>));
    let messagesArr = props.state.messagesData.map((el, index)=>(<Message key={index} messageText={el.message}/>));

    let addNewMessage = (data) =>{
        alert(data.NewMessageText);
        props.addMessage(data.NewMessageText);
        data.NewMessageText = "";
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsNames}>
                {dialogsArr}
            </div>
            <div className={s.messages}>
                {messagesArr}
                <MessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    );
};

export default Messages;


const MessageForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="NewMessageText" placeholder="Enter your message"
                validate={[required, maxLength100]}/>
            </div>
            <div>
                <button>message</button>
            </div>
        </form>
    );
}

const MessageFormRedux = reduxForm({form: 'message'})(MessageForm)