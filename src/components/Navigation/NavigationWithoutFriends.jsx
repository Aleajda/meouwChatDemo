import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import Friends from "./Friends/Friends";
import React from "react";
import { connect } from "react-redux";


const Navigation = (props) => {
    return (
        <div onClick={props.toggleNav} className={s.navWithoutFriends}>
        <nav>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/profile" className={({isActive}) => isActive ? s.activeLink : ""}>Profile</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/messages" className={({isActive}) => isActive ? s.activeLink : ""}>Messages</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/news" className={({isActive}) => isActive ? s.activeLink : ""}>News</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/music" className={({isActive}) => isActive ? s.activeLink : ""}>Music</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/settings" className={({isActive}) => isActive ? s.activeLink : ""}>Settings</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/users" className={({isActive}) => isActive ? s.activeLink : ""}>Users</NavLink></div>
        </nav>
        </div>
        
    );
}
const mapStateToProps = (state) =>({
    state: state.Navigation
})
export default connect(mapStateToProps,{})(Navigation);