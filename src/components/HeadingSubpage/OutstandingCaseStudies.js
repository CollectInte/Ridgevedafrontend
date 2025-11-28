import React from 'react'
import Link from 'next/link'
import { convertToSlug } from '@/common/utils'
import Image from 'next/image'

const OutstandingCaseStudies = ({ data, showDesc }) => {
    return (
        <div className="heading-content">
            <div className="container">
                <Link className="content-main style-one block bg-white rounded-3xl overflow-hidden shadow-lg"
                    href={process.env.PUBLIC_URL + "/case-studies/case-studies-detail1/[slug]"}
                    as={process.env.PUBLIC_URL + "/case-studies/case-studies-detail1/" + convertToSlug(data.title) + "?id=" + data.id}
                >
                    <div className="flex max-lg:flex-col-reverse items-center justify-between relative">
                        <div className="lg:w-1/2">
                            <div className="text-content lg:p-20 max-lg:px-8 max-lg:py-10">
                                <div className="tag text-label">{data.category}</div>
                                <div className="name heading3 mt-4">{data.title}</div>
                                {showDesc &&
                                    <div className="desc body2 text-surface1 mt-4">{data.description}</div>
                                }
                            </div>
                        </div>
                        <div className="lg:w-1/2 h-full lg:absolute top-0 right-0">
                            <div className="bg-img h-full">
                                <Image width={5000} height={5000} className="w-full h-full object-cover" src={data.thumbImage} alt={data.thumbImage} />
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OutstandingCaseStudies
