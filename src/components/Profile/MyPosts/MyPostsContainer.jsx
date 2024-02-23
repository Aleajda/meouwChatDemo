import React from "react";
import {addPostActionCreator} from "../../../redux/profileReducer";
import Posts from "./MyPosts";
import { connect } from "react-redux";


let mapStateToProps = (state) =>({
    NewPostText: state.ProfilePage.NewPostText,
    MyPostsData: state.ProfilePage.MyPostsData
})

let mapDispatchToProps = (dispatch) =>{
    return {
        addPost: (text) => {
            dispatch(addPostActionCreator(text));
        }
    }
}

const PostsContainer = connect(mapStateToProps, mapDispatchToProps )(Posts);

export default PostsContainer;
