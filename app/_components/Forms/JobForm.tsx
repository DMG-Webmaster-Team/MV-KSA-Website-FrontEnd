"use client";
import { error } from "console";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";

const CareerForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .required(locale === "ar" ? "الاسم الأول مطلوب" : "First name required")
      .matches(
        /^[A-Za-z\s]*$/,
        locale === "ar"
          ? "قيمة غير صالحة: لا يُسمح باستخدام الأرقام والرموز."
          : "Invalid value: numbers and symbols are not allowed"
      )
      .min(
        3,
        locale === "ar"
          ? "يجب ألا يقل الاسم الأول عن 3 أحرف."
          : "First name should be at least 3 characters."
      ),
    lastname: Yup.string()
      .required(locale === "ar" ? "اسم العائلة مطلوب" : "Last name required")
      .matches(
        /^[A-Za-z\s]*$/,
        locale === "ar"
          ? "قيمة غير صالحة: لا يُسمح باستخدام الأرقام والرموز."
          : "Invalid value: numbers and symbols are not allowed"
      )
      .min(
        3,
        locale === "ar"
          ? "يجب ألا يقل اسم العائلة عن 3 أحرف."
          : "Last name should be at least 3 characters."
      ),
    email: Yup.string()
      .email(
        locale === "ar"
          ? "عنوان البريد الإلكتروني غير صحيح"
          : "Invalid email address"
      )
      .required(locale === "ar" ? "حقل مطلوب" : "Required Field"),
    mobile: Yup.string()
      .required(locale === "ar" ? "حقل مطلوب" : "Required Field")
      .test(
        "is-valid-phone",
        locale === "ar"
          ? "صيغة رقم الهاتف المحمول غير صحيحة."
          : "Invalid mobile number format",
        (value) => isValidPhoneNumber(value || "")
      ),
    message: Yup.string().required(
      locale === "ar" ? "حقل مطلوب" : "Required Field"
    ),
    resume: Yup.mixed().required(
      locale === "ar" ? "السيرة الذاتية مطلوبة" : "Resume is required"
    ),
  });

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    message: "",
    resume: null,
  };

  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullname", `${values.firstname} ${values.lastname}`);
    formData.append("email", values.email);
    formData.append("mobile", values.mobile);
    formData.append("message", values.message);
    if (values?.resume) {
        formData.append("cv", values.resume); // already casted, or cast as File
      }
    try {
      // Post to backend
      await fetch("/api/submit-career-form", {
        method: "POST",
        body: formData,
      });

      setIsSubmitted(true);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}
    >
      {({ setFieldValue, values, errors, touched }) => (
        <Form className="space-y-5">
          {/* First Name */}
          <div className="flex gap-5">
            <div className=" w-1/2">
              <Field
                name="firstname"
                className="input border border-Gray04 w-full px-5 py-4 text-xl rounded-sm outline-none"
                placeholder={t("form.first_name")}
              />
              <ErrorMessage
                name="firstname"
                component="p"
                className="text-red-500 text-xs pt-3"
              />
            </div>

            {/* Last Name */}
            <div className=" w-1/2">
              <Field
                name="lastname"
                className="input border border-Gray04 w-full px-5 py-4 text-xl rounded-sm outline-none"
                placeholder={t("form.last_name")}
              />
              <ErrorMessage
                name="lastname"
                component="p"
                className="text-red-500 text-xs pt-3"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Field
              name="email"
              type="email"
              className={`input border border-Gray04 w-full px-5 py-4 text-xl rounded-sm outline-none     ${
                errors.email && touched.email
                  ? "border-red-500"
                  : "border-Gray04"
              }`}
              placeholder={t("form.email")}
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-xs pt-3"
            />
          </div>
          {/* Phone */}
          <div>
            <PhoneInput
              value={values.mobile}
              onChange={(value) => setFieldValue("mobile", value)}
              defaultCountry="EG"
              className="input border border-Gray04 w-full px-5 py-4 text-xl rounded-sm outline-none"
              placeholder={t("form.phone")}
            />
            <ErrorMessage
              name="mobile"
              component="p"
              className="text-red-500 text-xs pt-3"
            />
          </div>

          {/* Resume */}
          <div className="">
            <div className="relative border border-Gray04 w-full p-2 text-xl rounded-sm outline-none  flex items-center gap-6">
              <div className="relative text-primary bg-[#E8E9E4] px-5 py-3 h-full">
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(event) => {
                    setFieldValue("resume", event.currentTarget.files?.[0]);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {t("form.select_file")}
              </div>

              <div className=" text-xl text-Gray03">
                {values.resume ? (
                  <span className="">
                    {(values.resume as File).name}
                  </span>
                ) : (
                  <span className="">{t("form.resume")}</span>
                )}
              </div>
            </div>

            <ErrorMessage
              name="resume"
              component="p"
              className="text-red-500 text-xs pt-2"
            />
          </div>

          {/* Message */}
          <div>
            <label>{t("form.message")}</label>
            <Field name="message" as="textarea" className="input" />
            <ErrorMessage
              name="message"
              component="p"
              className="text-red-500 text-xs pt-3"
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary">
            {isLoading ? t("form.applying") : t("buttons.apply")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CareerForm;
