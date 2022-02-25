import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { startChecking } from '../../actions/auth'
import { LoginScreen } from '../auth/LoginScreen'
import { CalendarScreen } from '../calendar/CalendarScreen'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {
    const dispatch = useDispatch();
    const {checking,uid} = useSelector(state => state.auth);
    useEffect(() => {
        dispatch(startChecking())
    }, [])
    if(checking) return <h5>Cargando</h5>
    return (
        <BrowserRouter>
            <Routes>
                <Route path="login" element={
                        <PublicRoute isAuthenticated={!!uid}>
                            <LoginScreen />
                        </PublicRoute>
                    } 
                />
                <Route path="/" element={
                        <PrivateRoute isAuthenticated={!!uid}>
                            <CalendarScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    )
}
