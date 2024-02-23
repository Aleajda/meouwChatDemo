import { NavLink } from "react-router-dom";
import s from "../Massages.module.css";
import React from "react";

const DialogName = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink
                to={"/messages/"+props.id}
                className={({ isActive }) => (isActive ? s.activeLink : "")}
            >
                {props.name}
            </NavLink>
        </div>
    );
};




export default DialogName;
