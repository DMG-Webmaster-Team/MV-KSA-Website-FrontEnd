import React from 'react'

export interface Repeater {
    Title: string,
    Description: string
}

export default function TextComp({ data }: { data: Repeater }) {
    return (
        <div className='px-8 py-7 bg-gray rounded-xl flex flex-col gap-3'>
            <h3 className=' text-2xl font-medium text-primary'>{data.Title}</h3>
            <p className=' text-xl font-medium text-primary text-opacity-50'>{data.Description}</p>
        </div>
    )
}
