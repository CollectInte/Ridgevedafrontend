import React from 'react'

const HeadingSubpage = ({ classname, tag, title, desc }) => {
    return (
        <div className={`heading-title ${classname}`}>
            <div className="container">
                {tag && (
                    <div className='tag-block flex items-center justify-center'>
                        <span className='tag text-label'>{tag}</span>
                    </div>
                )}
                <div className={`title heading2 text-center capitalize${tag ? ' mt-4' : ''}`}>{title}</div>
                <div className="desc body2 text-center text-surface1 mt-3">{desc}</div>
            </div>
        </div>
    )
}

export default HeadingSubpage
