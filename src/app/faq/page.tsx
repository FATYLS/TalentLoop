"use client";
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChevronDown } from "lucide-react";
import { content } from "@/lib/content";

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-black">{content.faq.title}</h1>
          <p className="text-gray-500 text-center mt-3">{content.faq.subtitle}</p>
          <div className="mt-12">
            {content.faq.items.map((f, i) => (
              <div key={i} className="border-b border-gray-100">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex justify-between items-center py-5 text-left font-medium text-black hover:text-[#BF00FF] gap-4">
                  {f.q} <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                {open === i && <p className="pb-5 text-gray-600 text-sm leading-relaxed">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
