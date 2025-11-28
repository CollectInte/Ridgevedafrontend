import { convertToSlug } from "@/common/utils"
import Link from "next/link"

const ServiceItem = ({ data, type }) => {
  const isImage = data.icon?.includes(".png") || data.icon?.includes(".jpg") || data.icon?.includes(".svg");

  return (
    <>
      {type === 'style-two' && (
        <div className="service-item style-two rounded-2xl bg-white h-full">
          <div className="main md:p-10 p-8 flex items-start gap-6 h-full">
            {isImage ? (
              <img
                src={data.icon}
                alt={data.title}
                className="w-14 h-14 object-contain flex-shrink-0"
              />
            ) : (
              <i className={`${data.icon} text-6xl text-blue flex-shrink-0`}></i>
            )}
            <div>
              <strong className="service-name heading5">{data.title}</strong>
              <p className="service-desc text-surface1 whitespace-normal mt-3">{data.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


export default ServiceItem