
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, { Suspense, useEffect } from "react";
import { initializeApp } from "./redux/appReducer";
import { connect } from "react-redux";
import Preloader from "./components/additional/Preloader/Preloader";
import Login from "./components/Auth/Login";
import { compose } from "redux";
import { withRouter } from "./components/hoc/withRouter";
import Registration from "./components/Auth/Registration";
import UsersPosts from "./components/UsersPosts/UsersPosts";
import { SyncOutlined } from "@ant-design/icons";
import Settings from "./components/Settings/Settings";
import Music from "./components/Music/Music";

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));



const App = (props) =>{

    useEffect(() =>{
        props.initializeApp();
    },[])

    if (!props.initialized){
        return <div style={{display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center'}}><SyncOutlined style={{fontSize: '20vw'}} spin={true}/></div>
    }
    return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div style={props.dark ? {backgroundColor: '#191919', color: 'white'} : {backgroundColor: 'white', color: 'black'}} className="navigate">
                    <Navigation/>
                </div>
                
                <div style={props.dark ? {backgroundColor: '#191919', color: 'white'} : {backgroundColor: 'white', color: 'black'}} className="app-wrapper-content">
                        <Routes>
                            <Route path="*" element={<ProfileContainer/>} />
                            <Route path="/profile/:userId?" element={<ProfileContainer/>} />
                            <Route path="/news" element={<UsersPosts/>} />
                            <Route path="/music" element={<Music/>} />
                            <Route path="/settings" element={<Settings/>} />
                            <Route path="/users/*" element={<Suspense fallback={<Preloader/>}><UsersContainer/></Suspense>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                        </Routes>
                </div>
            </div>
    );
}

let mapStateToProps = (state) => ({
    initialized: state.App.initialized,
    dark: state.Settings.dark
})

export default compose(connect(mapStateToProps,{initializeApp}), withRouter)(App);
;
