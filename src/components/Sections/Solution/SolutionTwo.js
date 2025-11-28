import ServiceItem from "@/components/Service/ServiceItem"

const SolutionTwo = ({ data, start, limit }) => {
    return (
        <section className="section-solution bg-[#F3F4F9] lg:mt-20 sm:mt-14 mt-10 lg:py-20 sm:py-14 py-10">
            <div className="container">
                <h3 className="heading3 text-center">Our solutions</h3>
                <p className="text-center mt-2">Empowering Your Success Through Expert Consulting Services</p>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 lg:gap-[30px] gap-5 md:mt-10 mt-6 ">
                    {data.slice(0, 23).map((item, index) => (
                        <ServiceItem data={item} key={index} type={'style-two'} />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default SolutionTwo