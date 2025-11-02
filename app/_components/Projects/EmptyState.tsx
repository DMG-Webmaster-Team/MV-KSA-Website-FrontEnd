import { m } from "framer-motion";

export default function EmptyState() {
  return (
    <div className="max-w-[1512px] mx-auto h-[70vh] px-5">
      <div className="flex flex-col justify-center items-center h-full md:gap-5 gap-3">
        <m.h4
          className="md:text-[32px] text-2xl text-center md:leading-[38.4px] lg:max-w-[500px] text-primary-100"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          We don&apos;t have this type of communities at this area yet.
        </m.h4>
        <m.p
          className="md:text-xl text-base text-center text-[#AAAAAA] text-pretty"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          Try searching in another area or change the type of community.
        </m.p>
      </div>
    </div>
  );
}
