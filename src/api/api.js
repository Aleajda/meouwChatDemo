import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY": "bc50d231-f5f9-49ac-929f-9ae036455709"
    }
})


export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return(
            instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response =>{
                return response.data;
            })
        );
    },
    deleteFollow(userId){
        return(
            instance.delete(`follow/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    createFollow(userId){
        return(
            instance.post(`follow/${userId}`).then(response => {
                return response.data;
            })
        );
    }
}

export const profileAPI = {
    getProfile(userId){
        return(
            instance.get(`profile/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    getStatus(userId){
        return(
            instance.get(`profile/status/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    updateStatus(status){
        return(
            instance.put(`profile/status`, {status: status})
        )
    }
}

export const AuthAPI = {
    authMe(){
        return(
            instance.get(`auth/me`).then(response =>{
                return response.data;
            })  
        );
    },
    logMe(login, password, rememberMe = false){
        return(
            instance.post("auth/login", {email: login, password: password, rememberMe: rememberMe})
        );
    },
    logoutMe(){
        return(
            instance.delete("auth/login")
        );
    }
}