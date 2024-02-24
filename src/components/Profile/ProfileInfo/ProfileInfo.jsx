import Preloader from "../../additional/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../images/img.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import React from "react";

const ProfileInfo = (props) => {
    

    let onPhotoSelect = (e) =>{
        if (e.target.files.length){
            props.updatePhoto(e.target.files[0]);
        }
        
    }



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
                        <ProfileStatusWithHooks status = {props.status} updateStatus = {props.updateStatus}/>
                    </div>
                </div>

                <div>{props.isOwner && <input type="file" onChange={onPhotoSelect}/>}</div>

                <p>{props.profile.aboutMe}</p>
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
