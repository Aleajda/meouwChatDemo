import axios from "axios";



const instance2 = axios.create({
    baseURL: "https://dummyjson.com/"
})


export const logMe2 = (data:any) =>{
    return(
        axios.post('https://dummyjson.com/auth/login', {
        username: data.login,
        password: data.password,
        expiresInMins: 30 // optional, defaults to 60
        })
        .then(response => {
            debugger
            return response.data;
        })
    )
    // instance2.post("auth/login", {username: data.login, password: data.password}).then(response => {
    //     return response.data;
    // })
}


