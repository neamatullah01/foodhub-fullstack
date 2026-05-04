import { Utensils, MousePointerClick, Truck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <MousePointerClick className="w-10 h-10 text-[#FFC222]" />,
      title: "Choose Your Meal",
      description: "Browse our diverse menu from top local providers and select your favorite dishes.",
    },
    {
      id: 2,
      icon: <Utensils className="w-10 h-10 text-[#FFC222]" />,
      title: "We Prepare It",
      description: "Our certified chefs prepare your meal with fresh, high-quality ingredients.",
    },
    {
      id: 3,
      icon: <Truck className="w-10 h-10 text-[#FFC222]" />,
      title: "Fast Delivery",
      description: "Enjoy hot and delicious food delivered straight to your doorstep in minutes.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#e5ae1e] font-bold tracking-wider uppercase text-sm">Simple Process</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-4 mb-6 text-slate-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Ordering your favorite food has never been this easy. Follow these three simple steps to satisfy your cravings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

          {steps.map((step) => (
            <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 shadow-xl border-4 border-slate-50 dark:border-slate-950 flex items-center justify-center mb-6 relative">
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#FFC222] text-black font-bold flex items-center justify-center shadow-md">
                  {step.id}
                </div>
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{step.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
