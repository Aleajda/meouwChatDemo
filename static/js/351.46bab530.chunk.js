"use strict";(self.webpackChunkreactapp1=self.webpackChunkreactapp1||[]).push([[351],{4351:(e,s,r)=>{r.r(s),r.d(s,{default:()=>b});var a=r(2791);const n="Users_avaImg__p+56H",l="Users_selectedPage__t+DRe",i="Users_unselectedPage__Cv1PI",t="Users_paginator__D30Mh",c="Users_paginatorContent__pEHyr",o="Users_navBtn__-c5RM",d="Users_forMobile__YggB+",g="Users_forBigScreens__+yyZ2",u="Users_users__f4zWh",h="Users_user__1lDT9",_="Users_userName__k6XzR";var U=r(2056),p=r(1087),P=r(184);const m=e=>{let s,r,a=Math.ceil(e.totalUsersCount/e.pageSize),m=[];for(let n=1;n<=a;n++)m.push(n);return e.currentPage<=3?(s=1,r=Math.min(5,a)):e.currentPage>=a-2?(r=a,s=Math.max(1,a-4)):(s=e.currentPage-2,r=e.currentPage+2),(0,P.jsxs)("div",{children:[(0,P.jsx)("div",{className:t,children:(0,P.jsxs)("div",{className:c,children:[(0,P.jsxs)("span",{children:[(0,P.jsx)("button",{className:o,disabled:1===e.currentPage,onClick:()=>e.onPageChanged(1),children:"<< \u043f\u0435\u0440\u0432\u0430\u044f"}),(0,P.jsx)("button",{className:o,disabled:1===e.currentPage,onClick:()=>e.onPageChanged(e.currentPage-1),children:"<< \u043d\u0430\u0437\u0430\u0434"})]}),(0,P.jsx)("span",{className:g,children:m.slice(s-1,r).map((s=>(0,P.jsx)("span",{onClick:()=>e.onPageChanged(s),className:e.currentPage===s?l:i,children:s})))}),(0,P.jsx)("span",{className:d,children:e.currentPage}),(0,P.jsxs)("span",{children:[(0,P.jsx)("button",{className:o,disabled:e.currentPage===a,onClick:()=>e.onPageChanged(e.currentPage+1),children:"\u0432\u043f\u0435\u0440\u0435\u0434 >>"}),(0,P.jsx)("button",{className:o,disabled:e.currentPage===a,onClick:()=>e.onPageChanged(a),children:"\u043f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f >>"})]})]})}),(0,P.jsx)("div",{className:u,children:e.users.map((s=>(0,P.jsxs)("div",{className:h,children:[(0,P.jsx)(p.OL,{to:"/profile/".concat(s.id),children:(0,P.jsx)("div",{className:n,children:(0,P.jsx)("img",{src:null!=s.photos.small?s.photos.small:U,alt:""})})}),(0,P.jsx)("div",{className:_,children:s.name}),(0,P.jsx)("div",{children:s.followed?(0,P.jsx)("button",{disabled:e.isFollowing.some((e=>e===s.id)),onClick:()=>{e.unfollow(s.id)},children:"Unfollow"}):(0,P.jsx)("button",{disabled:e.isFollowing.some((e=>e===s.id)),onClick:()=>{e.follow(s.id)},children:"Follow"})})]},s.id)))})]})};var j=r(6315),x=r(4420),C=r(145),f=r(1103);const b=(0,r(1154).qC)((0,x.$j)((e=>({users:e.Users.users,pageSize:e.Users.pageSize,totalUsersCount:e.Users.totalUsersCount,currentPage:e.Users.currentPage,isLoading:e.Users.isLoading,isFollowing:e.Users.isFollowing})),{unfollow:j.fv,follow:j.ZN,setUsers:j.HM,clearUsers:j.B4,setCurrentPage:j.D4,setTotalUsersCount:j.K1,setUsersAreLoading:j.XO,setFollowingInProgress:j.Vb,getUsers:j.Rf}),f.D)((e=>{(0,a.useEffect)((()=>(e.getUsers(e.currentPage,e.pageSize),()=>{e.clearUsers()})),[]);return(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(m,{...e,onPageChanged:s=>{e.setCurrentPage(s),e.clearUsers(),e.getUsers(s,e.pageSize)}}),e.isLoading?(0,P.jsx)(C.Z,{}):null]})}))}}]);
//# sourceMappingURL=351.46bab530.chunk.js.map