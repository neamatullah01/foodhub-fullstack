import { Metadata } from "next";
import Image from "next/image";
import { Utensils, Heart, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us - FoodHub",
  description: "Learn more about FoodHub, our mission, and our story.",
};

export default function AboutPage() {
  const stats = [
    { id: 1, name: "Active Users", value: "50,000+" },
    { id: 2, name: "Restaurants", value: "1,200+" },
    { id: 3, name: "Cities Covered", value: "45" },
    { id: 4, name: "Meals Delivered", value: "1M+" },
  ];

  const values = [
    {
      name: "Quality First",
      description: "We partner with only the best local restaurants and certified home chefs.",
      icon: <Utensils className="w-8 h-8 text-[#FFC222]" />,
    },
    {
      name: "Community Focused",
      description: "We empower small food businesses to reach hungry customers across the city.",
      icon: <Users className="w-8 h-8 text-[#FFC222]" />,
    },
    {
      name: "Customer Passion",
      description: "Your satisfaction is our priority. We guarantee hot and fresh deliveries.",
      icon: <Heart className="w-8 h-8 text-[#FFC222]" />,
    },
    {
      name: "Trust & Safety",
      description: "Secure payments and strict hygiene standards for every single order.",
      icon: <ShieldCheck className="w-8 h-8 text-[#FFC222]" />,
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-20">
          <Image 
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000&auto=format&fit=crop" 
            alt="Food background" 
            fill 
            className="object-cover" 
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="text-[#e5ae1e] font-bold tracking-wider uppercase text-sm">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-extrabold mt-4 mb-6 text-slate-900 dark:text-white">
            Connecting People Through Great Food
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            FoodHub started with a simple idea: make it incredibly easy for everyone to enjoy authentic, delicious meals from the best local cooks and restaurants.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
                alt="Chefs cooking" 
                fill 
                className="object-cover" 
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
                Our Mission is to Revolutionize Local Dining
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-lg leading-relaxed">
                We believe that great food shouldn&apos;t be hard to find. By providing a seamless platform for both customers and providers, we are creating an ecosystem where culinary passion meets hungry appetites.
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Whether you are craving a late-night burger, a healthy salad, or traditional homemade biryani, FoodHub ensures it arrives at your door hot, fresh, and exactly how you want it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#FFC222]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.id}>
                <div className="text-4xl md:text-5xl font-extrabold text-black mb-2">{stat.value}</div>
                <div className="text-black/80 font-medium uppercase tracking-wider text-sm">{stat.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.name} className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-800">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{value.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
