import Preloader from "../../additional/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../images/img.jpg"
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";

const ProfileInfo = (props) => {
    if (!props.profile){
        return (
            <Preloader/>
        ); 
    }
    else{
        return (
            <div>
                <div className={s.ava}>
                    <img
                        className={s.avaImg}
                        src={!props.profile.photos.small ?  userPhoto : props.profile.photos.small}
                        alt=""
                    />
                    <div className={s.discription}>
                        <h1>{props.profile.fullName}</h1>
                        {/* <p>{props.profile.aboutMe}</p> */}
                    </div>
                </div>
                <ProfileStatusWithHooks status = {props.status} updateStatus = {props.updateStatus}/>
                <div>
                    {props.profile.lookingForAJob ? "Ищет работу" : "Не ищет работу"}
                </div>
                <div>
                    {props.profile.lookingForAJobDescription}
                </div>
            </div>
        );
    }   
};

export default ProfileInfo;
