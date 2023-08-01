import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Auth from './pages/Auth';
import CreateProduct from './pages/CreateProduct';



import Home from './pages/Home';

export default function useRoutes(isAuthenticated) {

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/auth"
                    element={
                        isAuthenticated ? <Navigate to="/" replace /> :
                            <Auth />
                    }
                />
                <Route
                    path="/create"
                    element={
                        isAuthenticated ? <CreateProduct /> : <Navigate to="/" replace />
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />

            </Routes>
        </>
    );
}
