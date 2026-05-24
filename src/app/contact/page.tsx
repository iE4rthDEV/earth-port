"use client";

import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaLine,
  FaPhone,
  FaGithub,
  FaLinkedin,
  FaMedium,
} from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import PageSection from "@/components/ui/PageSection";

const contactItems = [
  {
    href: "https://www.facebook.com/niti.surakongka",
    label: "Niti Surakongka",
    icon: FaFacebook,
    delay: "700",
  },
  {
    href: "https://line.me/ti/p/8XgcLYn8Cg",
    label: "091-758-2874",
    icon: FaLine,
    delay: "1100",
  },
  {
    href: "tel:0917582874",
    label: "091-758-2874",
    icon: FaPhone,
    delay: "1300",
  },
  {
    href: "https://github.com/entsrkk",
    label: "entsrkk",
    icon: FaGithub,
    delay: "1500",
  },
  {
    href: "https://www.linkedin.com/in/nitisurakongka/",
    label: "Niti Surakongka",
    icon: FaLinkedin,
    delay: "1700",
  },
  {
    href: "https://medium.com/@niti2003s",
    label: "@niti2003s",
    icon: FaMedium,
    delay: "1900",
  },
] as const;

const ContactPage: React.FC = () => {
  return (
    <PageSection
      muted
      className="min-h-[calc(100vh-5rem)]"
      containerClassName="flex min-h-[inherit] items-center justify-center py-16 sm:py-20"
    >
      <div className="w-full max-w-5xl">
        <div className="mb-12 text-center">
          <TypeAnimation
            sequence={["Contact"]}
            wrapper="h2"
            speed={40}
            className="text-gradient font-Outfit text-4xl font-bold uppercase sm:text-5xl sm:font-black"
          />
          <p className="mt-4 font-Kanit text-base font-light text-stone-600 sm:text-lg">
            ติดต่อผมได้ผ่านช่องทางต่างๆ ด้านล่าง
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactItems.map(({ href, label, icon: Icon, delay }) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-aos="fade-up"
              data-aos-delay={delay}
              className="card-surface group flex flex-col items-center gap-4 p-6 transition-all duration-300 hover:scale-105 hover:border-primary/60 hover:shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                <Icon className="h-8 w-8 text-primary transition-all duration-300 group-hover:h-9 group-hover:w-9 group-hover:text-primary-end" />
              </div>
              <span className="link-accent text-center font-Kanit text-base font-medium sm:text-lg">
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default ContactPage;
