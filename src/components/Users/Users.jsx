import React, { useRef } from "react";
import s from "./Users.module.css";
import userPhoto from "../../images/img.jpg"
import { NavLink } from "react-router-dom";
import { setQuery } from "../../redux/usersReducer";
      
const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++){
        pages.push(i);
    }

    let startPage;
    let endPage;

    if (props.currentPage <= 3) {
        startPage = 1;
        endPage = Math.min(5, pagesCount);
    } else if (props.currentPage >= pagesCount - 2) {
        endPage = pagesCount;
        startPage = Math.max(1, pagesCount - 4);
    } else {
        startPage = props.currentPage - 2;
        endPage = props.currentPage + 2;
    }

    const inputRef = useRef()

    const queryBtn = () => {
        if (inputRef.current.value){
            props.setQuery(inputRef.current.value)
            inputRef.current.value = ""
        }
    }

    const sbrosBtn = () => {
        props.setQuery("")
    }

    return (
        <div> 
            <div className={s.paginator}>
                <div className={s.paginatorContent}>
                    <span>
                        <button className={s.navBtn + " " + s.submitBtn} disabled={props.currentPage === 1} onClick={() => props.onPageChanged(1)}>{"<< первая"}</button>
                        <button className={s.navBtn + " " + s.submitBtn} disabled={props.currentPage === 1} onClick={() => props.onPageChanged(props.currentPage - 1)}>{"<< назад"}</button>
                    </span>
                    
                    <span className={s.forBigScreens}>
                        {pages.slice(startPage - 1, endPage).map((p, index) => {
                            return <span key={index} onClick={() => props.onPageChanged(p)} className={props.currentPage === p ? s.selectedPage : s.unselectedPage}>{p}</span>
                        })}
                    </span>

                    
                    <span className={s.forMobile}>{props.currentPage}</span>
                    
                    
                    <span>
                        <button className={s.navBtn + " " + s.submitBtn} disabled={props.currentPage === pagesCount} onClick={() => props.onPageChanged(props.currentPage + 1)}>{"вперед >>"}</button>
                        <button className={s.navBtn + " " + s.submitBtn} disabled={props.currentPage === pagesCount} onClick={() => props.onPageChanged(pagesCount)}>{"конец >>"}</button>
                    </span>
                </div>
                <div className={s.userSearch}>
                        <span>Найти:</span>
                        <input ref={inputRef} type="text" name="" id="" />
                        <button className={s.searchBtn} onClick={queryBtn}>Поиск</button>
                        <button className={s.searchBtn} onClick={sbrosBtn}>Сброс</button>
                </div>
            </div>
            <div className={s.users}>
                {   
                    props.users.map(u => <div className={s.user} key={u.id}>
                        <NavLink to={`/profile/${u.id}`}>
                            <div className={s.avaImg}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" />
                            </div>
                        </NavLink>
                        <div className={s.userName}>
                            {u.name}
                        </div>
                        <div>
                            {u.followed 
                                ? <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.unfollow(u.id);}}>Unfollow</button>
                                : <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.follow(u.id);}}>Follow</button>}
                        </div>
                    </div>)
                }
            </div>
        </div>
        
    );
}

export default Users;