import Preloader from "../additional/Preloader/Preloader";
import PostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";


const Profile = (props) => {
    if (!props.profile){
        return (
            <Preloader/>
        ); 
    }
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus = {props.updateStatus} isOwner = {props.isOwner} updatePhoto={props.updatePhoto} saveProfile={props.saveProfile}/>
            <PostsContainer profile={props.profile}/>
        </div>
    );
};
export default Profile;
