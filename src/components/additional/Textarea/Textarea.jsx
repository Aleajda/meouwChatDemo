import s from "./Textarea.module.css";
import React from "react";

export const Textarea = ({input, meta, ...props}) =>{
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <textarea className={s.textarea + " " + (hasError ? s.textareaError : "") } {...input} {...props}/>
            <div>
                {hasError && <span className={s.errorText}>{meta.error}</span>}
            </div>
        </div>
    )
}

export const Input = ({input, meta, ...props}) =>{
    const hasError = meta.touched && meta.error;
    return (
        <div>
            <input className={s.textarea + " " + (hasError ? s.textareaError : "") } {...input} {...props}/>
            <div>
                {hasError && <span className={s.errorText}>{meta.error}</span>}
            </div>
        </div>
    )
}