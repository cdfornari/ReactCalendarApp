import moment from "moment"
export const formatEvents = (events) => events.map(e=>({...e,startDate: moment(e.startDate).toDate(),endDate: moment(e.endDate).toDate()}))