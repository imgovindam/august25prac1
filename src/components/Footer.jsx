import React, { useState } from "react";
import { Facebook, Twitter, Instagram, CreditCard, Truck } from "lucide-react";

// Responsive, accessible footer component for an e‑commerce site
// TailwindCSS classes are used for styling (no imports required).
// Export is the default React component so it can be dropped into any page.

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("Please enter a valid email address.");
      return;
    }

    // Simulate a subscribe action (replace with real API call)
    setStatus("Thanks! You've been subscribed.");
    setEmail("");
  };

  return (
    <footer className="bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand + short desc */}
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">ShopMate</h3>
            <p className="text-slate-300 text-sm">Quality goods — great prices. Fast delivery and easy returns.</p>

            <div className="flex items-center space-x-3 mt-3">
              <a aria-label="facebook" href="#" className="p-2 rounded-md hover:bg-slate-800">
                <Facebook size={18} />
              </a>
              <a aria-label="twitter" href="#" className="p-2 rounded-md hover:bg-slate-800">
                <Twitter size={18} />
              </a>
              <a aria-label="instagram" href="#" className="p-2 rounded-md hover:bg-slate-800">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Useful links */}
          <div>
            <h4 className="font-medium mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:underline">All Products</a></li>
              <li><a href="#" className="hover:underline">Collections</a></li>
              <li><a href="#" className="hover:underline">Gift Cards</a></li>
              <li><a href="#" className="hover:underline">Sale</a></li>
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h4 className="font-medium mb-3">Customer Care</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Shipping & Delivery</a></li>
              <li><a href="#" className="hover:underline">Returns</a></li>
              <li><a href="#" className="hover:underline">Track Order</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium mb-3">Join our newsletter</h4>
            <p className="text-slate-300 text-sm mb-4">Get 10% off your first order and early access to sales.</p>

            <form className="flex flex-col sm:flex-row sm:items-center gap-3 " onSubmit={handleSubscribe}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                background="white"
                className="w-full sm:flex-1 rounded-md border-0 px-3 py-2 bg-amber-50 text-slate-900"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Subscribe
              </button>
            </form>

            {status && (
              <p role="status" className="mt-3 text-sm text-emerald-300">{status}</p>
            )}

            <div className="mt-6 flex items-center space-x-4 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2">
                <CreditCard size={16} />
                <span>Secure payments</span>
              </div>
              <div className="inline-flex items-center gap-2">
                <Truck size={16} />
                <span>Free shipping over ₹999</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} ShopMate — All rights reserved.</p>

          <div className="flex items-center space-x-4">
            <nav aria-label="Footer navigation" className="text-sm text-slate-300 space-x-3">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
