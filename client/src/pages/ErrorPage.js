import React from 'react';
import errorImage from '../images/error-page.jpg'

const ErrorPage = () => {
    return (
        <div className='bg-slate-700 my-10 text-white'>
            <img alt='404 error' src={errorImage}/>
            <p className='p-10 text-2xl'>Oops! The page you are looking for doesn’t exist.</p>
        </div>
    );
};

export default ErrorPage;