import SubscribeForm from "./SubscribeForm";

interface Props {
    data: {
        newsletter_title: string,
        newsletter_subtitle: string
    }
}
export default async function NewsLetter({ data }: Props) {

    return (
        <div className=" bg-mediumBlue md2:py-[47px] py-6">
            <div className="max-w-[1424px] mx-auto px-4 flex justify-between items-end md2:flex-row flex-col gap-y-5">
                <div className="lg:w-[569px] md2:w-[50%] w-full">
                    <h2 className=" text-white font-bold lg:text-[32px] md:text-3xl text-lg">{data.newsletter_title}</h2>
                    <p className=" text-white lg:text-lg md:text-base text-sm font-medium md:pt-[14px] pt-2.5 text-pretty">{data.newsletter_subtitle}</p>
                </div>
                <div className="lg:w-[483px] md2:w-[calc(50%-20px)] w-full">
                    <SubscribeForm />
                </div>

            </div>


        </div>
    );
}
