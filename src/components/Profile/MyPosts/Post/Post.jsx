import s from "./Post.module.css";
import userPhoto from "../../../../images/img.jpg"
import { connect } from "react-redux";
import { deletePost } from "../../../../redux/profileReducer";

const Post = (props) => {
    const deletePost = () => {
        let newArr = props.MyPostsData.slice(); // Копируем исходный массив
        newArr.splice(props.index, 1); // Удаляем элемент из копии массива
        props.deletePost(newArr)

    }
    return (
        <div>
            <div className={s.item}>
                <img
                    src={!props.profile.photos.small ?  userPhoto : props.profile.photos.small}
                    alt=""
                />
                <div className={s.text}><span className={s.say}>say:</span><br/><span className={s.message}>{props.message}</span></div>
            </div>
            <div className={s.text}>likes: {props.likes}</div>
            <button onClick={deletePost}>delete</button>
        </div>
    );
};
export default connect(null, {deletePost})(Post);
