import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../utils/validators";
import { Textarea } from "../../additional/Textarea/Textarea";

const maxLength150 = maxLengthCreator(150);

const Posts = (props) => {
    
    let addPost = (data) =>{
        props.addPost(data.NewPostText);
        data.NewPostText = "";
    }

    let posts = props.MyPostsData.map(p => (<Post likes={p.likes} message= {p.message}/>))

    return (
        <div className={s.postsWrapper}>
            <div className={s.myPosts}>Мои посты</div>
            <div>
               {posts}
            </div>
            <div className={s.addPost}>
                <div className={s.addPostText}>
                    Добавить пост
                </div>
                <AddPostFormRedux onSubmit={addPost}/>
            </div>
        </div>
    );
};
export default Posts;


const AddPostForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name="NewPostText" placeholder="Введите текст.."
                validate={[required, maxLength150]}/>
            </div>
            <div>
                <button class={s.submitBtn}><span>Опубликовать</span></button>
            </div>
        </form>
    );
}

const AddPostFormRedux = reduxForm({form: 'post'})(AddPostForm)
