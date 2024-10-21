import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
    const userData = useSelector((state) => state.auth.userData);

    if (!userData?.premium) {
        return <Navigate to="/admin/go-premium" />;
    }
    return children;
};

const ProtectedRoute2 = ({ children }) => {
    const authStatus = useSelector((state) => state.auth.status);

    if(!authStatus) {
        return <Navigate to={`/`} />
    }
    return children;
}

export { ProtectedRoute, ProtectedRoute2};
