import s from "./Post.module.css";
import userPhoto from "../../../../images/img.jpg"

const Post = (props) => {
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
        </div>
    );
};
export default Post;
