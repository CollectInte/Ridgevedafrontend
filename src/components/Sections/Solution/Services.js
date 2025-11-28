import ServiceItemone from "@/components/Service/ServiceItemone";
import Link from "next/link";

const Services = ({ data, start, limit }) => {
  return (
    <section className="section-solution bg-[#FAF7EF] lg:py-20 sm:py-14 p-10">
      <div className="container">
        <h3 className="heading3 text-center">Services</h3>

        {/* Mobile: 1 centered | Tablet & up: 2 equal cards per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:mt-10 mt-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex h-full justify-center"
            >
              {/* limit max width on mobile so card stays centered */}
              <div className="w-full max-w-sm sm:max-w-none h-full">
                <ServiceItemone data={item} type="style-two" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
