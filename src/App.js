
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import MessagesContainer from "./components/Messages/MessagesContainer";
import { Routes, Route} from "react-router-dom";
// import UsersContainer from "./components/Users/UsersContainer";

import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, { Suspense, useEffect } from "react";
import { initializeApp } from "./redux/appReduser";
import { connect } from "react-redux";
import Preloader from "./components/additional/Preloader/Preloader";

const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));



const App = (props) =>{

    useEffect(() =>{
        props.initializeApp();
    },[])

    if (!props.initialized){
        return <Preloader/>
    }
    return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <div className="navigate">
                    <Navigation/>
                </div>
                
                <div className="app-wrapper-content">
                        <Routes>
                            <Route path="/profile/:userId?" element={<ProfileContainer/>} />
                            <Route path="/messages/*" element={<MessagesContainer/>} />
                            <Route path="/news" element={<div>MEAW NOT WORKING</div>} />
                            <Route path="/music" element={<div>MEAW NOT WORKING</div>} />
                            <Route path="/settings" element={<div>MEAW NOT WORKING</div>} />
                            <Route path="/users/*" element={<Suspense fallback={<Preloader/>}><UsersContainer/></Suspense>}/>
                            <Route path="/login" element={<Login/>}/>
                        </Routes>
                </div>
            </div>
    );
}

let mapStateToProps = (state) => ({
    initialized: state.App.initialized
})

export default connect(mapStateToProps,{initializeApp})(App);
