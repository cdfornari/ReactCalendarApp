import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import { calendarAddNewEvent, calendarClearActiveEvent, calendarUpdateEvent } from '../../actions/calendar';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const start = moment().minutes(0).seconds(0).add(1,'hours');
const end = start.clone().add(2,'hours');
const initialFormValues = {
    title: '',
    notes: '',
    startDate: start.toDate(),
    endDate: end.toDate()
}

export const CalendarModal = () => {
    const dispatch = useDispatch();
    const {modalOpen} = useSelector(state => state.ui);
    const {activeEvent} = useSelector(state => state.calendar);
    const [titleValid, setTitleValid] = useState(true)
    const [formValues, setFormValues] = useState(initialFormValues);
    const {title,notes,startDate,endDate} = formValues;
    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent);
        }else{
            setFormValues(initialFormValues);
        }
    }, [activeEvent])
    const closeModal = ()=>{
        dispatch(uiCloseModal);
        dispatch(calendarClearActiveEvent);
        setFormValues(initialFormValues);
    }
    const handleStartDateChange = e =>{
        setFormValues({
            ...formValues,
            startDate: e
        })
    }
    const handleEndDateChange = e =>{
        setFormValues({
            ...formValues,
            endDate: e
        })
    }
    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const handleSubmit = e =>{
        e.preventDefault();
        const momentStart = moment(startDate);
        const momentEnd = moment(endDate);
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'La fecha de fin debe ser mayor a la fecha de inicio', 'error');
        }
        if(title.trim().length < 2){
            return setTitleValid(false);
        }
        //TO DO: save in db
        if(activeEvent){
            dispatch(calendarUpdateEvent(formValues))
        }else{
            dispatch(calendarAddNewEvent({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Carlos'
                }
            }))
        }
        setTitleValid(true);
        closeModal();
    }
    return (
        <Modal
            isOpen={modalOpen}
        /*  onAfterOpen={afterOpenModal}*/
            onRequestClose={closeModal} 
            style={customStyles}
            closeTimeoutMS={200}
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1> {activeEvent ? 'Editar Evento' : 'Nuevo Evento'} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker 
                        onChange={handleStartDateChange} 
                        value={startDate} 
                        maxDate={endDate}
                        className='form-control'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker 
                        onChange={handleEndDateChange} 
                        value={endDate} 
                        minDate={startDate}
                        className='form-control'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
