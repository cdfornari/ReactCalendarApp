import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { formatEvents } from "../helpers/formatEvents";
import { types } from "../types/types";

export const calendarStartAddNewEvent = (event) => {
    return async (dispatch,getState) => {
        const {uid,name} = getState().auth;
        try {
            const resp = await fetchConToken('events',event,'POST');
            const body = await resp.json();
            if(body.ok){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                }
                dispatch(calendarAddNewEvent(event));
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const calendarAddNewEvent = (event) => ({
    type: types.calendarAddNewEvent,
    payload: event
})

export const calendarSetActiveEvent = (event) => ({
    type: types.calendarSetActiveEvent,
    payload: event
})

export const calendarClearActiveEvent = {
    type: types.calendarClearActiveEvent
}

export const calendarStartUpdateEvent = (event) => {
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('events/'+event.id,event,'PUT');
            const body = await resp.json();
            if(body.ok){
                dispatch(calendarUpdateEvent(event));
            }else{
                Swal.fire('Error',body.msg,'error');
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const calendarUpdateEvent = (event) => ({
    type: types.calendarUpdateEvent,
    payload: event
})

export const calendarStartDeleteEvent = (event) => {
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken('events/'+event.id,event,'DELETE');
            const body = await resp.json();
            if(body.ok){
                dispatch(calendarDeleteEvent(event));
            }else{
                Swal.fire('Error',body.msg,'error')
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const calendarDeleteEvent = (event) => ({
    type: types.calendarDeleteEvent,
    payload: event
})

export const calendarStartEventLoading = () => {
    return async(dispatch) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            if(body.ok){
                dispatch(eventLoading(formatEvents(body.events)));
            }
        } catch (error) {
            console.log(error)
        }
    }
}
const eventLoading = (events) => ({
    type: types.calendarEventsLoad,
    payload: events
})

export const calendarClearEvents = {
    type: types.calendarClearEvents
}