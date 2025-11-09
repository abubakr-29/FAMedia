"use client";

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ContactForm() {
  const form = useRef<HTMLFormElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccess("");
    setError("");

    if (!form.current) {
      setError("Form not found. Please refresh and try again.");
      setIsLoading(false);
      return;
    }

    try {
      await emailjs.sendForm(
        "service_40s17kx",
        "template_tgkq7rg",
        form.current,
        { publicKey: "MM5GK3DJkVyEu12nu" }
      );

      setName("");
      setEmail("");
      setMessage("");
      setSuccess("✅ Message sent successfully!");
    } catch (err) {
      console.error("FAILED...", err);
      setError("❌ Failed to send message. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="space-y-6">
      <input type="hidden" name="date" value={new Date().toLocaleString()} />

      <input
        name="from_name"
        type="text"
        placeholder="Your Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-6 py-4 bg-stone-900/50 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-600/20 transition-all duration-300"
      />

      <input
        name="from_email"
        type="email"
        placeholder="Your Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-6 py-4 bg-stone-900/50 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-600/20 transition-all duration-300"
      />

      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full px-6 py-4 bg-stone-900/50 border border-stone-800 rounded-xl text-stone-200 placeholder-stone-500 focus:outline-none focus:border-stone-600 focus:ring-2 focus:ring-stone-600/20 transition-all duration-300 resize-none"
      />

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full px-8 py-4 rounded-xl font-medium text-white transition-all duration-300 cursor-pointer ${
          isLoading
            ? "bg-[#25602d]"
            : "bg-linear-to-r from-[#54d265] to-[#2d9f42] hover:from-[#40a24d] hover:to-[#1e782e]"
        }`}
      >
        {isLoading ? "Sending..." : "Send Message"}
      </button>

      {success && (
        <p className="text-green-400 transition-opacity duration-300">
          {success}
        </p>
      )}
      {error && (
        <p className="text-red-400 transition-opacity duration-300">{error}</p>
      )}
    </form>
  );
}
