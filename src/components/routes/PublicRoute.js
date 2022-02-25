import { Navigate } from 'react-router-dom';
export const PublicRoute = ({children,isAuthenticated}) => {
    return !isAuthenticated
        ? children
        : <Navigate to="/" />
}