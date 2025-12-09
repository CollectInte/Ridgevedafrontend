'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import * as Icon from "@phosphor-icons/react/dist/ssr";
import VideoFrame from '@/components/Other/VideoFrame';

const SliderTwo = () => {
  const [openVideo, setOpenVideo] = useState(false);

  return (
    <>
      <section className="slider style-two w-full">
        <div className="slider-main h-full w-full">
          {/* <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className='h-full relative style-slider style-white'
            autoplay={{
              delay: 5000,
            }}
          >
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content">
                    <h2 className="heading1 text-white">SOLUTIONS <br />THAT DRIVE SUCCESS</h2>
                    <div className="body3 text-white md:mt-4 mt-2">Collaborating to create a roadmap for your triumph</div>
                  </div>
                  <div className="sub-img absolute left-0 top-0 w-full h-full z-[-1]">
                  <video
                    width="4000"
                    height="3000"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover  brightness-75"
                  >
                    <source src="/images/cli/bgVid.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  
                  
                  </div>
                </div>
              </div>
            </SwiperSlide>
            
            
          </Swiper> */}
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="h-full relative style-slider style-white"
            autoplay={{
              delay: 5000,
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide>
              <div className="slider-item h-60 w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content">
                    <h2 className="heading1 text-white">DIGITAL MARKETING SOLUTIONS</h2>
                    <p className='text-white'>Complete Marketing Support for Complete Success.</p>
                    <div className="text-white md:mt-4 mt-2">
                      <button className='btn btn-primary' onClick={() => window.location.href = "/marketing"}>Know more <i className="bi bi-arrow-right"></i></button>
                    </div>
                  </div>

                  {/* Background Image */}
                  <div className="sub-img absolute left-0 top-0 w-full h-full -z-10">
                    <img
                      src="/images/cli/dgmarketing.jpg"
                      alt="Slide 1"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="slider-item h-60 w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content">
                    <h2 className="heading1 text-white">CA,CS&TAX CONSULTANTS APPLICATION</h2>
                    <p className='text-white'>From chaos to clarity — one login away.</p>
                    <div className="text-white md:mt-4 mt-2">
                      <button className='btn btn-primary' onClick={() => window.location.href = "/cawebapplication"}>Know more <i className="bi bi-arrow-right"></i></button>
                    </div>
                  </div>

                  <div className="sub-img absolute left-0 top-0 w-full h-full -z-10">
                    <img
                      src="/images/cli/tax.jpg"
                      alt="Slide 2"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="slider-item h-60 w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content">
                    <h2 className="heading1 text-white">HEALTHCARE MANAGEMENT SOLUTIONS</h2>
                    <p className='text-white'>Your Hospital Operations — Under One Smart System.</p>
                    <div className="text-white md:mt-4 mt-2">
                      <button className='btn btn-primary' onClick={() => window.location.href = "/healthcare"}>Know more <i className="bi bi-arrow-right"></i></button>
                    </div>
                  </div>

                  <div className="sub-img absolute left-0 top-0 w-full h-full -z-10">
                    <img
                      src="/images/cli/healthcare.jpg"
                      alt="Slide 2"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
              <div className="slider-item h-full w-full relative">
                <div className="container w-full h-full flex items-center">
                  <div className="text-content">
                    <h2 className="heading1 text-white">TELECALLING OUTSOURCING</h2>
                    <p className='text-white'>Effortless Outreach, Endless Opportunities.</p>
                    <div className="text-white md:mt-4 mt-2">
                      <button className='btn btn-primary' onClick={() => window.location.href = "/telecallingoutsourcing"}>Know more <i className="bi bi-arrow-right"></i></button>
                    </div>
                  </div>

                  <div className="sub-img absolute left-0 top-0 w-full h-full -z-10">
                    <img
                      src="/images/cli/tcout.jpg"
                      alt="Slide 3"
                      className="w-full h-full object-cover brightness-75"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {openVideo ? <VideoFrame setOpenVideo={setOpenVideo} /> : <></>}
      </section>
    </>
  )
}

export default SliderTwo