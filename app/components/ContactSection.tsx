"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionTitle from "./SectionTitle";
import Section from "./Section";

const schema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters.")
    .max(80, "Full name must be at most 80 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email."),
  company: z
    .string()
    .trim()
    .max(120, "Company must be at most 120 characters.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Message must be at least 20 characters.")
    .max(2000, "Message must be at most 2000 characters."),
});

type ContactForm = z.infer<typeof schema>;

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactForm) => {
    console.log("Form submitted:", data);
    // do your submit work here
    reset(); // remove if you prefer to keep values after submit
  };

  return (
    <Section id="contact" className="h-auto">
      <SectionTitle name="Contact" isSticky />
      <div className="flex justify-center px-4 min-h-[calc(100vh-(3*var(--layout-size)))] md:max-h-[calc(100vh-(3*var(--layout-size)))]">
        <div className="w-full max-w-2xl">
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 h-full pt-4 pb-8 lg:border-x md:p-4 xl:p-8 xl:gap-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-lg font-medium mb-2"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  minLength={2}
                  maxLength={80}
                  aria-invalid={!!errors.fullName}
                  aria-describedby="fullName-error"
                  className={`w-full px-4 py-3 border ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:ring-2 focus:border-transparent bg-white text-gray-900 transition-colors`}
                  placeholder="Your full name"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p
                    id="fullName-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-lg font-medium mb-2"
                >
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={!!errors.email}
                  aria-describedby="email-error"
                  className={`w-full px-4 py-3 border ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  } focus:ring-2 focus:border-transparent bg-white text-gray-900 transition-colors`}
                  placeholder="your.email@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="mt-1 text-sm text-red-600"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="company"
                className="block text-lg font-medium mb-2"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                autoComplete="organization"
                maxLength={120}
                aria-invalid={!!errors.company}
                aria-describedby="company-error"
                className={`w-full px-4 py-3 border ${
                  errors.company
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent bg-white text-gray-900 transition-colors`}
                placeholder="Your company (optional)"
                {...register("company")}
              />
              {errors.company && (
                <p
                  id="company-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.company.message}
                </p>
              )}
            </div>

            <div className="flex-1 flex flex-col">
              <label
                htmlFor="message"
                className="block text-lg font-medium mb-2"
              >
                Message *
              </label>
              <textarea
                id="message"
                rows={6}
                minLength={20}
                maxLength={2000}
                autoComplete="off"
                aria-invalid={!!errors.message}
                aria-describedby="message-error"
                className={`w-full flex-1 px-4 py-3 border ${
                  errors.message
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                } focus:ring-2 focus:border-transparent bg-white text-gray-900 transition-colors`}
                placeholder="Tell me about your project or how I can help you..."
                {...register("message")}
              />
              {errors.message && (
                <p
                  id="message-error"
                  role="alert"
                  className="mt-1 text-sm text-red-600"
                >
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="mt-auto text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 lg:px-8 lg:py-3 lg:text-xl bg-gray-900 rounded-4xl hover:bg-purple-950 text-white font-medium transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                {isSubmitting
                  ? "Sending..."
                  : isSubmitSuccessful
                    ? "Sent"
                    : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
