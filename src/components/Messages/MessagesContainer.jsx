import Messages from "./Messages";
import { addMessageActionCreator, addMessageTextActionCreator } from "../../redux/messagesReducer";
import { connect } from "react-redux";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import React from "react";

let mapStateToProps = (state) =>({
    state: state.MessagesPage
})

let mapDispatchToProps = (dispatch) =>{
    return {
        addMessage: (text) => {
            dispatch(addMessageActionCreator(text));
        }
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps ), withAuthRedirect)(Messages);
