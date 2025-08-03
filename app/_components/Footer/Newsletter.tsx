import SubscribeForm from "./SubscribeForm";

interface Props {
  data: {
    newsletter_title: string;
    newsletter_subtitle: string;
  };
}
export default async function NewsLetter({ data }: Props) {
  return (
    <div className=" space-y-10">
      <div className="">
        <h2 className="  text-white md:text-4xl text-[22px]">
          {data.newsletter_title}
        </h2>
        <p className=" text-white opacity-50 md:text-xl text-sm font-medium md:pt-3 pt-2">
          {data.newsletter_subtitle}
        </p>
      </div>
      <SubscribeForm />
    </div>
  );
}
