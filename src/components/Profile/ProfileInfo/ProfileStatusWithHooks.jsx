import Preloader from "../../additional/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import userPhoto from "../../../images/img.jpg"
import React, { useEffect, useState } from "react";

const ProfileStatusWithHooks = (props) =>{

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect (() =>{
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () =>{
        setEditMode(true)
    }

    const deactivateEditMode = () =>{
        setEditMode(false)
        props.updateStatus(status);  
    }

    const onStatusChange = (e) =>{
        setStatus(e.target.value)
    }
    return (
        <div>
            {editMode
            ?
            <div>
                Стаус: <input onChange={ onStatusChange } onBlur = { deactivateEditMode } autoFocus={true} value={status}/>
            </div>
            :
            <div>
                Стаус: <span onDoubleClick={ activateEditMode }>{props.status || "нет статуса"}</span>
            </div>
            }
        </div>
    );   
}

export default ProfileStatusWithHooks;
