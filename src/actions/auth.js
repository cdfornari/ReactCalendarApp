import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";
import { calendarClearEvents } from "./calendar";

export const startLogin = (email,password) =>{
    return async(dispatch)=>{
        const resp = await fetchSinToken('auth', {email,password}, 'POST');
        const body = await resp.json();
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error',body.msg,'error')
        }
    }
}
export const startRegister = (name,email,password) =>{
    return async(dispatch)=>{
        const resp = await fetchSinToken('auth/register', {name,email,password}, 'POST');
        const body = await resp.json();
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            Swal.fire('Error',body.msg,'error')
        }
    }
}
export const startChecking = () => {
    return async (dispatch)=>{
        if(!localStorage.getItem('token')) return dispatch(checkingFinish);
        const resp = await fetchConToken('auth/renew');
        const body = await resp.json();
        if(body.ok){
            localStorage.setItem('token', body.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        }else{
            localStorage.removeItem('token');
            Swal.fire('Error',body.msg,'error')
            dispatch(checkingFinish);
        }
    }
}
const checkingFinish = {
    type: types.authCheckingFinish
}
const login = (user) => ({
    type: types.authLogin,
    payload: user
})
export const startLogout = () =>{
    return (dispatch) => { 
        localStorage.clear();
        dispatch(calendarClearEvents);
        dispatch(logout);
    }
}
const logout = {
    type: types.authLogout
}