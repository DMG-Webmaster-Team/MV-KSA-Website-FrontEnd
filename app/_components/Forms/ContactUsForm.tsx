"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useTranslations } from "next-intl";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
import Done from "../SVGS/Done";
import ArrowLong from "../SVGS/ArrowLong";
import Arrow from "../SVGS/Arrow";

const ContactUsForm = ({ List }: { List: { Name: string }[] }) => {
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
    inquiryType: Yup.string().required(t("validation.inquiryType.required")),
  });

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    message: "",
    inquiryType: "",
  };
  const handleSubmit = async (values: typeof initialValues) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      // Append the data as a JSON string under `data`
      formData.append(
        "data",
        JSON.stringify({
          email: values.email,
          fullname: `${values.firstName} ${values.lastName}`,
          mobile: values.mobile,
          message: values.message,
          inquiryType: values.inquiryType,
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
              <div>
                <div className=" relative">
                  <Field
                    as="select"
                    name="inquiryType"
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none appearance-none ${
                      errors.inquiryType && touched.inquiryType
                        ? "border-red-500"
                        : "border-transparent"
                    } border`}
                  >
                    <option hidden className="opacity-70 ">
                      {t("form.select_inquiry_type")}
                    </option>
                    {List?.map((item, index) => (
                      <option key={index} value={item.Name}>
                        {item.Name}
                      </option>
                    ))}
                  </Field>
                  <span className=" text-primary w-6 h-6 absolute end-4 inset-y-0 m-auto">
                    <Arrow />
                  </span>
                </div>

                <ErrorMessage
                  name="inquiryType"
                  component="p"
                  className="text-red-500 text-xs pt-3"
                />
              </div>

              <div className="flex md:gap-5 gap-3 md:flex-row flex-col">
                <div className=" md:w-1/2">
                  <Field
                    name="firstName"
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none placeholder:text-primary placeholder:opacity-70 ${
                      errors.firstName && touched.firstName
                        ? "border-red-500"
                        : "border-transparent"
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
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none placeholder:text-primary placeholder:opacity-70 ${
                      errors.lastName && touched.lastName
                        ? "border-red-500"
                        : "border-transparent"
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
                  className={`input border  bg-gray  w-full md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none  placeholder:text-primary placeholder:opacity-70   ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-transparent"
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
                  className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none placeholder:text-primary placeholder:opacity-70 ${
                    errors.mobile && touched.mobile
                      ? "border-red-500"
                      : "border-transparent"
                  } border`}
                  placeholder={t("form.phone")}
                />

                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-500 text-xs pt-3"
                />
              </div>

              <div>
                <Field
                  name="message"
                  as="textarea"
                  className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none resize-none placeholder:text-primary placeholder:opacity-70 ${
                    errors.message && touched.message
                      ? "border-red-500"
                      : "border-transparent"
                  } border`}
                  rows={5}
                  placeholder={t("form.add_message")}
                />

                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-xs"
                />
              </div>

              <button
                type="submit"
                className={`${
                  isLoading ? " opacity-40 pointer-events-none" : ""
                } w-[51%] ms-auto flex justify-between bg-primary text-white uppercase py-3 px-4 hover:bg-darkblue transition-all duration-500 text-base rounded-sm`}
              >
                {t("Buttons.send_message")}
                <span className="w-5 h-5 ltr:rotate-180">
                  <ArrowLong />
                </span>
              </button>
            </Form>
          )}
        </Formik>
      ) : (
        <div className=" h-[400px] text-center content-center">
          <span className="w-6 h-6 block mx-auto">
            <Done />
          </span>
          <h3 className=" text-primary text-3xl my-5">
            {t("thanks.contactUs.title")}
          </h3>
          <p className=" text-primary text-xl">
            {t("thanks.contactUs.description")}
          </p>
        </div>
      )}
    </>
  );
};

export default ContactUsForm;
