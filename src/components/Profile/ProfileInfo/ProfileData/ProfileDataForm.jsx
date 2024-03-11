import React from "react";
import { Field, reduxForm } from "redux-form";
import { Input2 } from "../../../additional/Textarea/Textarea";
import { maxLengthCreator, required } from "../../../../utils/validators";
import s from "./ProfileDataForm.module.css";

const maxLength40 = maxLengthCreator(40);

const ProfileDataForm = (props) =>{
    debugger
    return (
        <form className={s.rofileDataForm} onSubmit={props.handleSubmit}>
            <div>
                <b>В поиске работы: </b><Field placeholder="В поиске работы?" name="lookingForAJob" type="checkbox" component={"input"}/>
            </div>
            <div>
                <b>Навыки: </b><Field placeholder="Описание" name="lookingForAJobDescription" component={Input2} validate={[required, maxLength40]}/>
            </div>
            <div>
                <b>Имя: </b><Field placeholder="Полное имя" name="fullName" component={Input2} validate={[required, maxLength40]}/>
            </div>
            <div>
                <b>Vk link: </b><Field placeolder="Vk" name="contacts.vk" component={Input2} validate={[required, maxLength40]}/>
            </div>
            {props.error && 
            <div>
                {props.error}
            </div>
            }
            <div><button className={s.submitBtn}><span>Сохранить</span></button></div>
        </form>
    )
}

const ProfileDataReduxForm = reduxForm({form: 'profileData'})(ProfileDataForm)
export default ProfileDataReduxForm;