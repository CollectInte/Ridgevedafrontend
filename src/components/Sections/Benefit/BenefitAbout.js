import React from 'react'
import Image from 'next/image';
import * as Icon from "@phosphor-icons/react/dist/ssr";

const BenefitAbout = () => {
    return (
        <section className="our-value-block bg-linear-gradient-yellow lg:py-20 sm:py-14 py-10">
            <div className="container">
                <div className="heading text-center">
                    <h3 className="heading3 text-center">Our Journey Through Time</h3>
                    <div className="text-center mt-3">Discover exceptional experiences through testimonials from our satisfied customers.</div>
                </div>
                <div className="list-values grid xl:grid-cols-4 sm:grid-cols-2 gap-[30px] lg:mt-10 mt-6">
                    <div className="item bg-white p-8 rounded-[20px] h-full">
                        <Icon.Users className="text-blue text-6xl" />
                        <div className="heading5 fw-600 mt-6">Customer Centricity</div>
                        <div className="text-surface1 mt-3">At Ridgeveda, clients are our top priority. We listen to their needs, understand their challenges, and deliver tailored acquisition solutions that exceed expectations. Their success drives ours.
                        </div>
                    </div>
                    <div className="item bg-white p-8 rounded-[20px] h-full">
                        <Icon.Trophy className="text-blue text-6xl" />
                        <div className="heading5 fw-600 mt-6">Quality Assurance</div>
                        <div className="text-surface1 mt-3">We ensure the highest quality in every aspect of our work. Our rigorous monitoring and refinement processes guarantee exceptional results in customer acquisition. Quality is our foundation.
                        </div>
                    </div>
                    <div className="item bg-white p-8 rounded-[20px] h-full">
                        <Icon.Crosshair className="text-blue text-6xl" />
                        <div className="heading5 fw-600 mt-6">Client Focus</div>
                        <div className="text-surface1 mt-3">Our clients are central to our approach. We offer customized strategies and support throughout their growth journey, focusing on long-term success. Their goals are our goals.
                        </div>
                    </div>
                    <div className="item bg-white p-8 rounded-[20px] h-full">
                        <Icon.ShieldCheck className="text-blue text-6xl" />
                        <div className="heading5 fw-600 mt-6">Integrity Always</div>
                        <div className="text-surface1 mt-3">Integrity is at our core. We operate with transparency, uphold ethical standards, and build relationships based on trust. Honesty and fairness are integral to our work.

                        </div>
                    </div>
                </div>
            </div>
            <div className="award-block lg:mt-20 sm:mt-14 mt-10">
               
            </div>
        </section>
    )
}

export default BenefitAbout
