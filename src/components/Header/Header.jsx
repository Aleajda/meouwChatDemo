import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import React, { useState } from "react";
import NavigationWithoutFriends from "../Navigation/NavigationWithoutFriends";

const Header = (props) => {

    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <header className={s.header}>
        <img className={s.icon} src='https://i.pinimg.com/originals/10/35/6c/10356c8e0a85a44788d258286547b132.gif'></img>
        <div className={s.name}>MEOUWCHAT</div>
        <div className={s.login}>{props.isAuth 
        ?<div>{props.login} <button onClick={props.logoutUser}>logout</button>

        <button onClick={toggleNav} className={s.navbtn}>nav</button>
        {showNav && <div className={s.fullScreenNav}><NavigationWithoutFriends/></div>}

        </div> 
        :<div><NavLink to="/login">login</NavLink><button className={s.navbtn}>nav</button></div>}</div>
        </header> 
    );
}
export default Header;