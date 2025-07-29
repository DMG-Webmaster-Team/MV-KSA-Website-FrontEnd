"use client";

import { useTranslations } from "next-intl";
import { useState, FormEvent } from "react";
import ArrowLong from "../SVGS/ArrowLong";

export default function SubscribeForm() {
  const t = useTranslations();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/newsletter-froms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              Email: email, // Match the exact field name in Strapi
            },
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error?.message || t("data.error"));
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("data.went_wrong"));
    } finally {
      setIsLoading(false);
    }
  };

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
      {success && (
        <p className="text-green-500 text-sm">{t("data.success")}</p>
      )}
    </form>
  );
}
