"use client";
import React, { useState } from "react";
import { User, Shield, Bell, CreditCard } from "lucide-react";

export default function SettingsPage() {
  // State للـ settings
  const [profileName, setProfileName] = useState("Rehab Ahmed");
  const [password, setPassword] = useState("");
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [paymentUpdates, setPaymentUpdates] = useState(false);
  const [saveMessage, setSaveMessage] = useState(false);

  // Handlers
  const handleNameChange = (e) => setProfileName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const toggleEmailAlerts = () => setEmailAlerts(!emailAlerts);
  const togglePaymentUpdates = () => setPaymentUpdates(!paymentUpdates);

  const handleSave = () => {
    setSaveMessage(true);
    setTimeout(() => setSaveMessage(false), 3000);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 min-h-screen ">
      
      
      {saveMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-[#1e1e1e] text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
            Settings saved successfully!
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto py-8 px-4 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-100 mb-6">Settings</h1>

        {/* Account Section */}
        <section className="bg-[#1e1e1e] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Account</h2>
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-200">Profile Name</span>
              </div>
              <input
                type="text"
                value={profileName}
                onChange={handleNameChange}
                className="w-full border border-gray-600 rounded-lg px-3 py-2 text-gray-200 bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-200">Password</span>
              </div>
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                className="w-full border border-gray-600 rounded-lg px-3 py-2 text-gray-200 bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="bg-[#1e1e1e] rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-xl font-semibold text-gray-100 mb-4">Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-200">Email Alerts</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={toggleEmailAlerts}
                className="w-5 h-5 text-indigo-600 accent-indigo-500 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <span className="text-gray-200">Payment Updates</span>
              </div>
              <input
                type="checkbox"
                checked={paymentUpdates}
                onChange={togglePaymentUpdates}
                className="w-5 h-5 text-indigo-600 accent-indigo-500 rounded"
              />
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[#1e1e1e] text-white rounded-lg shadow hover:bg-indigo-500 transition"
          >
            Save Settings
          </button>
        </div>
      </main>

      {/* Animation Tailwind CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
