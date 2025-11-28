import Link from "next/link"

const CtaTwo = () => {
    return (
        <section className="cta-block">
            <div className="container">
                <div className="flex gap-y-4 gap-6 items-center justify-between flex-wrap max-lg:flex-col max-lg:justify-center bg-linear-blue py-7 px-10 rounded-2xl overflow-hidden">
                    <h3 className="text-white heading4 max-lg:text-center">Ready to take the next step? Lets make things happen!</h3>
                   <Link
                className="button-main transition-transform duration-300 ease-in-out hover:-translate-x-2"
                href="/contact-us"
                >
                Contact Us
                </Link>

                </div>
            </div>
        </section>
    )
}
export default CtaTwo