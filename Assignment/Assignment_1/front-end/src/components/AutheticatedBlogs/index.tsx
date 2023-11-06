import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Blogs } from '../../views';

const AuthenticatedBlogs = () => {
    const navigate = useNavigate();
    // Check if the user is authenticated (e.g., by verifying a token in local storage)
    const isAuthenticated = localStorage.getItem('token');
    useEffect(() => {

        if (!isAuthenticated) {
            // If not authenticated, redirect to the login page
            navigate('/');
        }
    }, [navigate]);

    return isAuthenticated ? <Blogs /> : null;
};

export default AuthenticatedBlogs;
