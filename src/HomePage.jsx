import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const benefitCards = [
    {
      icon: "💰",
      title: "Attractive Returns",
      text: "Lenders earn consistent and transparent returns through direct peer-to-peer investment models."
    },
    {
      icon: "🔓",
      title: "Fair Credit Access",
      text: "Borrowers receive accessible, fair, and flexible loan terms that meet their real-life needs."
    },
    {
      icon: "🤝",
      title: "Community Trust",
      text: "Growth is driven through verified referrals and mutual accountability—not middlemen."
    },
    {
      icon: "📈",
      title: "Trackable Impact",
      text: "Real-time visibility into lending, repayments, and portfolio performance to help you stay in control."
    },
    {
      icon: "🛡️",
      title: "Risk Transparency",
      text: "Understand borrower risk profiles and portfolio exposure before lending—no hidden risks."
    },
    {
      icon: "🚀",
      title: "Fast Deployment",
      text: "Our lightweight system allows quick onboarding and early testing, ideal for innovators and first-movers."
    }
  ];

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleJoinWaitlist = async () => {
    setErrorMessage("");
    setSubmitted(false);

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("emails").insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        setErrorMessage("This email is already registered.");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      setIsLoading(false);
      return;
    }

    setSubmitted(true);
    setEmail("");
    setIsLoading(false);
  };

  return (
    <div className="text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-900">

      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow-sm py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl text-blue-600">P2P Lending</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#how" className="hover:text-blue-500">How It Works</a>
            <a href="#about" className="hover:text-blue-500">About</a>
            <a href="#blog" className="hover:text-blue-500">Blog</a>
            <a href="#waitlist" className="hover:text-blue-500">Join</a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center px-4 pt-32 pb-16 text-center bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-3xl">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            A Smarter Way to <span className="text-blue-600">Lend</span>, <span className="text-purple-600">Borrow</span> Fairly
          </motion.h2>
          <p className="text-md md:text-lg font-medium text-gray-600 dark:text-gray-300 mb-8">
            Transparent. Secure. Community-first.
          </p>
          <div id="waitlist" className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-96 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinWaitlist}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Join Waitlist"}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 mt-2 text-sm font-medium">{errorMessage}</p>
          )}
          {submitted && !errorMessage && (
            <p className="text-green-500 mt-4 font-medium animate-pulse">
              ✅ You're on the list. We'll keep you posted.
            </p>
          )}
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="how" className="px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-700 dark:text-gray-200">
            Why We're Different
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefitCards.map((card, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md flex flex-col items-start"
              >
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="about" className="border-t border-gray-200 dark:border-gray-700 py-16 px-6 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-2">P2P Lending</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Empowering a new way of lending — driven by community, not corporations.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Company</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#blog" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-2">Legal</h4>
            <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-xs text-gray-500 dark:text-gray-600">
          © {new Date().getFullYear()} P2P Lending Experiment. All rights reserved. Lending involves risk. Please review our policies before making any financial decisions.
        </div>
      </footer>
    </div>
  );
}
