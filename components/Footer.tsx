"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Share2, PlayCircle, X as XIcon } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/restaurants", label: "Restaurants" },
  { href: "/#about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },

];

const socialLinks = [
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: XIcon, href: "#", label: "Twitter/X" },
  { icon: Share2, href: "#", label: "Facebook" },
  { icon: PlayCircle, href: "#", label: "YouTube" },
];

export default function Footer() {
  const pathname = usePathname();

  // The Restaurant Setup Module dashboard has its own layout and shouldn't
  // show the public marketing footer.
  if (pathname?.startsWith("/restaurant-setup")) {
    return null;
  }

  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="SevenBites" className="w-9 h-9" />
              <span className="font-poppins font-bold text-2xl text-white">
                Seven<span className="text-[#E23744]">Bites</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs mb-6">
              Discover great food around you. Connecting food lovers with the best restaurants, delivering joy one meal at a time.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-[#E23744] hover:text-white text-gray-400 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#E23744] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-widest">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-[#E23744] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-xs text-gray-600">Customer Support</p>
              <a
                href="mailto:support@sevenbites.com"
                className="text-sm text-gray-500 hover:text-[#E23744] transition-colors"
              >
                support@sevenbites.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} SevenBites. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}