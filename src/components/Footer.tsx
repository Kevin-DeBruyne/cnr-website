import React from 'react';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#1E3F20] text-[#E6ECE7] border-t border-[#142D16] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand & Direct CTA */}
          <div className="space-y-4">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-white block">
              Corbett Nature Retreat
            </span>
            <p className="text-[#CBD6CD] text-xs leading-relaxed">
              Five boutique luxury cottages naturally shaded under heritage mango trees all around in Village Kyari, near the Khichri Riverbank, Uttarakhand.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenBooking}
                className="px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#9B7E4F] hover:bg-[#856A3E] transition-colors rounded-sm inline-flex items-center gap-2"
              >
                <span>Book Your Stay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Explore Retreat */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8C5A3]">
              Explore The Retreat
            </h4>
            <ul className="space-y-2 text-[#E6ECE7]">
              <li>
                <a href="#concept" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  The Concept &amp; Orchard Shade
                </a>
              </li>
              <li>
                <a href="#accommodations" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  The 5 Boutique Cottages
                </a>
              </li>
              <li>
                <a href="#everything-available" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  Safaris, Xtreme Zone &amp; Village Feast
                </a>
              </li>
              <li>
                <a href="#panorama-gallery" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  360° Gallery &amp; Hotspots
                </a>
              </li>
              <li>
                <a href="#info-hub" className="hover:text-white hover:underline underline-offset-4 transition-colors">
                  Kitchen Menu, Seasons &amp; FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Transparent Tariffs & Rules */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8C5A3]">
              Tariffs &amp; Retreat Notes
            </h4>
            <ul className="space-y-2 text-[#CBD6CD]">
              <li>Cottage Stay: ₹3,250 + 5% GST / night</li>
              <li>4x4 Gypsy Safari (3 Hrs): ₹8,200 / vehicle</li>
              <li>Dhikala Canter (3 Hrs): ₹2,250 / person</li>
              <li>River Walk: ₹500 / person (Village trails)</li>
              <li>Birding: Free (Own) · ₹1,500 / trip (Guide)</li>
              <li>On-Premises Bonfire Pit: ₹1,000 / session</li>
            </ul>
          </div>

          {/* Concierge & Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#D8C5A3]">
              Concierge &amp; Location
            </h4>
            <div className="space-y-2.5 text-xs text-[#E6ECE7]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8C5A3] shrink-0 mt-0.5" />
                <span>Village Kyari, Khichri Riverbank, Ramnagar, Corbett, Uttarakhand 244715</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8C5A3] shrink-0" />
                <a href="tel:+918449506167" className="hover:text-white">
                  +91 84495 06167
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D8C5A3] shrink-0" />
                <a href="mailto:stay@corbettnatureretreat.in" className="hover:text-white">
                  stay@corbettnatureretreat.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Footer */}
        <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-[#CBD6CD]">
          <div>
            © {new Date().getFullYear()} Corbett Nature Retreat. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px]">
            <span>Eco-Tourism Certified</span>
            <span aria-hidden="true">·</span>
            <span>Common Restaurant &amp; Extra-Cost Balcony Service</span>
            <span aria-hidden="true">·</span>
            <span>Village Kyari, Corbett</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
