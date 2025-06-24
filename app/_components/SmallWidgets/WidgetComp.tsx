import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { WidgetProps } from '../CommonComp/Widgets';

export default function WidgetComp({ item }: { item: WidgetProps }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-[600px] aspect-[882/735] flex items-end"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Image.data.attributes.url}`}
                alt={item.Image.data.attributes.alternativeText ?? item.Title}
                className="object-cover"
                fill
            />
            <div
                className="relative pt-6 w-full"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 100%)',
                }}
            >
                <h3 className="text-white text-5xl font-medium px-6">
                    {item.Title}
                </h3>
                <motion.div
                    initial={false}
                    animate={isHovered ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`overflow-hidden ${isHovered ? "" : "mb-6"}`}
                    style={{ background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 44.13%)" }}
                >
                    <p className="text-white text-2xl font-medium pt-4 px-6 pb-6">
                        {item.Description}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
