import React from 'react'
import Link from 'next/link'
import { convertToSlug } from '@/common/utils'
import Image from 'next/image'

const OutstandingBlog = ({ data }) => {
    return (
        <div className="heading-content">
            <div className="container">
                <Link className="content-main style-one block bg-white rounded-3xl overflow-hidden shadow-lg"
                    href={process.env.PUBLIC_URL + "/blog/detail1/[slug]"}
                    as={process.env.PUBLIC_URL + "/blog/detail1/" + convertToSlug(data.title) + "?id=" + data.id}
                >
                    <div className="flex max-lg:flex-col items-center justify-end relative">
                        <div className="lg:w-1/2 h-full lg:absolute top-0 left-0">
                            <div className="bg-img h-full">
                                <Image width={5000} height={5000} className="w-full h-full object-cover" src={data.thumbImage} alt={data.thumbImage} />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <div className="text-content lg:p-20 sm:p-10 p-7">
                                <div className="tag text-label">{data.category}</div>
                                <div className="name heading3 mt-3">{data.title}</div>
                                <div className="desc body2 text-surface1 mt-3">{data.description}</div>
                                <div className="date text-label text-surface1 mt-3">{data.publicDate}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default OutstandingBlog
