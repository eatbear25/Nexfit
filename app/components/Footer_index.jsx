"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { socialLinks, sections } from "/app/config/footerSection";

export default function Footer() {
  return (
    <footer className="w-full bg-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section with logo and social links */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl text-[#101828] font-bold">
            NEXFIT
          </h2>
          <div className="flex gap-3 sm:gap-6">
            {socialLinks.map((sL) => (
              <Link
                href={sL.href}
                key={sL.id}
                className="hover:opacity-70 transition-opacity"
              >
                <Image
                  src={sL.icon}
                  alt="Social media icon"
                  width={30}
                  height={30}
                  className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Navigation sections */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-4">
          {sections.map((section) => (
            <div key={section.id} className="flex flex-col">
              <div className="mb-3">
                <h3 className="text-lg sm:text-2xl lg:text-3xl text-[#101828] font-semibold mb-2">
                  {section.title}
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-base font-bold leading-relaxed hover:text-[#AFC16D] transition-colors"
                    id={link.id}
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
