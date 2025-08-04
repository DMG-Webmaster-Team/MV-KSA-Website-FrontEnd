"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export interface CareerFormValues {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message: string;
  resume: File | null;
}

export function useCareerForm(title: string) {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: CareerFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
    resume: null,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t("validation.firstName.required"))
      .matches(/^[A-Za-z\s]*$/, t("validation.firstName.invalid"))
      .min(3, t("validation.firstName.min")),
    lastName: Yup.string()
      .required(t("validation.lastName.required"))
      .matches(/^[A-Za-z\s]*$/, t("validation.lastName.invalid"))
      .min(3, t("validation.lastName.min")),
    email: Yup.string()
      .email(t("validation.email.invalid"))
      .required(t("validation.email.required")),
    mobile: Yup.string()
      .required(t("validation.mobile.required"))
      .test("is-valid-phone", t("validation.mobile.invalid"), (value) =>
        isValidPhoneNumber(value || "")
      ),
    message: Yup.string().required(t("validation.message.required")),
    resume: Yup.mixed().required(t("validation.resume.required")),
  });

  const handleSubmit = async (values: CareerFormValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      if (values.resume) {
        formData.append("files.cv", values.resume);
      }

      formData.append(
        "data",
        JSON.stringify({
          email: values.email,
          fullname: `${values.firstName} ${values.lastName}`,
          mobile: values.mobile,
          message: values.message,
          careerTitle: title,
        })
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/careers-submissions`,
        {
          method: "POST",
          body: formData,
        }
      );

      const responseJson = await res.json();

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
    t,
    initialValues,
    validationSchema,
    handleSubmit,
    isLoading,
    isSubmitted,
  };
}
