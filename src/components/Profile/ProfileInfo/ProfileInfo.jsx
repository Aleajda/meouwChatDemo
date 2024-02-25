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
            <div className={s.wrapper}>
                <div className={s.mainWrapper}>
                    <div className={s.avaWrapper}>
                        <div className={s.ava}>
                            <img
                                className={s.avaImg}
                                src={!props.profile.photos.small ?  userPhoto : props.profile.photos.small}
                                alt=""
                            />
                            {props.isOwner &&
                            <div className={s.input__wrapper}>
                                <label class={s.inputFile}>
                                <input type="file" name="file" onChange={onPhotoSelect}/>		
                                <span>Загрузить</span>
                                </label>
                            </div>}
                        </div>
                        
                    </div>
                    <div className={s.userNameWrapper}>
                        <div className={s.discription}>
                            <div className={s.nickName}>Name: {props.profile.fullName}</div>
                            <div>
                                <ProfileStatusWithHooks status = {props.status} updateStatus = {props.updateStatus}/>
                            </div>
                            {/* <p>{props.profile.aboutMe}</p> */}
                            <div>
                                {props.profile.lookingForAJob ? "Ищет работу" : "Не ищет работу"}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    {props.profile.lookingForAJobDescription}
                </div>
            </div>
        );
    }   
};

export default ProfileInfo;
