import React from 'react'

export const DeleteEventFab = ({onClick}) => {
  return (
    <button className='btn btn-danger fab-danger' onClick={onClick}>
        <i className='fas fa-trash'></i>
        <span>Borrar</span>
    </button>
  )
}
