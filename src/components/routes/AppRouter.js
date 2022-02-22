import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen'

export const AppRouter = () => {
    const logged = false;
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={<LoginScreen />}/>
                <Route path="/" element={<CalendarScreen />}/>
                <Route path="*" element={<Navigate to={ logged ? "/" : "login"} />}/> 
            </Routes>
        </BrowserRouter>
    )
}
