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
            <h1 className={s.formTitle}>Sign Up</h1>

            <div className={s.formDiv}>
                <input type="text" className={s.formInput}
                {...register("username", {required: true})}/>
                <label className={s.formLabel}>Username</label>
            </div>
            
            <div className={s.formDiv + ' ' + s.formDivPas}>
                <input type="password" className={s.formInput} 
                {...register("password", {required: true})}/>
                <label className={s.formLabel}>Password</label>
            </div>
            <div className={s.error}>
                <p style={{color: "red"}}>registration is not available</p>
            </div>
            <button className={s.formButton}>Sign Up</button>
            <div class={s.signUpLink}>
                <NavLink to={"/login"}>Already have an account? Sign In</NavLink>
            </div>
        </form>
    </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.Auth.isAuth
})

export default connect(mapStateToProps, null)(Registration);