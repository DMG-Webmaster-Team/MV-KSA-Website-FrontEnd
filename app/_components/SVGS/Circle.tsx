import React from 'react'

export default function Circle() {
    return (
        <svg className='w-full h-full' viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="16" fill="#001A70" />
            <circle cx="20" cy="20" r="18" stroke="#001A70" strokeOpacity="0.2" strokeWidth="4" />
        </svg>

    )
}
