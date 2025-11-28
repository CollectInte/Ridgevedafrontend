import * as Icon from "@phosphor-icons/react/dist/ssr"
import React from "react"

const BenefitOne = ({ classname, data, start, limit }) => {
    return (
        <section className={`section-benefit ${classname}`}>
            <div className="container">
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-[30px]">
                    {data.slice(start, limit).map((item, index) => (
                        <div className="benefit-item" key={index}>
                            <div className="block-icon">
                            <div className="transition-transform duration-300 ease-in-out hover:-translate-y-1">
                            {Icon[item.icon] && React.createElement(Icon[item.icon], { className: 'text-4xl' })}
                            </div>
                            </div>
                            <h6 className="heading6 sm:mt-4 mt-2">{item.title}</h6>
                            <div className="text-surface1 mt-2">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default BenefitOne