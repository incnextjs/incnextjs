import React from 'react';
import Error from 'next/error';

export default class ErrorPage extends Error {

    render() {
        return (
            <p>Error...</p>
        )
    }
    
}