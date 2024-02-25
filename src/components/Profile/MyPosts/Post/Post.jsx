import s from "./Post.module.css";

const Post = (props) => {
    return (
        <div>
            <div className={s.item}>
                <img
                    src="https://memepedia.ru/wp-content/uploads/2022/02/kot-nosok.jpg"
                    alt=""
                />
                <div className={s.text}>say: <br/> {props.message}</div>
            </div>
            <div className={s.text}>likes: {props.likes}</div>
        </div>
    );
};
export default Post;
