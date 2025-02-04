"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import "@fortawesome/fontawesome-free/css/all.css";
import Link from "next/link";
import { useLanguageContext } from "../../../context/LanguageContext";

const ContactPage = () => {
  const { language } = useLanguageContext();
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.from_name || !formData.from_email || !formData.message) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!emailRegex.test(formData.from_email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    emailjs
      .send(
        "service_4do7gsd",
        "template_97zzbon",
        formData,
        "UCXOWw5NNPysJ5bFa"
      )
      .then(
        () => {
          setSuccessMessage("Message sent successfully!");
          setFormData({
            from_name: "",
            from_email: "",
            subject: "",
            message: "",
          });
        },
        () => {
          setError("There was an error sending your message.");
        }
      );
  };

  return (
    <div className="pt-28 pb-16 bg-gradient-to-r from-[#f5f7fa] to-[#e4ebf5] dark:bg-dark-gradient dark:text-white">
      {error && <div className="text-red-600 mt-4">{error}</div>}
      {successMessage && (
        <div className="text-center mb-2 text-green-600 mt-4">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white dark:bg-dark-gradient p-8 rounded-lg shadow-md max-w-xl mx-auto"
      >
        <h2 className="text-3xl text-center font-semibold text-[#4a628a] mb-6">
          {language === "ka" ? "კონტაქტის ფორმა" : "Contact Form"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="from_name"
              value={formData.from_name}
              onChange={handleInputChange}
              placeholder={language === "ka" ? "თქვენი სახელი" : "Your Name"}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pl-10 dark:bg-dark-gradient dark:border-gray-600 dark:text-white"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
              <i className="fas fa-user"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="email"
              name="from_email"
              value={formData.from_email}
              onChange={handleInputChange}
              placeholder={language === "ka" ? "თქვენი ელ.ფოსტა" : "Your Email"}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pl-10 dark:bg-dark-gradient dark:border-gray-600 dark:text-white"
              required
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className="relative">
          <select
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none dark:bg-neutral-900 dark:border-gray-600 dark:text-white"
          >
            <option value="">
              {language === "ka" ? "გთხოვთ აირჩიოთ თემა" : "Select a Subject"}
            </option>
            <option value="Product Inquiry">
              {language === "ka"
                ? "პროდუქტთან დაკავშირებით"
                : "Product Inquiry"}
            </option>
            <option value="Support Request">
              {language === "ka" ? "დახმარება" : "Support Request"}
            </option>
            <option value="Feedback">
              {language === "ka" ? "უკუკავშირი" : "Feedback"}
            </option>
            <option value="Other">
              {language === "ka" ? "სხვა" : "Other"}
            </option>
          </select>
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder={language === "ka" ? "თქვენი მესიჯი" : "Your Message"}
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 dark:bg-dark-gradient dark:border-gray-600 dark:text-white"
          rows={6}
          required
        ></textarea>

        <div className="flex justify-between gap-4 mt-8">
          <Link
            href="/"
            className="w-full p-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200 text-center dark:bg-dark-gradient dark:text-white dark:hover:bg-gray-600"
          >
            {language === "ka" ? "მთავარ გვერდზე დაბრუნება" : "Back to Home"}
          </Link>

          <button
            type="submit"
            className="w-full p-3 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition duration-200 text-center dark:bg-sky-800 dark:hover:bg-sky-700"
          >
            {language === "ka" ? "გაგზავნა" : "Submit Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
