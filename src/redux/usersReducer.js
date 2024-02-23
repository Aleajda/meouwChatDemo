import { usersAPI } from "../api/api";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const CLEAR_USERS = "CLEAR_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_ARE_LOADING = "USERS_ARE_LOADING";
const SET_FOLLOWING_IN_PROGRESS = "SET_FOLLOWING_IN_PROGRESS";

let defaultState = {
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowing: []
}

const usersReducer = (state = defaultState, action) =>{
    switch(action.type){
        case FOLLOW:
            return followUnfollowUser(state, action, true);
        case UNFOLLOW:
            return followUnfollowUser(state, action, false);
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]}
        case CLEAR_USERS:
            return {...state, users: []}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.PageNumber}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}
        case SET_USERS_ARE_LOADING:
            return {...state, isLoading: action.isLoading}
        case SET_FOLLOWING_IN_PROGRESS:
            return {...state,
                isFollowing: action.isFollowing
                ? [...state.isFollowing, action.userId]
                : state.isFollowing.filter(id => id != action.userId)}
        default:
            return state ;
        
    }
}   

const followUnfollowUser = (state, action, followed) => {
    return {
        ...state,
        users: state.users.map(u => {
            if (u.id === action.userId) {
                return  {...u, followed} ;
            }
            return u;
        })
    }
};


export const FollowAC = (userId) =>{
    return { type: FOLLOW, userId: userId};
}

export const UnfollowAC = (userId) =>{
    return {type: UNFOLLOW, userId: userId};
}

export const setUsers = (users) =>{
    return {type: SET_USERS, users};
}

export const clearUsers = () =>{
    return {type: CLEAR_USERS};
}

export const setCurrentPage = (PageNumber) =>{
    return {type: SET_CURRENT_PAGE, PageNumber};
}

export const setTotalUsersCount = (totalUsersCount) =>{
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
}

export const setUsersAreLoading = (isLoading) =>{
    return {type: SET_USERS_ARE_LOADING, isLoading}
}
export const setFollowingInProgress = (isFollowing, userId) =>{
    return {type: SET_FOLLOWING_IN_PROGRESS, isFollowing, userId}
}


export const getUsers = (page, pageSize) => async (dispatch) => {

    dispatch(setUsersAreLoading(true));

    let response = await usersAPI.getUsers(page, pageSize);

    dispatch(setUsers(response.items));
    dispatch(setTotalUsersCount(response.totalCount));
    dispatch(setUsersAreLoading(false)); 
};

// export const unfollow = (userId) => async (dispatch) => {

//     dispatch(setFollowingInProgress(true, userId));

//     let response = await usersAPI.deleteFollow(userId);

//     dispatch(setFollowingInProgress(false, userId));
//     if (response.resultCode === 0){
//         dispatch(UnfollowAC(userId));
//     } 
// };

// export const follow = (userId) => async (dispatch) => {

//     dispatch(setFollowingInProgress(true, userId));

//     let response = await usersAPI.createFollow(userId)

//     dispatch(setFollowingInProgress(false, userId));
//     if (response.resultCode === 0){
//         dispatch(FollowAC(userId));
//     }
// };

const setFollowUnfollow = async (dispatch, userId, apiFunction, actionCreator) => {
    dispatch(setFollowingInProgress(true, userId));

    let response = await apiFunction(userId);

    dispatch(setFollowingInProgress(false, userId));
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
};

export const unfollow = (userId) => async (dispatch) => {
    setFollowUnfollow(dispatch, userId, usersAPI.deleteFollow, UnfollowAC);
};

export const follow = (userId) => async (dispatch) => {
    setFollowUnfollow(dispatch, userId, usersAPI.createFollow, FollowAC);
};


export default usersReducer;