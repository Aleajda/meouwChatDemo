import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import Friends from "./Friends/Friends";
import React from "react";
import { connect } from "react-redux";


const Navigation = (props) => {
    return (
        <div onClick={props.toggleNav} className={s.navWithoutFriends}>
        <nav>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/profile" className={({isActive}) => isActive ? s.activeLink : ""}>Профиль</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/news" className={({isActive}) => isActive ? s.activeLink : ""}>Новости</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/music" className={({isActive}) => isActive ? s.activeLink : ""}>Музыка</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/settings" className={({isActive}) => isActive ? s.activeLink : ""}>Настройки</NavLink></div>
        <div className={s.item}><NavLink onClick={props.toggleNav} to="/users" className={({isActive}) => isActive ? s.activeLink : ""}>Друзья</NavLink></div>
        </nav>
        </div>
        
    );
}
const mapStateToProps = (state) =>({
    state: state.Navigation
})
export default connect(mapStateToProps,{})(Navigation);