"use client";

import React, { useState } from "react";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
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
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error.text);
          setError("There was an error sending your message.");
        }
      );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-gray-800">Contact Us</h1>
        <p className="mt-5 text-lg text-gray-600">Ph: +995 111 111 1111</p>
        <p className="mt-1 text-lg text-gray-600">Mon-Fri 10am-6pm PST</p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-medium text-gray-700">
            Product and Sales Inquiries
          </h3>
          <p className="text-lg text-blue-600 mt-2">tproject761@gmail.com</p>
        </div>
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-medium text-gray-700">
            After Purchase Support
          </h3>
          <p className="text-lg text-blue-600 mt-2">tproject761@gmail.com</p>
        </div>
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-medium text-gray-700">
            Retail Stockist Inquiries
          </h3>
          <p className="text-lg text-blue-600 mt-2">tproject761@gmail.com</p>
        </div>
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-medium text-gray-700">
            Marketing and Media Inquiries
          </h3>
          <p className="text-lg text-blue-600 mt-2">tproject761@gmail.com</p>
        </div>
        <div className="bg-white p-6 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
          <h3 className="text-xl font-medium text-gray-700">
            Trade Account Support
          </h3>
          <p className="text-lg text-blue-600 mt-2">tproject761@gmail.com</p>
        </div>
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-lg shadow-xl">
        <h3 className="text-2xl text-center font-semibold text-gray-800">
          General Inquiry Form
        </h3>

        {error && <div className="text-red-600 mt-4">{error}</div>}
        {successMessage && (
          <div className="text-green-600 mt-4">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            rows={6}
          ></textarea>
          <button
            type="submit"
            className="w-full p-4 bg-sky-700 text-white rounded-md hover:bg-sky-800 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
