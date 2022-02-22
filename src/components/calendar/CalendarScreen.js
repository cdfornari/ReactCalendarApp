import { Navbar } from '../ui/Navbar'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { messages } from '../../helpers/calendar-messages-spanish'
import { CalendarEvent } from './CalendarEvent'
import { useState } from 'react'
import { CalendarModal } from './CalendarModal'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { calendarClearActiveEvent, calendarDeleteEvent, calendarSetActiveEvent } from '../../actions/calendar'
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

moment.locale("es");
const localizer = momentLocalizer(moment); 

export const CalendarScreen = () => {
  const dispatch = useDispatch();
  const [lastView, setLastView] = useState(localStorage.getItem('lastview') || 'month');
  const {events,activeEvent} = useSelector(state => state.calendar);
  const onDoubleClick = () =>{
    dispatch(uiOpenModal);
  }
  const onSelectEvent = e =>{
    dispatch(calendarSetActiveEvent(e));
  }
  const onViewChange = e =>{
    setLastView(e);
    localStorage.setItem('lastview',e);
  }
  const onSelectSlot = () => {
    dispatch(calendarClearActiveEvent);
  }
  const eventStyleGetter = (event,start,end,isSelected) =>{
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white"
    }
    return {
      style
    }
  }
  return (
    <div className='calendar-screen'>
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        selectable={true}
        onSelectSlot={onSelectSlot}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        view={lastView}
        components={{
          event: CalendarEvent
        }}
      />
      <AddNewFab onClick={()=>dispatch(uiOpenModal)}/>
      {
        activeEvent &&
        <DeleteEventFab onClick={()=>dispatch(calendarDeleteEvent(activeEvent))}/>
      }
      <CalendarModal />
    </div>
  )
}