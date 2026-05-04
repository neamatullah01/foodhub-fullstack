import { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata: Metadata = {
  title: "Contact Us - FoodHub",
  description: "Get in touch with the FoodHub team.",
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-slate-950 py-20 min-h-[80vh]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#e5ae1e] font-bold tracking-wider uppercase text-sm">Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-4 mb-6 text-slate-900 dark:text-white">
            Contact Our Team
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            Have a question, feedback, or a business inquiry? We&apos;d love to hear from you. Fill out the form below and we&ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC222]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-[#e5ae1e]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Our Office</h4>
                    <p className="text-slate-600 dark:text-slate-400">123 Foodie Lane, Tech District<br/>Dhaka, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC222]/20 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-[#e5ae1e]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Phone</h4>
                    <p className="text-slate-600 dark:text-slate-400">+880 1712 345 678<br/>Mon-Fri, 9am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFC222]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-[#e5ae1e]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">Email</h4>
                    <p className="text-slate-600 dark:text-slate-400">support@foodhub.com<br/>partners@foodhub.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Send us a Message</h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Your Name</label>
                    <Input placeholder="John Doe" className="bg-slate-50 dark:bg-slate-950/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="bg-slate-50 dark:bg-slate-950/50" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Subject</label>
                  <Input placeholder="How can we help you?" className="bg-slate-50 dark:bg-slate-950/50" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Message</label>
                  <Textarea 
                    placeholder="Tell us more about your inquiry..." 
                    className="min-h-[150px] bg-slate-50 dark:bg-slate-950/50 resize-none" 
                  />
                </div>
                
                <Button className="w-full bg-[#FFC222] hover:bg-[#e5ae1e] text-black font-bold h-12 text-lg rounded-xl transition-transform active:scale-[0.98]">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
