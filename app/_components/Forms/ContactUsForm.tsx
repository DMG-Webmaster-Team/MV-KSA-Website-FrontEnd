"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Done from "../SVGS/Done";
import ArrowLong from "../SVGS/ArrowLong";
// import Arrow from "../SVGS/Arrow";
import { useContactUsForm } from "@/app/hooks/useContactUsForm";
import Arrow from "../SVGS/Arrow";

const ContactUsForm = ({
  List,
  budget,
}: {
  List: { Name: string }[];
  budget: { Name: string }[];
}) => {
  const {
    initialValues,
    validationSchema,
    handleSubmit,
    isSubmitted,
    isLoading,
    t,
  } = useContactUsForm();

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
                <div className="relative pb-1 md:w-full">
                  <Field
                    name="fullName"
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none placeholder:text-primary placeholder:opacity-70 ${
                      errors.fullName && touched.fullName
                        ? ""
                        : "border-transparent"
                    } border`}
                    placeholder={t("form.first_name")}
                  />
                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                  />
                </div>

                {/* <div className=" md:w-1/2">
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
                </div> */}
              </div>

              <div className="relative pb-1">
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
                  className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                />
              </div>
              <div className="relative pb-1">
                <PhoneInput
                  value={values.mobile}
                  onChange={(value) => setFieldValue("mobile", value)}
                  defaultCountry="SA"
                  placeholder={t("form.phone")}
                  className={`rtl:flex-row-reverse gap-3 input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none ${
                    errors.mobile && touched.mobile
                      ? "border-red-500"
                      : "border-transparent"
                  } border`}
                  inputClassName={`w-full bg-transparent outline-none placeholder:opacity-70 placeholder:text-primary 
    ${
      document.dir === "rtl"
        ? "text-right placeholder:text-right"
        : "text-left placeholder:text-left"
    }`}
                />

                <ErrorMessage
                  name="mobile"
                  component="p"
                  className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                />
              </div>
              <div>
                <div className="relative pb-1">
                  <Field
                    as="select"
                    name="city"
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none appearance-none ${
                      errors.city && touched.city
                        ? "border-red-500"
                        : "border-transparent"
                    } border`}
                  >
                    <option hidden className="opacity-70 ">
                      {t("form.city")}
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
                  name="city"
                  component="p"
                  className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                />
              </div>

              <div>
                <div className="relative pb-1">
                  <Field
                    as="select"
                    name="budget"
                    className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none appearance-none ${
                      errors.budget && touched.budget
                        ? "border-red-500"
                        : "border-transparent"
                    } border`}
                  >
                    <option hidden className="opacity-70 ">
                      {t("form.budget")}
                    </option>
                    {budget?.map((item, index) => (
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
                  name="budget"
                  component="p"
                  className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                />
              </div>

              <div className="relative pb-1">
                <Field
                  name="message"
                  as="textarea"
                  className={`input w-full bg-gray text-primary md:px-5 md:py-4 px-4 py-3 md:text-xl text-base rounded-sm outline-none resize-none placeholder:text-primary placeholder:opacity-70 ${
                    errors.message && touched.message
                      ? "border-red-500"
                      : "border-transparent"
                  } border`}
                  rows={5}
                  placeholder=""
                />

                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-xs pt-2 h-0 absolute bottom-0"
                />
              </div>

              <button
                type="submit"
                className={`${
                  isLoading ? " opacity-40 pointer-events-none" : ""
                } w-[51%] ms-auto flex items-center my-auto justify-between bg-primary text-white uppercase py-3 px-4 hover:bg-darkblue transition-all duration-500 text-base rounded-sm text-nowrap`}
              >
                إرسال
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
