import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Profile from '../pages/Profile';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import App from '../App';
import ProductDetail from '../pages/ProductDetail';
import ThankPage from '../pages/ThankPage';



export const router = createBrowserRouter([
    { path: '/', element: <App/> },
    { path: '/profile', element: <Profile /> },
    { path: '/product-detail/:productId', element: <ProductDetail /> },
    { path: '/signin', element: <SignIn /> },
    { path: '/signup', element: <SignUp /> },
    { path: '/thank' , element: <ThankPage/>}
])