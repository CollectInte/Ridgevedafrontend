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
  const [openVideo, setOpenVideo] = useState(false)

  return (
    <>
      <section className="slider style-two w-full">
        <div className="slider-main h-full w-full">
          <Swiper
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
                    {/* <div className="group-btn flex items-center flex-wrap gap-3 md:mt-8 mt-5">
                      <Link href={process.env.PUBLIC_URL + "/services/[slug]"}
                        as={
                          process.env.PUBLIC_URL +
                          "/services/" +
                          convertToSlug('Managed IT Services')
                        }
                        className="button-main bg-white text-black rounded hover:text-white">Our Services</Link>
                      <Link href='#!' scroll={false} className="button-main rounded-full inline-flex gap-2" onClick={() => setOpenVideo(true)}>
                        <Icon.PlayCircle weight='fill' className='text-white text-2xl' />
                        <span className='text-white'>Video Presentation</span>
                      </Link> 
                    </div> */}
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
            
            
          </Swiper>
        </div>
        
        {openVideo ? <VideoFrame setOpenVideo={setOpenVideo} /> : <></>}
      </section>
    </>
  )
}

export default SliderTwo