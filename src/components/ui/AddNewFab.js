import React from 'react'

export const AddNewFab = ({onClick}) => {
  return (
    <button className='btn btn-primary fab' onClick={onClick}>
        <i className='fas fa-plus'></i>
    </button>
  )
}