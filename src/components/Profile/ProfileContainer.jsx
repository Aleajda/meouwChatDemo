import Profile from "./Profile";
import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setProfile, getStatus, updateStatus } from "../../redux/profileReducer";
import { withRouter } from "../../withRouter";
import { Navigate } from "react-router-dom";
import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";

const ProfileContainer = (props) =>{
    useEffect(() =>{
        loadProfileData();
    }, [props.params.userId]);

    let loadProfileData = () => {
        let userId = props.params.userId ?? props.myId;
        if (!userId){props.history.push("/login")}
        props.setProfile(userId);
        props.getStatus(userId);
    }
    return (
        <Profile {...props} updateStatus = {props.updateStatus}/>
    );
};


let mapStateToProps = (state) => ({
    profile: state.ProfilePage.profile,
    status: state.ProfilePage.status,
    myId: state.Auth.id,
    isAuth: state.Auth.isAuth
})

export default compose(connect(mapStateToProps, { setProfile, getStatus, updateStatus }), withAuthRedirect, withRouter)(ProfileContainer); 
