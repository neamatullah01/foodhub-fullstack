"use client";

import { Clock, ShieldCheck, Truck, UtensilsCrossed } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    id: 1,
    title: "Super Fast Delivery",
    description:
      "Hungry? We deliver faster than you can imagine. Hot and fresh at your door.",
    icon: Truck,
  },
  {
    id: 2,
    title: "Fresh & Healthy",
    description:
      "We work with local chefs who use only the freshest, high-quality ingredients.",
    icon: UtensilsCrossed,
  },
  {
    id: 3,
    title: "100% Trusted",
    description:
      "Every provider is verified. Secure payment and money-back guarantee.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "24/7 Support",
    description:
      "Got a problem? Our support team is ready to help you anytime, anywhere.",
    icon: Clock,
  },
];

export function WhyChooseUs() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-fixed bg-center bg-cover -z-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
        }}
      />

      <div className="absolute inset-0 bg-black/70 dark:bg-black/80 -z-20" />

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px] fill-white dark:fill-slate-950"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"></path>
        </svg>
      </div>

      <div className="container mx-auto relative z-10 pb-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h3 className="text-[#FFC222] font-bold uppercase tracking-widest text-sm mb-3">
            Our Quality
          </h3>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 drop-shadow-sm">
            Why Choose FoodHub?
          </h2>
          <p className="text-slate-200 text-lg drop-shadow-sm">
            We don&apos;t just deliver food; we deliver an experience. Here is
            why thousands of foodies trust us daily.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {features.map((feature) => (
            <Card
              key={feature.id}
              className="border-none shadow-sm bg-white dark:bg-slate-950 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="mb-6 h-20 w-20 rounded-full bg-[#FFF8E1] dark:bg-slate-800 flex items-center justify-center group-hover:bg-[#FFC222] transition-colors duration-300">
                  <feature.icon className="h-10 w-10 text-[#FFC222] group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[90px] fill-white dark:fill-slate-950"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
}
