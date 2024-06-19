import axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers:{
        "API-KEY": "9ca2952f-915f-4c87-afd0-8a5fff218e08"
    }
})


export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return(
            instance.get(`users?page=${currentPage}&count=${pageSize}`).then(response =>{
                return response.data;
            })
        );
    },
    deleteFollow(userId: number){
        return(
            instance.delete(`follow/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    createFollow(userId: number){
        return(
            instance.post(`follow/${userId}`).then(response => {
                return response.data;
            })
        );
    }
}

export const profileAPI = {
    getProfile(userId: number){
        return(
            instance.get(`profile/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    getStatus(userId: number){
        return(
            instance.get(`profile/status/${userId}`).then(response => {
                return response.data;
            })
        );
    },
    updateStatus(status: string){
        return(
            instance.put(`profile/status`, {status: status})
        )
    },
    updatePhoto(file:any){
        const formData = new FormData();
        formData.append("image", file)
        return(
            instance.put(`profile/photo`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
        )
    },
    saveProfile(profileData:any){
        debugger
        return(
            instance.put(`profile`, profileData)
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
    logMe(login:string, password:string, rememberMe:boolean = false, captcha: string|null){
        return(
            instance.post("auth/login", {email: login, password: password, rememberMe: rememberMe, captcha: captcha})
        );
    },
    logoutMe(){
        return(
            instance.delete("auth/login")
        );
    },
    getCaptchaUrl(){
        return(
            instance.get("security/get-captcha-url")
        );
    }
}