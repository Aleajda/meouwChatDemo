import PostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import React from "react";


const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus = {props.updateStatus} isOwner = {props.isOwner} updatePhoto={props.updatePhoto} saveProfile={props.saveProfile}/>
            <PostsContainer/>
        </div>
    );
};
export default Profile;
