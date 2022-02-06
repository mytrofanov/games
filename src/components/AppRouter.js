import React, {Component, useState} from 'react';
import {Routes, Route} from "react-router-dom";
import {publicRoutes} from '../routes'
import Auth from "../pages/Auth.tsx";


const AppRouter = () => {


    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route exact path={path} element={<Component
                />} key={path}/>
            )}
            <Route path={'*'} element={<Auth/>}/>
        </Routes>
    );
};

export default AppRouter;