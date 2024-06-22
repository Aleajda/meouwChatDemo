import { connect } from "react-redux"
import s from "./UsersPosts.module.css"
import { getPosts, getPostsWithQuery } from "../../redux/usersPostsReduser";
import { useEffect, useState } from "react";
import Preloader from "../additional/Preloader/Preloader";
import { useForm } from "react-hook-form";

const UsersPosts = (props) =>{
    let limit = 10;
    const [skip, setSkip] = useState(0);
    const [query, setQuery] = useState("");
    useEffect(() =>{
        if (!query){
            props.getPosts(limit, skip);
        }
        else{
            props.getPostsWithQuery(query, limit, skip);
        }
    }, [skip, query]);

    let endSkip = props.posts.total;

    const {
        register,
        reset,
        handleSubmit,
    } = useForm()
    
    const onSubmit = (data) =>{
        setSkip(0)
        setQuery(data.query)
        reset()
    }

    const resetSearch = () =>{
        setSkip(0)
        setQuery("")
    }

    if (!props.posts){
        return <Preloader/>
    }
    return(
        <div>
            <button disabled={skip <= 0 ? true : false} onClick={() => setSkip(skip-10)}>PREV</button>
            <button disabled={skip + 10 >= endSkip ? true : false} onClick={() => setSkip(skip+10)}>NEXT</button>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" placeholder="Введите поисковой запрос" {...register("query")} />
                <button>Поиск</button>
            </form>
            <button onClick={resetSearch}>Сброс</button>
            {
                props.posts.posts.map(p => <div>
                        <h1>{p.title}</h1>
                        <p>{p.body}</p>
                    </div>)
            }
        </div>
    //    <div className={s.users}>
    //             {   
    //                 props.users.map(u => <div className={s.user} key={u.id}>
    //                      <NavLink to={`/profile/${u.id}`}>
    //                         <div className={s.avaImg}>
    //                             <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" />
    //                         </div>
    //                     </NavLink>
    //                     <div className={s.userName}>
    //                         {u.name}
    //                     </div>
    //                     <div>
    //                         {u.followed 
    //                             ? <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.unfollow(u.id);}}>Unfollow</button>
    //                             : <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.follow(u.id);}}>Follow</button>}
    //                     </div>
    //                 </div>)
    //             }
    //     </div>
    )
}


let mapStateToProps = (state) => ({
    posts: state.Posts.posts

})


export default connect(mapStateToProps, {getPosts, getPostsWithQuery})(UsersPosts)