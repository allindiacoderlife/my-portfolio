"use client";
import { poiret_one } from "@/lib/fonts";
import PlaceholderTextAnimation from "./ui/PlaceholderTextAnimation";
import { contacts } from "@/lib/utils";
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";
import { FancyButtonAlt } from "@/components/ui/FancyButton";
import { CiMail } from "react-icons/ci";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Email sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send email: " + data.error);
      }
    } catch (error) {
      alert("Something went wrong: " + error.message);
    }

    setIsLoading(false);
  };

  return (
    <div
      id="contact"
      className="relative min-h-[100vh] flex flex-col items-center px-4 py-10 pb-4"
    >
      <span
        className={`${poiret_one.className} mt-[80px] text-2xl text-gray-300`}
      >
        AllindiaCoder
      </span>

      <div className="flex flex-col items-center justify-center gap-12 md:px-20 lg:px-[200px] mt-[30px] md:tracking-wide">
        <div className="flex flex-col gap-2 md:gap-3 items-center text-center text-3xl md:text-5xl lg:text-5xl font-medium">
          Ready to make your
          <div className="flex items-center">
            <PlaceholderTextAnimation
              texts={["brand", "service", "business", "product"]}
            />
            <span className="flex whitespace-nowrap">
              &nbsp;appearance&nbsp;
              <span className="hidden md:flex">in the</span>
            </span>
          </div>
          <div>
            <span className="md:hidden">in the&nbsp;</span>
            <span className="relative mt-3 before:absolute before:h-[20px] before:w-full before:border-t before:top-[120%] before:rotate-[-8deg] before:rounded-[100%]">
              digital world?
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center max-w-md p-5 mx-auto border border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm my-20">
        <div className="flex flex-col items-start w-full gap-5 mb-10">
          <h2 className="text-heading">Let's Talk</h2>
          <p className="font-normal text-neutral-400">
            Whether you're loking to build a new website, improve your existing
            platform, or bring a unique project to life, I'm here to help
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="name" className="feild-label">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="field-input field-input-focus"
              placeholder="John Doe"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="feild-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="field-input field-input-focus"
              placeholder="JohnDoe@email.com"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-5">
            <label htmlFor="message" className="feild-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              type="text"
              rows="4"
              className="field-input field-input-focus"
              placeholder="Share your thoughts..."
              autoComplete="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="justify-center flex mt-5">
            <FancyButtonAlt title={!isLoading ? "Send" : "Sending..."} icon={<CiMail />} />
          </div>
        </form>
      </div>

      <div className="w-screen mt-auto flex flex-col items-center justify-around">
        <div className="flex flex-wrap gap-5 md:gap-8 justify-around content-center">
          {contacts.map((contact) => {
            let cn =
              contact.name == "Mail" || contact.name == "Fiverr"
                ? "hidden md:flex"
                : "flex";
            return (
              <Link
                key={contact.name}
                href={contact.link}
                target="_blank"
                className={`group ${cn} items-center cursor-pointer opacity-40 hover:opacity-100`}
              >
                <span className="">{contact.name}</span>
                <BsArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 group-hover:-translate-y-1 group-hover:-rotate-[35deg] transition-all" />
              </Link>
            );
          })}
        </div>
      </div>

      <footer
        className={`${poiret_one.className} mt-10 w-full flex justify-center gap-2 opacity-[70%]`}
      >
        &copy;<span>2025 Chirag. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Contact;
