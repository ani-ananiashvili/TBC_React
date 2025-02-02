"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";
import "@fortawesome/fontawesome-free/css/all.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSubjectSelect = (subject: string) => {
    setFormData({ ...formData, subject });
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setError("All fields are required.");
      return;
    }

    setError("");

    emailjs
      .sendForm(
        "service_67qxef6",
        "template_3ovbn8b",
        e.target as HTMLFormElement,
        "bFmfHC1WpLnAttjqv"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccessMessage("Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          console.error(error.text);
          setError("There was an error sending your message.");
        }
      );
  };

  return (
    <div className="pt-28 max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold text-center text-gray-800">
        Contact Form
      </h1>
      <p className="mt-5 text-lg text-center text-gray-600">
        Please fill out the form below, and we will get back to you as soon as
        possible.
      </p>

      {error && <div className="text-red-600 mt-4">{error}</div>}
      {successMessage && (
        <div className="text-green-600 mt-4">{successMessage}</div>
      )}

      <form onSubmit={handleSubmit} className="mt-12 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
              <i className="fas fa-user"></i>
            </span>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 pl-10"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
              <i className="fas fa-envelope"></i>
            </span>
          </div>
        </div>

        <div className="relative">
          <div
            className="cursor-pointer p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            onClick={handleDropdownToggle}
          >
            <p className="text-gray-600">
              {formData.subject || "Choose Subject"}
            </p>
            <span className="absolute top-1/2 right-4 transform -translate-y-1/2">
              ↓
            </span>
          </div>

          {isDropdownOpen && (
            <div className="absolute bg-white border border-gray-300 rounded-md w-full mt-2 z-10">
              <div
                className="p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubjectSelect("Product Inquiry")}
              >
                Product Inquiry
              </div>
              <div
                className="p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubjectSelect("Support Request")}
              >
                Support Request
              </div>
              <div
                className="p-4 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSubjectSelect("General Inquiry")}
              >
                General Inquiry
              </div>
            </div>
          )}
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Your Message"
          className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          rows={6}
        ></textarea>

        <div className="flex justify-between">
          <button
            type="button"
            className="w-1/3 p-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            onClick={() =>
              setFormData({ name: "", email: "", subject: "", message: "" })
            }
          >
            Back to Home
          </button>

          <button
            type="submit"
            className="w-1/3 p-4 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition duration-200"
          >
            Submit Now
          </button>
        </div>
      </form>

      <hr className="my-12 border-t-2 border-gray-300" />

      <div className="flex justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">
            <i className="fas fa-envelope"></i>
          </span>
          <p className="text-gray-600">contact@example.com</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500">
            <i className="fas fa-map-marker-alt"></i>
          </span>
          <p className="text-gray-600">1234 Street Name, City, Country</p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-500">
            <i className="fas fa-phone-alt"></i>
          </span>
          <p className="text-gray-600">+123 456 7090</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
