import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "./supabaseClient";

// Inline SVG line-style icons (swap these for Lottie or your own art)
const icons = {
  refer: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="20" cy="20" r="18" />
      <path d="M12 20l4 4 8-8" />
    </svg>
  ),
  verify: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="6" y="10" width="28" height="20" rx="4" />
      <path d="M14 18h12" />
    </svg>
  ),
  loan: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 32h24M16 8v24" />
    </svg>
  ),
  track: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="8 24 16 16 24 24 32 8" />
      <polyline points="8 32 32 32" />
    </svg>
  ),
  invest: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="20" cy="20" r="10" />
      <path d="M20 10v10l5 5" />
    </svg>
  ),
  income: (
    <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 32h24" />
      <path d="M12 24l8-8 8 8" />
    </svg>
  )
};

const HomePage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const borrowSteps = [
    { icon: icons.refer, title: "Get Referred", desc: "Join via a trusted invite to build your peer network." },
    { icon: icons.verify, title: "Verify Profile", desc: "Authenticate your identity and income sources." },
    { icon: icons.loan, title: "Request Loan", desc: "Submit a borrowing request tailored to your needs." },
    { icon: icons.track, title: "Track Repayment", desc: "Monitor your payment schedule in real-time." }
  ];

  const lendSteps = [
    { icon: icons.invest, title: "Start with 100 ETB", desc: "Invest as little as 100 ETB to diversify risk." },
    { icon: icons.income, title: "Earn Alternative Income", desc: "Generate returns through micro-lending." },
    { icon: icons.verify, title: "Review Profiles", desc: "Assess borrower histories and community scores." },
    { icon: icons.track, title: "Watch Growth", desc: "See your portfolio and impact metrics live." }
  ];

  const handleJoinWaitlist = async () => {
    setErrorMessage("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.from("emails").insert([{ email }]);

    if (error) {
      setErrorMessage(
        error.code === "23505"
          ? "This email is already registered."
          : "Something went wrong. Please try again."
      );
    } else {
      setSubmitted(true);
      setEmail("");
    }

    setIsLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 scroll-smooth">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 shadow py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-xl text-blue-600">P2P Lending</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#how-it-works" className="hover:text-blue-500">
              How It Works
            </a>
            <a href="#about-footer" className="hover:text-blue-500">
              About
            </a>
            <a href="#waitlist" className="hover:text-blue-500">
              Join
            </a>
          </nav>
        </div>
      </header>

      {/* Hero / Waitlist */}
      <section
        id="waitlist"
        className="min-h-screen flex items-center justify-center pt-32 px-4 pb-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-4"
          >
            A Smarter Way to <span className="text-blue-600">Lend</span>,{" "}
            <span className="text-purple-600">Borrow</span>
          </motion.h2>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Transparent. Secure. Community-first.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:w-96 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleJoinWaitlist}
              disabled={isLoading}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-50"
            >
              {isLoading ? "Submitting..." : "Join Waitlist"}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {submitted && <p className="text-green-500 mt-4">✅ You're on the list!</p>}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Borrowers Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2">🙋‍♂️</span> Borrowers
              </h3>
              <div className="space-y-6">
                {borrowSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition"
                  >
                    <div className="mr-4 text-blue-600">{s.icon}</div>
                    <div>
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Lenders Column */}
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <span className="mr-2">💸</span> Lenders
              </h3>
              <div className="space-y-6">
                {lendSteps.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl transition"
                  >
                    <div className="mr-4 text-blue-600">{s.icon}</div>
                    <div>
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{s.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Initiative Is Different? */}
      <section className="py-24 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            Why This Initiative Is Different?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
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
                icon: "📊",
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
            ].map((card, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-md flex flex-col items-start">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About + Footer Combined */}
<section
  id="about-footer"
  className="min-h-screen flex flex-col justify-between px-6 py-16 bg-gray-100 dark:bg-gray-800"
>
  <div className="max-w-3xl mx-auto text-center mb-12">
    <h2 className="text-3xl font-bold mb-6">About the Initiative</h2>
    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
      This platform is built on <strong>community-based trust and scoring</strong>. 
      By starting with invitations and referrals, we ensure every member is vouched for by their peers.
    </p>
    <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
      Informal loans between family and friends earn no returns and lose value to inflation.
      We bridge that gap with fairness, transparency, and real rewards.
    </p>
    <p className="text-lg text-gray-700 dark:text-gray-300">
      As the experiment matures, we’ll layer in alternative data signals—enhancing trust, not replacing it.
    </p>
  </div>

  <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-2">P2P Lending</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Driven by community, not corporations.
        </p>
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-2">Company</h4>
        <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
          <li><a href="#about-footer" className="hover:underline">About</a></li>
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
      © {new Date().getFullYear()} P2P Lending Experiment. Lending involves risk. Review policies before using.
    </div>
  </footer>
</section>
    </div>
  );
};

export default HomePage;
