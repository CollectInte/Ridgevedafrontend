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
                        <div className="desc">At RidgeVeda delivers complete business solutions—from software development and digital marketing to content creation, sales enablement, and telecalling support. We help brands execute faster, scale smarter, and achieve measurable results with services designed to work together seamlessly.</div>

                        {/* <Link className="text-button-sm inline-block mt-4 visited:no-underline underline border-black text-black" href="#about-us-section">About Us</Link> */}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutTwo
