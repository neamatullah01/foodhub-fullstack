import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | FoodHub",
  description: "Terms and conditions for using FoodHub.",
};

export default function TermsPage() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8">
          Terms of Service
        </h1>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="leading-relaxed">
              Welcome to FoodHub. By accessing our website and using our services, you agree to be bound by these Terms of Service. Please read them carefully. If you do not agree with any part of these terms, you must not use our services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. User Accounts</h2>
            <p className="leading-relaxed">
              To use certain features of FoodHub, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Ordering and Payment</h2>
            <p className="leading-relaxed">
              All orders are subject to availability and confirmation of the order price. FoodHub acts as an intermediary between you and our local providers. Prices are subject to change without notice. We use secure payment gateways for processing your transactions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Limitation of Liability</h2>
            <p className="leading-relaxed">
              FoodHub shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of or inability to access or use the services.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Changes to Terms</h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. We will always post the most current version on our site. By continuing to use the service after the changes become effective, you agree to be bound by the revised terms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
