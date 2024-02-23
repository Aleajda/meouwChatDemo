import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../images/img.jpg"
import { NavLink } from "react-router-dom";
import axios from "axios";
import { usersAPI } from "../../api/api";
      
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


    return (
        <div> 
            <div className={s.paginator}>
                <div className={s.paginatorContent}>
                    <span>
                        <button className={s.navBtn} disabled={props.currentPage === 1} onClick={() => props.onPageChanged(1)}>{"<< первая"}</button>
                        <button className={s.navBtn} disabled={props.currentPage === 1} onClick={() => props.onPageChanged(props.currentPage - 1)}>{"<< назад"}</button>
                    </span>
                    
                    <span>
                        {pages.slice(startPage - 1, endPage).map(p => {
                            return <span onClick={() => props.onPageChanged(p)} className={props.currentPage === p ? s.selectedPage : s.unselectedPage}>{p}</span>
                        })}
                    </span>
                    
                    <span>
                        <button className={s.navBtn} disabled={props.currentPage === pagesCount} onClick={() => props.onPageChanged(props.currentPage + 1)}>{"вперед >>"}</button>
                        <button className={s.navBtn} disabled={props.currentPage === pagesCount} onClick={() => props.onPageChanged(pagesCount)}>{"последняя >>"}</button>
                    </span>
                </div>
            </div>

                {   
                    props.users.map(u => <div key={u.id}>
                        <NavLink to={`/profile/${u.id}`}>
                            <div className={s.avaImg}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} alt="" />
                            </div>
                        </NavLink>
                        <div>
                            {u.name}
                        </div>
                        <div>
                            {u.status}
                        </div>
                        <div>
                            {u.followed 
                                ? <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.unfollow(u.id);}}>Unfollow</button>
                                : <button disabled={props.isFollowing.some(id => id === u.id)} onClick={() => {props.follow(u.id);}}>Follow</button>}
                        </div>
                    </div>)
                }
            </div>
        
    );
}

export default Users;