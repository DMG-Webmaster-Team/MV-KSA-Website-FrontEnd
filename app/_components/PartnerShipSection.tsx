import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export interface PartnerShipProps {
    Title: string,
    Link: string,
    Logo: {
        data: {
            attributes: {
                url: string;
                alternativeText: string;
            };
        };
    }
}

export default function PartnerShipSection({ data }: { data: PartnerShipProps }) {
    return (
        <div className='max-w-[1448px] px-4 mx-auto py-20 space-y-10'>
            <h2 className=' text-primary text-center text-[52px] font-medium'>{data.Title}</h2>
            <Link href={data.Link} target='_blank' className='w-[207px] relative mx-auto aspect-[208/300] block'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Logo.data.attributes.url}`}
                    alt={data.Logo.data.attributes.alternativeText ?? "logo partner"}
                    fill
                />
            </Link>
        </div>
    )
}
