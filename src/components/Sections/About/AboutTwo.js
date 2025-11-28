import Link from "next/link"

const AboutTwo = () => {
    return (
        <section className="about-block lg:pt-20 sm:pt-14 pt-10 lg:pb-[60px] sm:pb-10 pb-8">
            <div className="container">
                <div className="flex gap-y-3 items-center justify-between max-lg:flex-wrap">
                    <div className="w-full xl:w-5/12 lg:w-6/12">
                        <h3 className="heading3">We are your strategic partner for business development</h3>
                    </div>
                    <div className="w-full lg:w-6/12">
                        <div className="desc">At Ridgeveda, we are your growth partner in technology, marketing, and sales. We help businesses scale smarter and faster with integrated solutions tailored for the digital age.</div>
                                                <div className="desc">Our tech services include web & app development, custom software, cloud & DevOps, AI-driven solutions, and cybersecurity. In marketing, we deliver impact through SEO, content, PPC, social media, influencer campaigns, design, and offline activations. On the sales front, we drive results with channel partnerships, lead generation, telecalling, and on-ground activations.</div>
                        <div className="desc">Collect. Connect. Convert. Grow.</div>

                        {/* <Link className="text-button-sm inline-block mt-4 visited:no-underline underline border-black text-black" href="#about-us-section">About Us</Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTwo