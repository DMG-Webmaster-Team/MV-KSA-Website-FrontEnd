"use client";
import axios from "axios";
import { useFormik } from "formik";
import { useLocale } from "next-intl";
import { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
const ContactUsForm = ({
  Types,
  Title,
}: {
  Types: { Type: string }[];
  Title: string;
}) => {
  const locale = useLocale();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const refreshPage = () => {
    window.location.reload();
  };

  const validationSchema = Yup.object().shape({
    inquiryType: Yup.string().required(
      `${locale == "ar" ? "حقل مطلوب" : "Required Field"}`
    ),
    firstname: Yup.string()
      .required(
        `${locale == "ar" ? "الاسم الأول مطلوب" : "First name required"} `
      )
      .matches(
        /^[A-Za-z\s]*$/,
        `${
          locale == "ar"
            ? "قيمة غير صالحة: لا يُسمح باستخدام الأرقام والرموز."
            : "Invalid value: numbers and symbols are not allowed"
        }`
      )
      .min(
        3,
        `${
          locale == "ar"
            ? "يجب ألا يقل الاسم الأول عن 3 أحرف."
            : "First name should be at least 3 characters."
        } `
      ),
    lastname: Yup.string()
      .required(
        `${locale == "ar" ? "اسم العائلة مطلوب." : "Last name required"} `
      )
      .matches(
        /^[A-Za-z\s]*$/,
        `${
          locale == "ar"
            ? "قيمة غير صالحة: لا يُسمح باستخدام الأرقام والرموز."
            : "Invalid value: numbers and symbols are not allowed"
        } `
      )
      .min(
        3,
        `${
          locale == "ar"
            ? "يجب ألا يقل اسم العائلة عن 3 أحرف."
            : "First name should be at least 3 characters."
        } `
      ),
    email: Yup.string()
      .email(
        `${
          locale == "ar"
            ? "عنوان البريد الإلكتروني غير صحيح"
            : " Invalid Email Address`"
        }`
      )
      .required(`${locale == "ar" ? "حقل مطلوب" : "Required Field"}`),
    mobile: Yup.string()
      .required(`${locale == "ar" ? "حقل مطلوب" : "Required Field"}`)
      .test(
        "is-valid-phone",
        `${
          locale == "ar"
            ? "صيغة رقم الهاتف المحمول غير صحيحة."
            : "Invalid mobile number format"
        } `,
        (value) => isValidPhoneNumber(value || "")
      ),

    message: Yup.string().required(
      `${locale == "ar" ? "حقل مطلوب" : "Required Field"}`
    ),
    terms: Yup.boolean().oneOf(
      [true],
      `${
        locale == "ar"
          ? "يجب عليك قبول الشروط والأحكام."
          : "You must accept the Terms and Conditions"
      } `
    ),
  });

  const formik = useFormik({
    initialValues: {
      inquiryType: "",
      firstName: "",
      lastname: "",
      email: "",
      mobile: "",
      message: ""
    },
    validationSchema,
    validateOnChange: false, // Disables validation on change
    validateOnBlur: false, // Disables validation on blur
    onSubmit: async (values) => {
      // setIsLoading(true);
      // try {
      //   const requests = [
      //     axios.post(`${APIlink}/api/contact-us-entries`, {
      //       data: {
      //         InquiryType: values.inquiryType,
      //         FirstName: values.firstName,
      //         LastName: values.lastname,
      //         EmailAddress: values.email,
      //         MobileNumber: values.mobile,
      //         Message: values.message,
      //       },
      //     }),
      //     axios.post(`${APIlink}/api/createsendlist`, {
      //       email: values.email,
      //       firstname: values.firstName,
      //       lastname: values.lastname,
      //       customFields: [
      //         { Key: "MobileNumber", Value: values.mobile },
      //         { Key: "Message", Value: values.message },
      //         { Key: "InquiryType", Value: values.inquiryType },
      //       ],
      //     }),
      //   ];

      //   const results = await Promise.allSettled(requests);

      //   results.forEach((result, index) => {
      //     if (result.status === "rejected") {
      //       console.error(`API call ${index + 1} failed:`, result.reason);
      //     }
      //   });

      //   setIsSubmitted(true);
      // } catch (error) {
      //   console.error("Unexpected error submitting form:", error);
      // } finally {
      //   setIsLoading(false);
      // }
    },
  });
  return (
    <div>
      {!isSubmitted ? (
        <div>
          <h1 className=" lg:text-[88px] md:text-[60px] text-[48px]  font-bold mb-10">
            {Title}
          </h1>
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-10">
            <div className=" flex flex-col gap-3">
              <div>
                <div
                  className={`  relative flex border p-3 rounded md:text-base text-sm ${
                    formik.errors.inquiryType
                      ? "border-[#FF0000]"
                      : "border-transparent"
                  } focus-visible:outline-none bg-grey`}
                >
                  <select
                    className={`${
                      formik.values.inquiryType ? "" : "text-gray-400"
                    }  bg-transparent w-full appearance-none focus-visible:outline-none `}
                    name="inquiryType"
                    value={formik.values.inquiryType}
                    onChange={formik.handleChange}
                  >
                    <option disabled hidden value="">
                      {locale == "en" ? "Inquiry Type" : "نوع الاستفسار"}
                    </option>
                    {Types.map((item, index) => (
                      <option key={index} value={item.Type}>
                        {item.Type}
                      </option>
                    ))}
                  </select>
                  <span className=" absolute end-[6px]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17.0002 8.59L18.4102 10L12.4102 16L6.41016 10L7.82016 8.59L12.4102 13.17L17.0002 8.59Z"
                        fill="#222222"
                      />
                    </svg>
                  </span>
                </div>
                {formik.errors.inquiryType && (
                  <p className="text-red-500 md:text-sm text-xs pt-1">
                    {formik.errors.inquiryType}
                  </p>
                )}
              </div>

              <div className="flex gap-3 md:flex-row flex-col">
                <div className="md:w-1/2">
                  <input
                    type="text"
                    name="firstName"
                    placeholder={`${
                      locale == "en" ? "First Name" : "الاسم الأول"
                    }*`}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className={` w-full md:text-base text-sm focus-visible:outline-none border p-3 rounded  ${
                      formik.errors.firstName
                        ? "border-[#FF0000]"
                        : "border-transparent"
                    } bg-grey`}
                  />
                  {formik.errors.firstName && (
                    <p className="text-red-500 md:text-sm text-xs pt-1">
                      {formik.errors.firstName}
                    </p>
                  )}
                </div>
                <div className="md:w-1/2">
                  <input
                    type="text"
                    name="lastname"
                    placeholder={`${
                      locale == "en" ? "Last Name" : "اسم العائلة"
                    }*`}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    className={` w-full md:text-base text-sm focus-visible:outline-none border p-3 rounded ${
                      formik.errors.lastname
                        ? "border-[#FF0000]"
                        : "border-transparent"
                    } bg-grey`}
                  />
                  {formik.errors.lastname && (
                    <p className="text-red-500 md:text-sm text-xs pt-1">
                      {formik.errors.lastname}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder={`${
                    locale == "en" ? "Email Address" : " البريد الإلكتروني"
                  }*`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className={`md:text-base text-sm focus-visible:outline-none border p-3 rounded w-full ${
                    formik.errors.email
                      ? "border-[#FF0000]"
                      : "border-transparent"
                  } bg-grey`}
                />
                {formik.errors.email && (
                  <p className="text-red-500 md:text-sm text-xs pt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              <div>
                <PhoneInput
                  value={formik.values.mobile}
                  onChange={(value) => formik.setFieldValue("mobile", value)}
                  international
                  defaultCountry="EG"
                  className={`border ${
                    formik.errors.mobile
                      ? "border-red-500"
                      : "border-transparent"
                  } w-full p-3 rounded-lg bg-grey md:text-base text-sm`}
                />

                {/* <input type="text" name="mobile" placeholder="Phone Number" value={formik.values.mobile} onChange={formik.handleChange} className={` appearance-none  focus-visible:outline-none border p-3 rounded ${formik.errors.mobile ? "border-[#FF0000]" : "border-transparent"} bg-grey`} /> */}
                {formik.errors.mobile && (
                  <p className="text-red-500 md:text-sm text-xs pt-1">
                    {formik.errors.mobile}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="message"
                  placeholder={`${locale == "en" ? "Your Message" : "رسالتك"}*`}
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  className={`${
                    formik.errors.message
                      ? "border-[#FF0000]"
                      : "border-transparent"
                  } w-full md:text-base text-sm focus-visible:outline-none bg-grey border p-3 rounded resize-none`}
                  rows={7}
                ></textarea>
                {formik.errors.message && (
                  <p className="text-red-500 md:text-sm text-xs">
                    {formik.errors.message}
                  </p>
                )}
              </div>
            </div>
            <button
              type="submit"
              id="submit_askforquote"
              className={`  bg-gold hover:bg-hovergold transition w-fit text-white md:text-base text-sm flex items-center gap-1 rounded-full md:py-4 py-3 md:px-5 px-4 
                        ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {locale == "en" ? " Send message" : "إرسال رسالة"}
              <span
                className={`${
                  locale == "ar" ? " rotate-180" : ""
                } md:w-5 md:h-5 w-4 h-4`}
              >
              </span>
            </button>
          </form>
        </div>
      ) : (
        <div className=" flex flex-col gap-10">
          <div className="w-[84px] h-[59px]">
            <svg
              className="w-full h-full"
              viewBox="0 0 84 59"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M83.7728 6.24227L32.6335 56.8789C30.9786 58.5176 28.3017 58.4816 26.6915 56.799L0.439453 29.3665L5.6694 24.1L29.7608 49.2746L78.6829 0.833252L83.7728 6.24227Z"
                fill="#581111"
              />
            </svg>
          </div>
          <div>
            <h2 className="lg:text-[88px] md:text-[60px] text-[48px]  font-bold">
              {" "}
              {locale == "en" ? "Thank you!" : "شكرًا لك!"}
            </h2>
            <p className=" text-xl font-semibold">
              {locale == "en"
                ? "Your message has been sent and we’ll get in touch with you as soon as possible."
                : "لقد تم إرسال رسالتك وسنتواصل معك في أقرب وقت ممكن."}
            </p>
          </div>

          <button
            onClick={refreshPage}
            className=" bg-gold hover:bg-hovergold transition w-fit text-white font-base flex items-center gap-1 rounded-full py-4 px-5"
          >
            Send another message
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactUsForm;
