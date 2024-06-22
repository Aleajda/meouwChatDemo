import { usersPostsApi } from "../api/api";

const SET_POSTS = "SET_POSTS"
const SET_POSTS_WITH_QUERY = "SET_POSTS_WITH_QUERY"

let defaultState:any = {
    
}

const usersPostReducer = (state = defaultState, action: any):any =>{
    let stateCopy = {...state};
    switch(action.type){
        case SET_POSTS:
            return {...stateCopy, posts: action.posts}
        case SET_POSTS_WITH_QUERY:
            return {...stateCopy, posts: action.posts}
        default:
            return stateCopy;
    }   
}

export const setPosts = (posts:any) => {
    return({type: SET_POSTS, posts})
}

export const getPosts = (limit:any, skip:any) => async (dispatch: any) => {
    let response = await usersPostsApi.getPosts(limit, skip)
    let posts = response.data
    console.log(posts)
    dispatch(setPosts(posts));
}

export const setPostsWithQuery = (posts:any) => {
    return({type: SET_POSTS_WITH_QUERY, posts})
}

export const getPostsWithQuery = (query:any, limit:any, skip:any) => async (dispatch: any) => {
    let response = await usersPostsApi.getPostsWithQuery(query, limit, skip)
    let posts = response.data
    console.log(posts)
    dispatch(setPosts(posts));
}
export default usersPostReducer;