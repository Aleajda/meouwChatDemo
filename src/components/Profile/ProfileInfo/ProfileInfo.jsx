import Preloader from "../../additional/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../images/img.jpg"
import ProfileStatusWithHooks from "./ProfileStatus/ProfileStatusWithHooks";
import React, { useState } from "react";
import ProfileDataReduxForm from "./ProfileData/ProfileDataForm";
import vk from "../../../images/vk3.svg"

const ProfileInfo = (props) => {
    
    let [editMode, setEditMode] = useState(false);

    const onPhotoSelect = (e) =>{
        if (e.target.files.length){
            props.updatePhoto(e.target.files[0]);
        }
        
    }

    const onSubmit = (FormData) =>{
        props.saveProfile(FormData).then((success)=>{
            if (success) {
                setEditMode(false);
            }
        });
        
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
                                <button className={s.submitBtn}>
                                    <label className={s.inputFile}>
                                    <input type="file" name="file" onChange={onPhotoSelect}/>		
                                    <span>Загрузить</span>
                                    </label> 
                                </button>
                            </div>}
                        </div>
                        
                    </div>


                    <div className={s.userNameWrapper}>
                        <div className={s.discription}>
                            <div className={s.nickWvk}>
                                <div className={s.nickName}>{props.profile.fullName}</div>
                                <div>
                                    <a href={props.profile.contacts.vk} target="_blank"><img src={vk}/></a>
                                </div>
                            </div>
                            <div>
                                <ProfileStatusWithHooks status = {props.status} updateStatus = {props.updateStatus} isOwner={props.isOwner}/>
                            </div>
                            <div className={s.shortInfo}>
                                Краткая информация: 
                            </div>
                            {editMode
                            ?<ProfileDataReduxForm initialValues={props.profile} onSubmit={onSubmit}/>
                            :<ProfileData goToEditMode={() => {setEditMode(true)}} profile={props.profile} isOwner={props.isOwner}/>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }   
};






const ProfileData = (props) =>{
    return (
        <div className={s.profileData}>
            <div>
                <b>В поиске работы: </b>{props.profile.lookingForAJob ? "да" : "нет"}
            </div>
            <div>
                <b>Скиллы: </b>{props.profile.lookingForAJobDescription ? `${props.profile.lookingForAJobDescription}` : "нет описания"}
            </div>
            {props.isOwner?<div><button onClick={props.goToEditMode} className={s.submitBtn}><span>Редактировать</span></button></div>:null}
        </div>
    )
}

export default ProfileInfo;
