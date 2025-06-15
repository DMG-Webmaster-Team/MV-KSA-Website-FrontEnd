import React from 'react'

export interface Repeater {
    Title: string,
    Description: string
}

export default function TextComp({ data }: { data: Repeater }) {
    return (
        <div className='md:px-8 md:py-7 p-4 bg-gray rounded-xl flex flex-col gap-3'>
            <h3 className=' md:text-2xl text-base font-medium text-primary'>{data.Title}</h3>
            <p className=' md:text-xl text-base font-medium text-primary text-opacity-50'>{data.Description}</p>
        </div>
    )
}
