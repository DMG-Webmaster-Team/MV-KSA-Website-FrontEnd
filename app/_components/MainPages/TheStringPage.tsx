"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

const FORM_SRC =
  "https://dashboard.thestring.net/forms/b5ef01ae-483e-4488-a6b1-611cf5387742/show?domain=https://mountainview.production.thestring.net/api/v1&v=zil3pfggur";

export default function TheStringPage() {
  const t = useTranslations("TheString");
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState<number | null>(null);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data && event.data.type === "IFRAME_HEIGHT") {
        setIframeHeight(event.data.height);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleIframeLoad = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
    }

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "FORM_PARAMS",
        params,
      },
      "*"
    );
  };

  return (
    <div className="bg-darkblue text-white">
      <div className="max-w-[800px] mx-auto px-4 md:pt-44 pt-32 pb-10 text-center space-y-4">
        <h1 className="lg:text-6xl md:text-5xl text-3xl font-medium leading-tight">
          {t("title")}
        </h1>
        <p className="text-gray2 md:text-lg text-base max-w-[560px] mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="max-w-[900px] mx-auto px-4 pb-20 md:pb-28">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-2 md:p-4">
          <iframe
            ref={iframeRef}
            id="formIframe"
            title={t("title")}
            width="100%"
            scrolling="no"
            style={{
              border: 0,
              minHeight: "400px",
              height: iframeHeight ? `${iframeHeight}px` : "auto",
            }}
            src={FORM_SRC}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    </div>
  );
}
