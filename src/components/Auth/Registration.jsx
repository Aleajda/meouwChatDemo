import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import s from "./Registration.module.css";
import { NavLink } from "react-router-dom";

const Registration = (props) => {

    const {
        register,
        formState: {
            errors
        },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = (data) =>{
        // alert(JSON.stringify(data))
        reset();
    }

    if (props.isAuth){return <Navigate to={"/profile"}/>}

    return(
        <div className={s.lForm}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <h1 className={s.formTitle}>Регистрация</h1>

            <div className={s.formDiv}>
                <input style={props.dark ? {color: 'white'} : null} type="text" className={s.formInput}
                {...register("username", {required: true})}/>
                <label style={props.dark ? {backgroundColor: '#191919'} : null} className={s.formLabel}>Логин</label>
            </div>
            
            <div className={s.formDiv + ' ' + s.formDivPas}>
                <input style={props.dark ? {color: 'white'} : null} type="password" className={s.formInput} 
                {...register("password", {required: true})}/>
                <label style={props.dark ? {backgroundColor: '#191919'} : null} className={s.formLabel}>Пароль</label>
            </div>
            <div className={s.error}>
                <p style={{color: "red"}}>регистрация недоступна</p>
            </div>
            <button className={s.formButton}>Зарегистрировать</button>
            <div class={s.signUpLink}>
                <NavLink to={"/login"}>Уже есть аккаунт? Войти</NavLink>
            </div>
        </form>
    </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth,
    dark: state.Settings.dark
})

export default connect(mapStateToProps, null)(Registration);