"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import ContactUsForm from "../Forms/ContactUsForm";

interface Props {
  data: {
    Title: string;
    Tagline: string;
    FormLabel: string;
    FormTitle: string;
    Hotline: string;
    Email: string;
    Image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    List: {
      Name: string;
    }[];
  };
}
export default function ContactUs({ data }: Props) {
  const t = useTranslations();
  return (
    <div>
      <div className="md:py-20 py-10 text-center space-y-6">
        <h1 className="text-primary lg:text-[100px] font-medium lg:leading-[100px] md:text-5xl text-4xl">
          {data.Title}
        </h1>
        <p className="md:text-4xl text-2xl text-primary font-medium opacity-50">
          {data.Tagline}
        </p>
      </div>
      <div
        className=" bg-cover bg-center bg-no-repeat md:py-[71px] py-10 px-4"
        style={{
          backgroundImage: `url(${process.env.NEXT_PUBLIC_API_BASE_URL}${data.Image.data.attributes.url})`,
        }}
      >
        <div className="max-w-[656px] mx-auto bg-white p-10 rounded-sm space-y-5">
          <div className=" text-primary font-medium space-y-2 text-center ">
            <span className=" text-sm opacity-50">{data.FormLabel}</span>
            <h2 className=" md:text-5xl text-3xl">{data.FormTitle}</h2>
          </div>
          <ContactUsForm List={data.List} />
        </div>
      </div>
      <div className="max-w-[1448px] px-4 mx-auto md:py-[60px] py-10 md:gap-[60px] gap-6 flex items-center sm:flex-row flex-col">
        <div className="sm:w-[50%] w-full text-center text-primary flex flex-col gap-3">
          <span className=" md:text-xl text-base opacity-50 font-medium">
            {t("data.email")}
          </span>
          <Link
            className=" md:text-5xl text-2xl font-normal font-FreightNeoPro "
            href={`mailto:${data.Email}`}
          >
            {data.Email}
          </Link>
        </div>
        <div className="sm:w-[50%] w-full text-center text-primary flex flex-col gap-3">
          <span className=" md:text-xl text-base opacity-50 font-medium">
            {t("data.hotline")}
          </span>
          <Link
            className=" md:text-5xl text-2xl font-normal font-FreightNeoPro "
            href={`tel:${data.Hotline}`}
          >
            {data.Hotline}
          </Link>
        </div>
      </div>
    </div>
  );
}
