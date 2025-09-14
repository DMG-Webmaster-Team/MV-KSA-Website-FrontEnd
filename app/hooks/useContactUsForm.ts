"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const useContactUsForm = () => {
  const t = useTranslations();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [utmSource, setUtmSource] = useState("general");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
  }, []);
  const initialValues = {
    fullName: "",
    // lastName: "",
    email: "",
    mobile: "",
    message: "",
    utmSource:"",
    // inquiryType: "",
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required(t("validation.fullName.required"))
      .matches(/^[A-Za-z\s]*$/, t("validation.fullName.invalid"))
      .min(3, t("validation.fullName.min")),
    // lastName: Yup.string()
    //   .required(t("validation.lastName.required"))
    //   .matches(/^[A-Za-z\s]*$/, t("validation.lastName.invalid"))
    //   .min(3, t("validation.lastName.min")),
    email: Yup.string()
      .email(t("validation.email.invalid"))
      .required(t("validation.email.required")),
    mobile: Yup.string()
      .required(t("validation.mobile.required"))
      .test("is-valid-phone", t("validation.mobile.invalid"), (value) =>
        isValidPhoneNumber(value || "")
      ),
    message: Yup.string().required(t("validation.message.required")),
    // inquiryType: Yup.string().required(t("validation.inquiryType.required")),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          email: values.email,
          fullname: `${values.fullName}`,
          mobile: values.mobile,
          message: values.message,
              utmSource:values.utmSource,

          // inquiryType: values.inquiryType,
        })
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact-us-submissions`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseJson = await res.json();
      console.log("Success:", responseJson);

      if (res.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Backend error:", responseJson);
      }
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    initialValues,
    validationSchema,
    handleSubmit,
    isSubmitted,
    isLoading,
    t,
  };
};
