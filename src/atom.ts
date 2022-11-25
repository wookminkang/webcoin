import { atom } from "recoil";




export const isDarkAtom = atom({
    key : "isdark", // 고유키값
    default : JSON.parse(localStorage.getItem("theme")) ?? true,    
})