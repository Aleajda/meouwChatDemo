import { Field, reduxForm } from "redux-form";
import { Input } from "../additional/Textarea/Textarea";
import { maxLengthCreator, required } from "../../utils/validators";
import { loginUser } from "../../redux/authReducer";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";
import s from "../additional/Textarea/Textarea.module.css"

const maxLength100 = maxLengthCreator(100);

const Login = (props) =>{

    const onSubmit = (FormData) =>{
        console.log(FormData);
        props.loginUser(FormData.login, FormData.password, FormData.rememberMe);
    }
    
    if (props.isAuth){return <Navigate to={"/profile"}/>}
    return(
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    );
}




const LoginForm = (props) =>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder="Login" name="login" component={Input} validate={[required, maxLength100]}/>
            </div>
            <div>
                <Field placeholder="Password" name="password" type="password" component={Input} validate={[required, maxLength100]}/>
            </div>
            <div>
                <Field type="checkbox" name="rememberMe" component={"input"}/>
                remember me
            </div>
            {props.error && 
            <div className={s.errorText}>
                {props.error}
            </div>
            }
            
            <div>
                <button>Login</button>
            </div>
        </form>
    );
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

let mapDispatchToProps = (state) =>({
    isAuth: state.Auth.isAuth
})

export default connect(mapDispatchToProps, {loginUser})(Login);;