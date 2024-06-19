
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import { Routes, Route} from "react-router-dom";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import React, { Suspense, useEffect } from "react";
import { initializeApp } from "./redux/appReduser";
import { connect } from "react-redux";
import Preloader from "./components/additional/Preloader/Preloader";
import Login from "./components/Auth/Login";
import { compose } from "redux";
import { withRouter } from "./components/hoc/withRouter";
import Registration from "./components/Auth/Registration";

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
                            <Route path="" element={<ProfileContainer/>} />
                            <Route path="/profile/:userId?" element={<ProfileContainer/>} />
                            <Route path="/messages/*" element={<div>PAJE NOT WORKING</div>} />
                            <Route path="/news" element={<div>PAJE NOT WORKING</div>} />
                            <Route path="/music" element={<div>PAJE NOT WORKING</div>} />
                            <Route path="/settings" element={<div>PAJE NOT WORKING</div>} />
                            <Route path="/users/*" element={<Suspense fallback={<Preloader/>}><UsersContainer/></Suspense>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/registration" element={<Registration/>}/>
                        </Routes>
                </div>
            </div>
    );
}

let mapStateToProps = (state) => ({
    initialized: state.App.initialized
})

export default compose(connect(mapStateToProps,{initializeApp}), withRouter)(App);
;
