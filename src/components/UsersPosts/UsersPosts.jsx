import { connect } from "react-redux"
import s from "./UsersPosts.module.css"
import { deletePosts, deletePostsWquery, getPosts, getPostsWithQuery } from "../../redux/usersPostsReduser";
import { useEffect, useState } from "react";
import Preloader from "../additional/Preloader/Preloader";
import { useForm } from "react-hook-form";
import { usersPostsApi } from "../../api/api";
import Like from "../additional/like/Like";
import DisLike from "../additional/dislike/DisLike";
import { EyeOutlined } from "@ant-design/icons";

const UsersPosts = (props) =>{
    let limit = 7;
    const [skip, setSkip] = useState(0);
    const [query, setQuery] = useState("");
    useEffect(() =>{
        if (query == ""){
            props.getPosts(limit, skip);
        }
        else{
            props.getPostsWithQuery(query, limit, skip);
        }
    }, [skip, query]);
    
    const [isBottom, setIsBottom] = useState(false);

    useEffect(() => {
        function handleScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            debugger
            setIsBottom(true);
        } else {
            setIsBottom(false);
        }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
        window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isBottom) {
        myFunction();
        }
    }, [isBottom]);

    function myFunction() {
        if (skip + 10 < props.endSkip){
            setSkip(skip+10)
        }
    }

    const {
        register,
        reset,
        handleSubmit,
    } = useForm()
    
    const onSubmit = (data) =>{
        setSkip(0)
        setQuery(data.query)
        props.deletePostsWquery()
        reset()
    }

    const resetSearch = () =>{
        if (query != ""){
            setQuery("")
            setSkip(0);
            props.deletePosts()
            props.deletePostsWquery()
        }
        else{
            if (skip != 0){
                setSkip(0)
                props.deletePosts()
                props.deletePostsWquery()
            }
            else{
                props.deletePosts()
                props.deletePostsWquery()
                props.getPosts(limit, skip);
            }
        }

    }

    if (!props.posts){
        return <Preloader/>
    }
    return(
        <div className={s.wrapper}>
                <form className={s.queryForm} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.buttons}>
                        <input className={s.inputQuery} type="text" placeholder="Введите поисковой запрос" {...register("query")}/>
                        <button className={s.submitBtn}>Поиск</button>
                        <button type="btn" className={s.submitBtn} onClick={resetSearch}>Сброс</button>
                    </div>
                </form>
            <div className={s.posts}>
                {
                    query
                    ?
                        props.postsWquery
                        ?
                        props.postsWquery.map(p => <UsersPost key={p.id} title={p.title} body={p.body} userId={p.userId} reactions={p.reactions} views={p.views}/>)
                        :
                        null
                    :
                        props.posts
                        ?
                        props.posts.map(p => <UsersPost key={p.id} title={p.title} body={p.body} userId={p.userId} reactions={p.reactions} views={p.views}/>)
                        :
                        null
                }
            </div>
        </div>
    )
}


let mapStateToProps = (state) => ({
    posts: state.Posts.posts,
    postsWquery: state.Posts.postsWquery,
    endSkip: state.Posts.endSkip
})


export default connect(mapStateToProps, {getPosts, getPostsWithQuery, deletePosts, deletePostsWquery})(UsersPosts)


export const UsersPost = (props) => {
    useEffect(() =>{
        usersPostsApi.getUser(props.userId).then(data =>{
            setUser(data.data)
        })
    }, []);
    const [user, setUser] = useState(null)
    const [like, setLike] = useState(false)
    const [disLike, setDisLike] = useState(false)

    const likePost = () =>{
        like
        ? setLike(false)
        : setLike(true)
    }

    const disLikePost = () =>{
        disLike
        ? setDisLike(false)
        : setDisLike(true)
    }

    return(
        <div className={s.post}>
            {user
            ? <p className={s.userName}>
                <div className={s.tooltip}>
                    <div>Полное имя: {user.firstName + " " + user.lastName}</div>
                    <div>Возраст: {user.age}</div>
                    <div>Почта: {user.email}</div>
                    <div>Пол: {user.gender}</div>
                    <div style={{ position: 'relative', marginBottom: '2px' }}>Фото профиля: <img style={{ width: '25px', position: 'absolute', top: -5}} src={user.image} alt="" /></div>
                    <div>Телефон: {user.phone}</div>
                </div>
            <span className={s.author}>Автор:&nbsp;</span>{user.username}</p> 
            : <p><span className={s.author}>Автор:&nbsp;</span><Preloader/></p>
            }
            <p className={s.postTitle}>{props.title}</p>
            <p className={s.postBody}>{props.body}</p>
            <div className={s.reactions}>
                <div className={s.like}>
                    {like
                    ?props.reactions.likes + 1
                    :props.reactions.likes
                    }
                    <span onClick={likePost}><Like/></span>
                </div>
                <div className={s.dislike}>
                    {disLike
                    ?props.reactions.dislikes + 1
                    :props.reactions.dislikes
                    }
                    <span onClick={disLikePost}><DisLike/></span>
                </div>
                <div className={s.views}>
                    {props.views}
                    <span><EyeOutlined  style={{ color: 'blue' }}/></span>
                </div>
            </div>
        </div>
    )
}