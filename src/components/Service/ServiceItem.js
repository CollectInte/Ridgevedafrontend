import { convertToSlug } from "@/common/utils";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link"

const ServiceItem = ({ data, type }) => {
  const isImage = data.icon?.includes(".png") || data.icon?.includes(".jpg") || data.icon?.includes(".svg");

  return (
    <>
      {type === 'style-two' && (
        <div className="service-item style-two rounded-2xl bg-white h-full">
          <div className="main md:p-10 p-8 flex flex-col gap-6 h-full">

            <div className="flex items-start gap-6">
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
              <div className="text-center">
            <Link href={process.env.PUBLIC_URL + data.to}>
              <button className="group bg-[#2D4FE1] text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center w-max mx-auto transition-all duration-300 hover:pl-6">
                Know more
                <ArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Link>
            </div>
          </div>
        </div>

      )}
    </>
  );
}


export default ServiceItem