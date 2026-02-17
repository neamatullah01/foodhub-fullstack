import { CheckoutForm } from "@/components/modules/checkout/CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-8">
          Checkout
        </h1>
        <CheckoutForm />
      </div>
    </main>
  );
}
