// Copyright (C) 2025 Anuj
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaBars, FaXmark } from "react-icons/fa6";
import { IoCallSharp } from "react-icons/io5";

interface NavChild {
  label: string;
  url: string;
}

interface NavItemType {
  label: string;
  url: string;
  children: NavChild[];
}

const navItems: NavItemType[] = [
  {
    label: "Home",
    url: "/",
    children: [],
  },
  {
    label: "Why ALS",
    url: "/why-als",
    children: [
      { label: "About Us", url: "/about" },
      { label: "Careers", url: "/why-als/careers" },
    ],
  },
  {
    label: "Our Services",
    url: "/services",
    children: [
      { label: "Home Loans", url: "/home-loans" },
      { label: "Investment Loans", url: "/investment-loans" },
      { label: "Commercial Loans", url: "/commercial-loans" },
      { label: "SMSF Loans", url: "/smsf-loans" },
      { label: "Car Financing", url: "/car-financing" },
      { label: "Refinancing", url: "/refinancing" },
    ],
  },
  {
    label: "Calculators",
    url: "/calculator",
    children: [
      { label: "Borrowing Capacity", url: "/calculator/borrowing-capacity" },
      { label: "Extra Repayments", url: "/calculator/extra-repayments" },
      { label: "Property Fees", url: "/calculator/property-fees" },
    ],
  },
  {
    label: "How It Works",
    url: "/how-it-works",
    children: [],
  },
  {
    label: "Resources",
    url: "#",
    children: [
      { label: "First Home Buyer Guide", url: "/resources/first-home-buyer-guide" },
      { label: "Investment Guide", url: "/resources/investment-guide" },
      { label: "Construction Loans Guide", url: "/resources/construction-loans-guide" },
      { label: "SMSF Guide", url: "/resources/smsf-guide" },
      { label: "Guarantors Guide", url: "/resources/guarantors-guide" },
      { label: "Documents", url: "/resources/documents" },
      { label: "FAQ", url: "/resources/faq" },
    ],
  },
  {
    label: "Contact",
    url: "/contact",
    children: [],
  },
];

const LG_BREAKPOINT = 1024;

export default function Navbar({
  logoUrl = "/logo-bgr.png",
  logoAlt = "ALS Mortgage Solutions",
}: {
  logoUrl?: string;
  logoAlt?: string;
}) {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const controlNavbar = () => {
      if (isMobileMenuOpen || window.innerWidth < LG_BREAKPOINT) {
        setIsVisible(true);
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentY = window.scrollY;
      if (currentY > lastScrollY.current && currentY > 96) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [isMobileMenuOpen]);

  const showBar = isVisible || isMobileMenuOpen;

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((open) => {
      if (!open) setIsVisible(true);
      return !open;
    });
  }

  return (
    <>
      {isMobileMenuOpen && (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/70 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <header
        className={`fixed top-0 left-0 z-50 w-full bg-[#1d293d] shadow-lg shadow-black/20 transition-transform duration-300 ${
          showBar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto flex h-24 items-center justify-between px-4">
          <Link href="/" className="flex shrink-0 items-center" onClick={closeMobileMenu}>
            <img
              src={logoUrl}
              alt={logoAlt}
              className="h-14 cursor-pointer transition-opacity hover:opacity-90 sm:h-16"
            />
          </Link>

          <div className="relative hidden text-sm font-sans uppercase text-gray-200 lg:flex lg:gap-6">
            {navItems.map((item, index) => (
              <Menu key={index} item={item} />
            ))}
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded bg-[#00a69c] px-3 py-2 text-xs font-sans uppercase text-white transition-colors hover:bg-[#0d8a99] sm:flex sm:px-4 sm:text-sm lg:hidden"
              onClick={closeMobileMenu}
            >
              <IoCallSharp />
              <span className="hidden sm:inline">Get In Touch</span>
            </Link>

            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-gray-200 transition-colors hover:bg-[#2d3544] lg:hidden"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <FaXmark /> : <FaBars />}
            </button>

            <Link
              href="/contact"
              className="hidden items-center gap-2 rounded bg-[#00a69c] px-4 py-2 text-sm font-sans uppercase text-white transition-colors hover:bg-[#0d8a99] lg:flex"
            >
              <IoCallSharp />
              Get In Touch
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <nav
            className="max-h-[calc(100dvh-6rem)] overflow-y-auto border-t border-gray-600 bg-[#1d293d] lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="py-2">
              {navItems.map((item, index) => (
                <MobileMenu key={index} item={item} onClose={closeMobileMenu} />
              ))}
              <div className="border-t border-gray-600 px-4 py-3">
                <Link
                  href="/contact"
                  className="flex w-full items-center justify-center gap-2 rounded bg-[#00a69c] py-3 text-sm font-sans uppercase text-white transition-colors hover:bg-[#0d8a99]"
                  onClick={closeMobileMenu}
                >
                  <IoCallSharp />
                  Get In Touch
                </Link>
              </div>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}

interface IMenuProps {
  item: NavItemType;
}

function Menu({ item }: IMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex cursor-pointer items-center justify-center gap-2 text-gray-200 transition-colors hover:text-[#00a69c]">
        <Link href={item.url ?? ""}>{item.label}</Link>
        {hasChildren && (
          <FaChevronDown
            size={10}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {hasChildren && isOpen && (
        <div className="absolute top-full left-0 z-[9999] pt-2">
          <div className="min-w-48 rounded-md border border-gray-600 bg-[#2d3544] py-2 shadow-xl shadow-black/30">
            {item.children!.map((child, index) => (
              <Link
                key={index}
                href={child.url || "#"}
                className="block px-4 py-3 text-xs capitalize text-gray-300 transition-colors hover:bg-[#1d293d] hover:text-[#00a69c]"
              >
                {child.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface IMobileMenuProps {
  item: NavItemType;
  onClose: () => void;
}

function MobileMenu({ item, onClose }: IMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div className="border-b border-gray-600 last:border-b-0">
      {hasChildren ? (
        <div>
          <button
            type="button"
            className="flex w-full items-center justify-between px-4 py-3 text-left font-sans text-sm uppercase text-gray-200 transition-colors hover:bg-[#2d3544]"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span>{item.label}</span>
            <FaChevronDown
              size={12}
              className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isOpen && (
            <div className="bg-[#2d3544]">
              {item.url !== "#" && (
                <Link
                  href={item.url}
                  className="block border-b border-gray-600/60 px-6 py-2.5 text-xs capitalize text-gray-300 transition-colors hover:bg-[#1d293d] hover:text-[#00a69c]"
                  onClick={onClose}
                >
                  Overview
                </Link>
              )}
              {item.children!.map((child, index) => (
                <Link
                  key={index}
                  href={child.url || "#"}
                  className="block px-8 py-2.5 text-xs capitalize text-gray-400 transition-colors hover:bg-[#1d293d] hover:text-[#00a69c]"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.url || "#"}
          className="block px-4 py-3 font-sans text-sm uppercase text-gray-200 transition-colors hover:bg-[#2d3544]"
          onClick={onClose}
        >
          {item.label}
        </Link>
      )}
    </div>
  );
}
