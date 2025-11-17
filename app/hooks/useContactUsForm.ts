"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import * as Yup from "yup";
import { isValidPhoneNumber } from "react-phone-number-input";

export const useContactUsForm = () => {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [utmSource, setUtmSource] = useState("general");
  const [projectName, setProjectName] = useState("general");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get("utm_source");
    if (source) {
      setUtmSource(source);
    }
    const project = urlParams.get("projectname");
    if (project) {
      setProjectName(project);
    }
  }, [searchParams]);
  const initialValues = {
    fullName: "",
    email: "",
    mobile: "",
    message: "",
    utmSource: utmSource,
    projectName: projectName,
    city: "",
    budget: "",
  };
  // Modify the sendToZapier function to return false on error instead of throwing
  const sendToZapier = async (formData: {
    fullname: string;
    mobile: string;
    email: string;
    message: string;
    city?: string;
    budget?: string;
    utmSource?: string;
    projectName?: string;
  }) => {
    try {
      const zapierUrl = `https://hooks.zapier.com/hooks/catch/2694313/urwjmjp/?fullname=${encodeURIComponent(
        formData.fullname
      )}&mobile=${encodeURIComponent(
        formData.mobile
      )}&email=${encodeURIComponent(
        formData.email
      )}&message=${encodeURIComponent(formData.message)}${
        formData.city ? `&city=${encodeURIComponent(formData.city)}` : ""
      }${
        formData.budget ? `&budget=${encodeURIComponent(formData.budget)}` : ""
      }${
        formData.utmSource
          ? `&source=${encodeURIComponent(formData.utmSource)}`
          : ""
      }${
        formData.projectName
          ? `&projectname=${encodeURIComponent(formData.projectName)}`
          : ""
      }`;

      const response = await fetch(zapierUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to send data to Zapier");
      }

      return true;
    } catch (error) {
      console.error("Error sending data to Zapier:", error);
      return false; // Return false instead of throwing error
    }
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
    // message: Yup.string().required(t("validation.message.required")),
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
          utmSource: values.utmSource,
          city: values.city,
          budget: values.budget,
          projectname: projectName,
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
      try {
        const zapierResult = await sendToZapier({
          fullname: values.fullName,
          mobile: values.mobile,
          email: values.email,
          message: values.message,
          city: values.city,
          budget: values.budget,
          utmSource: values.utmSource,
          projectName: values.projectName,
        });

        if (!zapierResult) {
          console.log(
            "Zapier integration failed, but continuing with form submission"
          );
        }
      } catch (zapierError) {
        // Catch any unexpected errors from Zapier call here
        console.error("Zapier integration error:", zapierError);
        // Continue with form submission even if Zapier fails
      }

      // Continue regardless of Zapier success/failure
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
