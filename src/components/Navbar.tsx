import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenMenu: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Sanctuary', href: '#concept' },
    { label: 'Cottages', href: '#accommodations' },
    { label: 'Experiences', href: '#everything-available' },
    { label: '360° Tour', href: '#panorama-gallery' },
    { label: 'Info & Menu', href: '#info-hub' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Top Property Strip */}
      <div className="bg-[#1E3F20] text-[#E6ECE7] text-[11px] sm:text-xs py-1.5 px-4 border-b border-[#142D16]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <span className="truncate">
            Kyari, Jim Corbett · Surrounded All Around by Heritage Mango Trees
          </span>
          <span className="hidden sm:inline font-medium text-[#EFE6D5] whitespace-nowrap shrink-0 tabular-nums">
            Cottages ₹3,250 + 5% GST / night · Call +91 84495 06167
          </span>
        </div>
      </div>

      {/* Main 3-Zone Top Bar */}
      <div className="bg-[#F4EFEC]/95 backdrop-blur-md border-b border-[#DED5CA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8 h-16">
            {/* Zone 1: Single Wordmark */}
            <a
              href="#"
              className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-[#1E3F20] whitespace-nowrap shrink-0"
            >
              Corbett Nature Retreat
            </a>

            {/* Zone 2: Clean Typography Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#4A534D]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#1E3F20] hover:underline underline-offset-4 decoration-[#9B7E4F] transition-colors whitespace-nowrap shrink-0"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action + Mobile Trigger */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenBooking}
                className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white bg-[#9B7E4F] hover:bg-[#856A3E] active:scale-95 transition-all rounded-sm whitespace-nowrap shrink-0 cursor-pointer"
              >
                Book Your Stay
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#1E3F20] hover:bg-[#E7DFD6] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F4EFEC] border-b border-[#DED5CA] px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 px-3 text-sm font-medium text-[#1F2421] hover:bg-[#EAE2D8] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-2.5 px-4 mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-white bg-[#9B7E4F] rounded-sm"
          >
            Book Your Stay
          </button>
        </div>
      )}
    </header>
  );
};
