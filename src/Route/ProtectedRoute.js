import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/helpers';


const ProtectedRoute = ({ children, isAdmin = false }) => {
    const [user, setUser] = useState(getUser());

    if (!user) {
        return <Navigate to='/login' />
    }
    if (isAdmin === true && user.role !== 'admin') {
        return <Navigate to='/' />
    }
    return children
};

export default ProtectedRoute;