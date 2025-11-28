'use client'

import React from 'react';

import ScrollToTop from 'react-scroll-to-top';
import { ToastContainer } from 'react-toastify';

import * as Icon from '@phosphor-icons/react/dist/ssr';

const GlobalProvider = ({ children }) => {
    return (
        <>
            {children}
            <ToastContainer position="bottom-left" autoClose={3000} />
            <ScrollToTop
                smooth
                component={<Icon.CaretUp weight="bold" />}
                style={{
                    backgroundColor: '#f7f5f4',
                    borderRadius: '999px',
                    height: '50px',
                    width: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                }}
            />
        </>
    );
};

export default GlobalProvider;
