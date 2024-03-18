"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.follow = exports.unfollow = exports.getUsers = exports.setFollowingInProgress = exports.setUsersAreLoading = exports.setTotalUsersCount = exports.setCurrentPage = exports.clearUsers = exports.setUsers = exports.UnfollowAC = exports.FollowAC = void 0;
const api_1 = require("../api/api");
const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const CLEAR_USERS = "CLEAR_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_USERS_ARE_LOADING = "USERS_ARE_LOADING";
const SET_FOLLOWING_IN_PROGRESS = "SET_FOLLOWING_IN_PROGRESS";
let screenWidth = window.innerWidth;
let usersCount = 12;
if (screenWidth > 715) {
    usersCount = 16;
}
else if (screenWidth > 899) {
    usersCount = 20;
}
let defaultState = {
    users: [],
    pageSize: usersCount,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    isFollowing: []
};
const usersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FOLLOW:
            return followUnfollowUser(state, action, true);
        case UNFOLLOW:
            return followUnfollowUser(state, action, false);
        case SET_USERS:
            return Object.assign(Object.assign({}, state), { users: [...state.users, ...action.users] });
        case CLEAR_USERS:
            return Object.assign(Object.assign({}, state), { users: [] });
        case SET_CURRENT_PAGE:
            return Object.assign(Object.assign({}, state), { currentPage: action.PageNumber });
        case SET_TOTAL_USERS_COUNT:
            return Object.assign(Object.assign({}, state), { totalUsersCount: action.totalUsersCount });
        case SET_USERS_ARE_LOADING:
            return Object.assign(Object.assign({}, state), { isLoading: action.isLoading });
        case SET_FOLLOWING_IN_PROGRESS:
            return Object.assign(Object.assign({}, state), { isFollowing: action.isFollowing
                    ? [...state.isFollowing, action.userId]
                    : state.isFollowing.filter(id => id != action.userId) });
        default:
            return state;
    }
};
const followUnfollowUser = (state, action, followed) => {
    return Object.assign(Object.assign({}, state), { users: state.users.map(u => {
            if (u.id === action.userId) {
                return Object.assign(Object.assign({}, u), { followed });
            }
            return u;
        }) });
};
const FollowAC = (userId) => {
    return { type: FOLLOW, userId: userId };
};
exports.FollowAC = FollowAC;
const UnfollowAC = (userId) => {
    return { type: UNFOLLOW, userId: userId };
};
exports.UnfollowAC = UnfollowAC;
const setUsers = (users) => {
    return { type: SET_USERS, users };
};
exports.setUsers = setUsers;
const clearUsers = () => {
    return { type: CLEAR_USERS };
};
exports.clearUsers = clearUsers;
const setCurrentPage = (PageNumber) => {
    return { type: SET_CURRENT_PAGE, PageNumber };
};
exports.setCurrentPage = setCurrentPage;
const setTotalUsersCount = (totalUsersCount) => {
    return { type: SET_TOTAL_USERS_COUNT, totalUsersCount };
};
exports.setTotalUsersCount = setTotalUsersCount;
const setUsersAreLoading = (isLoading) => {
    return { type: SET_USERS_ARE_LOADING, isLoading };
};
exports.setUsersAreLoading = setUsersAreLoading;
const setFollowingInProgress = (isFollowing, userId) => {
    return { type: SET_FOLLOWING_IN_PROGRESS, isFollowing, userId };
};
exports.setFollowingInProgress = setFollowingInProgress;
const getUsers = (page, pageSize) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch((0, exports.setUsersAreLoading)(true));
    let response = yield api_1.usersAPI.getUsers(page, pageSize);
    dispatch((0, exports.setUsers)(response.items));
    dispatch((0, exports.setTotalUsersCount)(response.totalCount));
    dispatch((0, exports.setUsersAreLoading)(false));
});
exports.getUsers = getUsers;
const setFollowUnfollow = (dispatch, userId, apiFunction, actionCreator) => __awaiter(void 0, void 0, void 0, function* () {
    dispatch((0, exports.setFollowingInProgress)(true, userId));
    let response = yield apiFunction(userId);
    dispatch((0, exports.setFollowingInProgress)(false, userId));
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
});
const unfollow = (userId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    setFollowUnfollow(dispatch, userId, api_1.usersAPI.deleteFollow, exports.UnfollowAC);
});
exports.unfollow = unfollow;
const follow = (userId) => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
    setFollowUnfollow(dispatch, userId, api_1.usersAPI.createFollow, exports.FollowAC);
});
exports.follow = follow;
exports.default = usersReducer;
