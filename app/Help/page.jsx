"use client";
import React, { useState } from "react";
import { HelpCircle, Mail, MessageSquare, Info } from "lucide-react";

export default function HelpPage() {
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 min-h-screen">
      {showMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            Message sent successfully!
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto py-8 px-4 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-100 mb-8 flex items-center gap-3">
          <HelpCircle className="w-8 h-8 text-indigo-500" />
          Help & Support
        </h1>

        <section className="bg-[#1e1e1e] rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-indigo-500" />
            Frequently Asked Questions (FAQ)
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-indigo-400">
                How can I reset my password?
              </h3>
              <p className="text-gray-300 mt-1">
                Go to the Settings page, navigate to the “Account” section, and update your password in the password field.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-400">
                Why am I not receiving email notifications?
              </h3>
              <p className="text-gray-300 mt-1">
                Make sure email alerts are enabled in your Notification settings. Also, check your spam folder.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-indigo-400">
                Can I change my subscription plan?
              </h3>
              <p className="text-gray-300 mt-1">
                Yes, you can upgrade or downgrade your plan from the Billing section under Settings.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[#1e1e1e] rounded-2xl p-6 shadow-md mb-8">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-indigo-500" />
            Contact Support
          </h2>
          <p className="text-gray-300 mb-4">
            If you still need help, reach out to our support team. We’re here to assist you anytime!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Your Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-[#2a2a2a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2">Message</label>
              <textarea
                rows="4"
                placeholder="Describe your issue..."
                className="w-full border border-gray-700 rounded-lg px-3 py-2 bg-[#2a2a2a] text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Send Message
            </button>
          </form>
        </section>

        <section className="bg-[#1e1e1e] rounded-2xl p-6 shadow-md text-gray-300">
          <h2 className="text-2xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-500" />
            Quick Contact
          </h2>
          <p>If you prefer direct contact, email us at:</p>
          <p className="text-indigo-400 mt-1">support@example.com</p>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
