"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { socialLinks, sections } from "/app/config/footerSection";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F0F0F0] flex flex-col justify-end mt-20 md:mt-40 h-full">
      <div className="pt-8 pl-4 md:pt-15 md:pl-20 h-full">
        <div className="ml-2 md:ml-10 bg-white rounded-tl-[30px] md:rounded-tl-[60px] py-6 md:py-10 h-full">
          <div className="flex-row px-4 md:px-20">
            <div className="my-4 md:my-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-2xl md:text-5xl font-bold">NEXFIT</p>
              <div className="flex gap-3 md:gap-7">
                {socialLinks.map((sL) => (
                  <Link href={sL.href} key={sL.id}>
                    <Image
                      src={sL.icon}
                      alt="Account Icon"
                      width={24}
                      height={24}
                      className="md:w-[30px] md:h-[30px]"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Footer sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {sections.map((section) => (
                <div key={section.id} className="flex flex-col">
                  <div className="mb-3">
                    <p className="text-xl md:text-4xl font-semibold mb-1">
                      {section.title}
                    </p>
                    <p
                      href={section.links[0].href}
                      className="font-bold"
                      id={section.links[0].id}
                    ></p>
                  </div>
                  {section.links.slice(0).map((link) => (
                    <Link
                      key={link.id}
                      href={link.href}
                      className="my-1 md:my-2 font-bold hover:text-gray-600 transition-colors"
                      id={link.id}
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
