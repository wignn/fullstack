"use client";
import { useState } from "react";

export default function Contact() {
  const [fromName, setFromName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    try {
      const response = await fetch("/api/userMail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromName, fromEmail, subject, message }),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus("Email sent successfully!");
        setFromName("");
        setFromEmail("");
        setSubject("");
        setMessage("");
      } else {
        setStatus("Failed to send email.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("Failed to send email.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

        <div className="bg-gray-800 p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={fromName}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400"
                placeholder="Your Name"
                onChange={(e) => setFromName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={fromEmail}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400"
                placeholder="Your Email"
                onChange={(e) => setFromEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400"
                placeholder="Your Email"
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                value={message}
                className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md placeholder-gray-400"
                placeholder="Your Message"
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition ${
                isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSending}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
            {status && <p className="mt-4 text-center">{status}</p>}
          </form>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-gray-400">
            Feel free to reach out to us through email or phone.
          </p>
          <p className="text-gray-400 mt-2">
            Email:{" "}
            <a href="mailto:contact@example.com" className="text-blue-500">
              contact@example.com
            </a>
          </p>
          <p className="text-gray-400 mt-1">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-500">
              +1 234 567 890
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
