import React from 'react'
import Plus from '../SVGS/Plus'
import { Repeater } from './TextComp'
import Minus from '../SVGS/Minus';
import { motion } from 'framer-motion';

export default function SingleAccordion({ item, handleClick, openfaq, index }: {
    item: Repeater, handleClick: (index: number) => void, openfaq: number | null, index: number;
}) {
    return (
        <div className=' border-b border-gray2'>
            <h3 className=' md:py-6 py-4 justify-between text-primary md:text-2xl text-base font-medium flex gap-10 cursor-pointer' onClick={() => handleClick(index)}>
                <span> {item.Title}</span>
                <span className='md:w-6 md:h-6 w-5 h-5 transition-all duration-500'>
                    {openfaq === index ? <Minus /> : <Plus />}
                </span>
            </h3>
            <motion.div
                className={`overflow-hidden`}
                initial={false}
                animate={openfaq === index ? { height: "auto" } : { height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <p className=' text-primary text-opacity-50 text-sm md:pt-4 pt-4 md:pb-6 pb-4'>
                    {item.Description}
                </p>
            </motion.div>
        </div>
    )
}
