import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";

const ServiceItemone = ({ data, type }) => {
  return (
    <>
      {type === "style-two" && (
        <div className="service-item style-two rounded-2xl bg-white h-full shadow-sm hover:shadow-md transition-shadow flex flex-col">
          <div className="main md:p-8 p-6 flex flex-col lg:flex-row items-center lg:items-start gap-4 flex-1">
            
            {/* Icon */}
            <img
              src={data.icon}
              alt={data.title}
              className="icon-image flex-shrink-0 transition-transform duration-300 hover:scale-110"
              style={{ width: "160px", height: "90px", objectFit: "contain" }}
            />

            {/* Content */}
            <div className="flex flex-col flex-1 min-w-0 items-center text-center lg:items-start lg:text-left">
              <strong className="service-name heading4 break-words">
                {data.title}
              </strong>

              {/* Button */}
              <div className="mt-4">
                <Link href={process.env.PUBLIC_URL + data.to}>
                  <button className="group bg-[#2D4FE1] text-white text-sm font-semibold px-4 py-2 rounded-md flex items-center w-max transition-all duration-300 hover:pl-6">
                    Know more
                    <ArrowForward className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ServiceItemone;
