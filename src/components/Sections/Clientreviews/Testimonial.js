'use client';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Testimonial = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_SCRIPT_SERVICES_PROJECTS_GET)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setProjects(data.data);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    return (
        <>
            {/* --- Inline CSS Fixes --- */}
            <style>
                {`
                /* Make text selectable */
                .selectable-text {
                    user-select: text !important;
                    -webkit-user-select: text !important;
                }

                /* Make button clickable */
                .our-projects-button {
                    cursor: pointer !important;
                    pointer-events: auto !important;
                }

                /* Remove unwanted drag cursor added by Swiper */
                .swiper-slide {
                    cursor: default !important;
                }

                /* Ensure parent does NOT block the button */
                .button-width {
                    pointer-events: auto !important;
                }
                `}
            </style>

            <section className="our-value-block our-projects pt-10 pb-10">
                <div className="container">
                    <div className="heading text-center">
                        <h3 className="heading3">Our Projects</h3>
                        <div className="mt-3">Our Projects showcase innovation, creativity, and solutions designed to inspire.</div>
                    </div>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={30}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            1024: { slidesPerView: 3 },
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        className="mt-6 lg:mt-10"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-white button-width p-8 rounded-[20px] h-full ">
                                    <div className="heading5 fw-600 mt-6 logo-center">
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_API_MAIN_URL}${project.logo_url}`}
                                            alt="Project logo"
                                            className="w-[146px] h-[70px] text-center"
                                        />
                                    </div>

                                    <div className="text-start mt-5 selectable-text">
                                        {project.content}
                                    </div>

                                    <div className="text-surface1 button-width mt-3">
                                        <a
                                            href={project.website_url}
                                            target="_blank"
                                            className="our-projects-button"
                                        >
                                            Visit Website
                                        </a>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default Testimonial;
