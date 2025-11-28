'use client'

import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import FooterOne from '@/components/Footer/FooterOne';
import HeaderOne from '@/components/Header/HeaderOne';

export default function PageNotFound() {
    return (
        <>
        <HeaderOne />
            <div className="bg-subpage absolute top-0 w-full h-[740px] bg-linear-gradient z-[-1]"></div>
            <section className='lg:py-20 sm:py-14 py-10 border-b border-outline'>
                <div className="container flex max-lg:flex-col gap-y-8 items-center">
                    <div className="bg-img lg:w-1/2 flex-shrink-0">
                        <img
                            src={'/images/cli/bg-404.png'}
                            width={5000}
                            height={5000}
                            alt='bg-404'
                            className='w-full'
                        />
                    </div>
                    <div className="content lg:pl-32">
                        <h2 className="lg:text-9xl text-7xl font-bold">404!</h2>
                        <div className="heading3 mt-6">Something is Missing...</div>
                        <p className="body2 text-surface1 mt-6">The page you are looking for cannot be found. take a break before trying again</p>
                        <Link className='button-main bg-blue mt-5' href={'/'}>Back To Homepage</Link>
                    </div>
                </div>
            </section>
            <FooterOne />
        </>
    )
}
