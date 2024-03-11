import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React, { useState } from "react";
import NavigationWithoutFriends from "../Navigation/NavigationWithoutFriends";
import koteyka from "../../images/koteyka.gif";
import menuIcon from "../../images/iconmenu2.svg"

const Header = (props) => {

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header className={s.header}>
        <img className={s.icon} src={koteyka}></img>
        <div className={s.name}>MEOUWCHAT</div>
        {props.isAuth 
        ?
        <div className={s.loginWrapper}>
            <div className={s.loginContainer}>
                <div className={s.login}>{props.login}</div>
                <button className={s.submitBtn} onClick={props.logoutUser}><span>logout</span></button>
            </div>
            <img src={menuIcon} onClick={toggleNav} className={s.navImg}></img>
            {showNav && <div className={s.fullScreenNav}><NavigationWithoutFriends toggleNav={toggleNav}/></div>}
        </div>
        :
        <div className={s.loginLink}><NavLink to="/login">login</NavLink></div>}
        </header> 
    );
}
export default Header;