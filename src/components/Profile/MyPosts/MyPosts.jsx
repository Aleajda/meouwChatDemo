import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators";
import { Textarea } from "../../additional/Textarea/Textarea";

const maxLength15 = maxLengthCreator(15);

const Posts = (props) => {
    
    let addPost = (data) =>{
        props.addPost(data.NewPostText);
    }

    let posts = props.MyPostsData.map(p => (<Post likes={p.likes} message= {p.message}/>))

    return (
        <div>
            <div>my posts</div>
            <div>new posts</div>
            <AddPostFormRedux onSubmit={addPost}/>
            <div>
               {posts}
            </div>
        </div>
    );
};
export default Posts;


const AddPostForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="NewPostText" placeholder="Enter your text"
                validate={[required, maxLength15]}/>
            </div>
            <div>
                <button>upload</button>
            </div>
        </form>
    );
}

const AddPostFormRedux = reduxForm({form: 'post'})(AddPostForm)
