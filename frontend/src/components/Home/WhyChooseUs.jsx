import React from "react";
import { Truck, BadgeCheck, Wallet, Headset } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Fast Delivery",
      desc: "Get your daily essentials delivered quickly and safely.",
      icon: <Truck size={40} className="text-purple-400" />,
    },
    {
      title: "Best Prices",
      desc: "Affordable rates on all small & daily-use items.",
      icon: <Wallet size={40} className="text-purple-400" />,
    },
    {
      title: "Trusted Quality",
      desc: "Every product is verified and quality checked.",
      icon: <BadgeCheck size={40} className="text-purple-400" />,
    },
    {
      title: "24/7 Support",
      desc: "Our team is always here to help you with anything.",
      icon: <Headset size={40} className="text-purple-400" />,
    },
  ];

  return (
    <div className="w-full py-20 text-white px-5">
      <h2 className="text-center text-4xl sm:text-5xl font-bold mb-14">
        Why <span className="text-purple-400">Choose Us?</span>
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <div
            key={i}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:scale-[1.03] transition-all"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-lg">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
