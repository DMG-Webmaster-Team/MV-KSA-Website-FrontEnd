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
            <h3 className=' py-6 justify-between text-primary text-2xl font-medium flex gap-10 cursor-pointer' onClick={() => handleClick(index)}>
                <span> {item.Title}</span>
                <span className='w-6 h-6 transition-all duration-500'>
                    {openfaq === index ? <Minus /> : <Plus />}
                </span>
            </h3>
            <motion.div
                className={`overflow-hidden`}
                initial={false}
                animate={openfaq === index ? { height: "auto" } : { height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <p className=' text-primary text-opacity-50 pt-4 pb-6'>
                    {item.Description}
                </p>
            </motion.div>
        </div>
    )
}
