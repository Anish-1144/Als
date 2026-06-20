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

import { useState, useEffect } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface PopupData {
  isEnabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  showDelay: number;
}

interface WebsitePopupProps {
  popupData?: PopupData;
}

export default function WebsitePopup({ popupData }: WebsitePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const defaultPopupData: PopupData = {
    isEnabled: true,
    title: "Get Your Free Mortgage Assessment",
    message:
      "Discover how much you could save with our expert mortgage brokers. Free consultation available now!",
    buttonText: "Get Free Assessment",
    redirectUrl: "/contact",
    showDelay: 3000,
  };

  const dataToUse = popupData || defaultPopupData;

  useEffect(() => {
    if (!dataToUse.isEnabled || hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
    }, dataToUse.showDelay);

    return () => clearTimeout(timer);
  }, [dataToUse.isEnabled, dataToUse.showDelay, hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRedirect = () => {
    window.location.href = dataToUse.redirectUrl;
  };

  if (!dataToUse.isEnabled) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-[#2d3544] rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-gray-600"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#1d293d] hover:bg-[#424d5e] transition-colors"
            >
              <FaTimes className="w-4 h-4 text-gray-400" />
            </button>

            {/* Content */}
            <div className="text-center">
              <div className="w-16 h-16 bg-[#00a69c]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-[#00a69c]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">
                {dataToUse.title}
              </h3>

              <p className="text-gray-400 mb-8 leading-relaxed">
                {dataToUse.message}
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleRedirect}
                  className="w-full bg-[#00a69c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d8a99] transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {dataToUse.buttonText}
                  <FaArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleClose}
                  className="w-full text-gray-500 hover:text-gray-300 transition-colors text-sm"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
