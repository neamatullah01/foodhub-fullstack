import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | FoodHub",
  description: "How FoodHub handles and protects your data.",
};

export default function PrivacyPage() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-8">
          Privacy Policy
        </h1>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 space-y-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">1. Information We Collect</h2>
            <p className="leading-relaxed">
              When you use FoodHub, we collect information that you provide directly to us, such as your name, email address, phone number, and delivery address. We also automatically collect certain technical information about your device and usage patterns.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="leading-relaxed">
              We use the information we collect to operate, maintain, and improve our services, to process your orders, to communicate with you, and to personalize your experience. We do not sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">3. Data Sharing and Disclosure</h2>
            <p className="leading-relaxed">
              We may share your information with local providers solely for the purpose of fulfilling your orders. We may also share information with third-party service providers who perform services on our behalf, such as payment processing and delivery logistics.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">4. Data Security</h2>
            <p className="leading-relaxed">
              We take reasonable measures to help protect information about you from loss, theft, misuse and unauthorized access, disclosure, alteration and destruction. However, no internet or email transmission is ever fully secure or error-free.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">5. Contact Us</h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at support@foodhub.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
