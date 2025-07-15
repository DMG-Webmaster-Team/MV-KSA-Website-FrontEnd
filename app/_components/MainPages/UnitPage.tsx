import React from 'react'
import { OverviewSectionProps } from '../CommonComp/OverviewSection'
import { SingleList } from '../UnitWidget'
interface ImageProps {
    data: {
        attributes: {
            alternativeText: string,
            url: string
        }
    }
}
interface Props {
    Title: string,
    slug: string,
    Hero_Media: ImageProps[],
    OverviewSection: OverviewSectionProps,
    Gallery: {
        data: ImageProps[]
    },
    amenities: {
        Description: string,
        Image: ImageProps,
        List: SingleList[]
    },
    Repeater: {
        Title: string,
        Description: string,
        Image: ImageProps
    }[],
    PDF: {
        data: {
            attributes: {
                url: string,
                name: string
            }
        }
    }
}
export default function UnitPage({ data }: { data: Props }) {
    console.log(data, "Data")
    return (
        <div>UnitPage</div>
    )
}
