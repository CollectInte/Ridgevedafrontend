import Link from "next/link"

const AboutTwo = () => {
    return (
        <section className="about-block lg:pt-20 sm:pt-14 pt-10 lg:pb-[60px] sm:pb-10 pb-8">
            <div className="container">
                <div className="flex gap-y-3 items-center justify-between max-lg:flex-wrap">
                    <div className="w-full xl:w-5/12 lg:w-6/12">
                        <h3 className="heading3">We bring strategy, innovation, and execution together for your growth</h3>
                    </div>
                    <div className="w-full lg:w-6/12">
                        <div className="desc">At RidgeVeda, we are your partner in digital growth, offering end-to-end solutions across website development, digital marketing, sales, content creation, telecalling outsourcing, and healthcare-focused digital services.</div>
                                                <div className="desc"> We build high-performing websites, craft content that connects, and run result-driven marketing campaigns that boost visibility and conversions.</div>
                        <div className="desc">Our sales and telecalling support helps businesses reach the right audience and close more opportunities, while our healthcare digital solutions enhance patient engagement and strengthen online presence—all working together to help your brand grow smarter and faster.</div>

                        {/* <Link className="text-button-sm inline-block mt-4 visited:no-underline underline border-black text-black" href="#about-us-section">About Us</Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTwo