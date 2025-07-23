"use client";

import SectionTitle from "./SectionTitle";
import Section from "./Section";
import GridSection from "./GridSection";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your email service integration here
  };

  return (
    <Section id="contact">
      <SectionTitle name="Contact" isSticky />
      <GridSection>
        {/* Header Section - spans across multiple columns */}
        <div className="col-span-4 row-span-2 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-5 mt-4">
          <p className="font-light text-lg">
            Let&apos;s work together! Drop me a message and I&apos;ll get back
            to you as soon as possible.
          </p>
        </div>

        {/* Form Container - spans across multiple columns */}
        <div className="col-span-4 row-span-8 md:col-span-6 md:col-start-2 lg:col-span-8 lg:col-start-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email - side by side on larger screens */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-lg font-medium mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Company - full width */}
            <div>
              <label
                htmlFor="company"
                className="block text-lg font-medium mb-2"
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors"
                placeholder="Your company (optional)"
              />
            </div>

            {/* Message - full width */}
            <div>
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 transition-colors resize-vertical"
                placeholder="Tell me about your project or how I can help you..."
              />
            </div>

            {/* Submit Button - centered */}
            <div className="text-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gray-800 rounded-4xl hover:bg-purple-950 text-white font-medium  transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </GridSection>
    </Section>
  );
}
