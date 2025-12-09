import React from "react";

const Footer = () => {
  return (
    <footer className="grid grid-cols-2  md:grid-cols-4 gap-8 w-full py-10 px-6 text-white text-[1.2rem] bg-white/5 backdrop-blur-3xl ">
      
      {/* ---- Company ---- */}
      <div>
        <h1 className="font-semibold mb-3 text-lg">Company</h1>
        <ul className="space-y-2 opacity-80">
          <li>About Us</li>
          <li>Careers</li>
          <li>Blog</li>
          <li>Press</li>
        </ul>
      </div>

      {/* ---- Support ---- */}
      <div>
        <h1 className="font-semibold mb-3 text-lg">Support</h1>
        <ul className="space-y-2 opacity-80">
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Cancellation Policy</li>
          <li>FAQ</li>
        </ul>
      </div>

      {/* ---- Legal ---- */}
      <div>
        <h1 className="font-semibold mb-3 text-lg">Legal</h1>
        <ul className="space-y-2 opacity-80">
          <li>Privacy Policy</li>
          <li>Terms & Conditions</li>
          <li>Cookie Policy</li>
          <li>Security</li>
        </ul>
      </div>

      {/* ---- Credits / Personal Brand ---- */}
      <div>
        <h1 className="font-semibold mb-3 text-lg">Created By</h1>
        <p className="opacity-80">Hussain Moiyedi</p>

        <h1 className="font-semibold mt-5 mb-3 text-lg">Connect</h1>
        <ul className="space-y-2 opacity-80">
          <li>LinkedIn</li>
          <li>GitHub</li>
          <li>Instagram</li>
          <li>Portfolio Site</li>
        </ul>
      </div>

    </footer>
  );
};

export default Footer;
