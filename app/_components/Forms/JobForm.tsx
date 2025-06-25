"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
import Done from "../SVGS/Done";

const CareerForm = ({ Title }: { Title: string }) => {
  const t = useTranslations();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
    resume: null,
  };
  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append the file
      if (values.resume) {
        formData.append("files.cv", values.resume); // make sure your Strapi field is called "cv"
      }

      // Append the data as a JSON string under `data`
      formData.append(
        "data",
        JSON.stringify({
          email: values.email,
          fullname: `${values.firstName} ${values.lastName}`,
          mobile: values.mobile,
          message: values.message,
          careerTitle: Title,
        })
      );

      const res = await fetch(
        "https://mv-ksa.cloudhosta.com/api/careers-submissions",
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

  return (
    <>
      {!isSubmitted ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form className="flex flex-col md:gap-5 gap-3">
              <div className="flex md:gap-5 gap-3 md:flex-row flex-col">
                <div className=" md:w-1/2">
                  <Field
                    name="firstName"
                    className={`input w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-Gray04"
                    } border`}
                    placeholder={t("form.first_name")}
                  />
                  <ErrorMessage
                    name="firstName"
                    component="p"
                    className="text-red-500 text-xs pt-3"
                  />
                </div>

                <div className=" md:w-1/2">
                  <Field
                    name="lastName"
                    className={`input w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-Gray04"
                    } border`}
                    placeholder={t("form.last_name")}
                  />
                  <ErrorMessage
                    name="lastName"
                    component="p"
                    className="text-red-500 text-xs pt-3"
                  />
                </div>
              </div>

              <div>
                <Field
                  name="email"
                  type="email"
                  className={`input border border-Gray04 w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none     ${
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
              <div>
                <PhoneInput
                  value={values.mobile}
                  onChange={(value) => setFieldValue("mobile", value)}
                  defaultCountry="EG"
                  className={`input w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none ${
                    errors.mobile && touched.mobile
                      ? "border-red-500"
                      : "border-Gray04"
                  } border`}
                />

                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-500 text-xs pt-3"
                />
              </div>

              <div className="">
                <div
                  className={`relative w-full p-2 md:text-xl text-base rounded-sm outline-none flex items-center gap-6 border ${
                    errors.resume && touched.resume
                      ? "border-red-500"
                      : "border-Gray04"
                  }`}
                >
                  <div className="relative text-primary bg-[#E8E9E4] md:px-5 md:py-4 px-4 py-3 h-full whitespace-nowrap">
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

                  <div className=" text-Gray03">
                    {values.resume ? (
                      <span className=" md:text-base text-sm">
                        {(values.resume as File).name}
                      </span>
                    ) : (
                      <span className=" md:text-xl text-base">
                        {t("form.resume")}
                      </span>
                    )}
                  </div>
                </div>

                <ErrorMessage
                  name="resume"
                  component="p"
                  className="text-red-500 text-xs pt-2"
                />
              </div>

              <div>
                <Field
                  name="message"
                  as="textarea"
                  className={`input w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none resize-none ${
                    errors.message && touched.message
                      ? "border-red-500"
                      : "border-Gray04"
                  } border`}
                  rows={5}
                  placeholder={t("form.message")}
                />

                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-xs pt-3"
                />
              </div>

              <button
                type="submit"
                className={`${
                  isLoading ? " opacity-40 pointer-events-none" : ""
                } w-full bg-primary text-white uppercase md:py-6 py-3 hover:bg-darkblue transition-all duration-500 text-base`}
              >
                {t("Buttons.apply_now")}
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className=" h-[400px] text-center content-center">
          <span className="w-6 h-6 block mx-auto">
            <Done />
          </span>
          <h3 className=" text-primary text-3xl my-5">{t("thanks.jobs.title")}</h3>
          <p className=" text-primary text-xl">
            {t("thanks.jobs.description")}
          </p>
        </div>
      )}
    </>
  );
};

export default CareerForm;
