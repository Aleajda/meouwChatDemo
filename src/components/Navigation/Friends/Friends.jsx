import Friend from "./Friend/Friend";
import s from "./Friends.module.css";
import React from "react";


const Friends = (props) => {

    let arrFriends = props.friendsData.map(friend => <Friend name={friend.name} imgSrc={friend.imgSrc}/>);

    return (
        <div>
            <div className={s.text}>
                Friends
            </div>
            <div className={s.friends}>
                {arrFriends}
            </div>
            
        </div>
    );
}
export default Friends;