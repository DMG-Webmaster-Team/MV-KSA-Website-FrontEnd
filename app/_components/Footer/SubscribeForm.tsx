"use client";

import { useTranslations } from "next-intl";
import ArrowLong from "../SVGS/ArrowLong";
import useSubscribeForm from "@/app/hooks/useSubscribeForm";

export default function SubscribeForm() {
  const t = useTranslations();
  const {
    email,
    setEmail,
    isLoading,
    error,
    success,
    handleSubmit,
  } = useSubscribeForm();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md">
      <div className="flex justify-between bg-white px-4 py-3 rounded-sm">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("data.enter_your_email")}
          className="w-[calc(100%-24px-16px)] outline-none"
          disabled={isLoading}
        />

        <button type="submit" disabled={isLoading} className="text-primary">
          <span className="w-6 h-6 block">
            <ArrowLong />
          </span>
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      {success && <p className="text-green-500 text-sm">{t("data.success")}</p>}
    </form>
  );
}
