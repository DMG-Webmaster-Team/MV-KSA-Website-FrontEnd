import { fetchServer } from "@/app/api/general";
import Image from "next/image";
import Link from "next/link";
import ArrowLong from "../SVGS/ArrowLong";

export default async function Footer({ params: { locale } }: { params: { locale: string } }) {
    const Footer = await fetchServer("general-page?", locale)
    return (
        <footer className="bg-darkblue">
            <div className="max-w-[1448px] px-4 mx-auto">
                <div className=" py-8 flex justify-between items-center border-b border-white border-opacity-10">
                    <div className="flex md:gap-6 gap-3 items-center">
                        <Link href={`${locale == "en" ? "/en" : "/"}`} className=" relative md:w-[267px] w-[152px] aspect-[401/105]">
                            <Image
                                src={'/logowhite.webp'}
                                alt="Logo MV KSA"
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </Link>
                        <span className="w-[1px] md:h-[60px] h-[40px] bg-white bg-opacity-20" />
                        <div className="flex md:gap-6 gap-3 ">
                            {Footer.data.attributes.Footer.SocialMedia.map(
                                (item: {
                                    Link: string;
                                    Icon: {
                                        data: {
                                            attributes: {
                                                alternativeText: string | null;
                                                url: string;
                                            };
                                        };
                                    };
                                }) => (
                                    <Link href={item.Link} key={item.Link} className=" relative w-6 h-6" target="_blank" rel="noopener noreferrer">
                                        <Image
                                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${item.Icon.data.attributes.url}`}
                                            alt={item.Icon.data.attributes.alternativeText || 'Social media icon'}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </Link>
                                )
                            )}
                        </div>
                    </div>
                    <button className=" bg-primary hover:bg-darkblue transition-all duration-500 rounded-full p-3 md2:flex hidden items-center justify-center">
                        <span className="w-6 h-6 rotate-90 text-white">
                            <ArrowLong />
                        </span>
                    </button>
                </div>
                <div className=" md:py-[60px] py-10 flex md2:flex-row flex-col-reverse gap-y-10 justify-between  border-b border-white border-opacity-10">
                    <div className="md:w-[400px]">
                        <h3 className=" text-white md:text-4xl text-[22px]">{Footer.data.attributes?.Footer.Text?.Title}</h3>
                        <p className=" text-white opacity-50 md:text-xl text-sm font-medium md:pt-3 pt-2">{Footer.data.attributes?.Footer.Text?.Description}</p>
                    </div>
                    <div className="md:w-[324px] flex gap-x-16">
                        <div className="flex flex-col gap-3">
                            {Footer.data.attributes.Footer.Menu.slice(0, 8).map(
                                (item: {
                                    Link: string;
                                    Title: string;
                                }) => (
                                    <Link href={item.Link} key={item.Link} className="  text-white hover:opacity-50 transition-all duration-500 md:text-base text-sm font-bold" rel="noopener noreferrer">
                                        {item.Title}
                                    </Link>
                                )
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            {Footer.data.attributes.Footer.Menu.slice(8, 15).map(
                                (item: {
                                    Link: string;
                                    Title: string;
                                }) => (
                                    <Link href={item.Link} key={item.Link} className="  text-white hover:opacity-50 transition-all duration-500 text-base font-bold" rel="noopener noreferrer">
                                        {item.Title}
                                    </Link>
                                )
                            )}
                        </div>

                    </div>
                </div>
                <div className=" md:py-[22px] py-3 flex items-center justify-between md:flex-row flex-col-reverse">
                    <p className=" text-white text-sm font-medium">{Footer.data.attributes.Footer.Copyrights}</p>
                    <p className="text-white text-sm opacity-50">Website design and developed by <Link href={'www.mitchdesigns.com'} className="underline" target="_blank" >MitchDesigns</Link></p>
                </div>
            </div>
        </footer>
    );
}
