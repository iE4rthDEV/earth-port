"use client";

import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaLine,
  FaPhone,
  FaGithub,
  FaLinkedin,
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
    href: "https://github.com/iE4rthDEV",
    label: "iE4rthDEV",
    icon: FaGithub,
    delay: "1500",
  },
  {
    href: "https://www.linkedin.com/in/nitisurakongka/",
    label: "Niti Surakongka",
    icon: FaLinkedin,
    delay: "1700",
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
            className="text-gradient font-display text-4xl font-bold uppercase sm:text-5xl sm:font-black"
          />
          <p className="mt-4 font-thai text-base font-normal leading-7 text-base-content/70 sm:text-lg sm:leading-8">
            ติดต่อผมได้ผ่านช่องทางต่างๆ ด้านล่าง
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {contactItems.map(({ href, label, icon: Icon, delay }) => (
            <div
              key={href}
              data-aos="fade-up"
              data-aos-delay={delay}
              className="w-full flex-none sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
            >
              <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-border group flex w-full flex-col items-center gap-4 rounded-box border-base-300 bg-base-100 p-6 shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 ease-out group-hover:bg-primary/20">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <span className="link link-primary text-center font-thai text-base font-semibold no-underline sm:text-lg">
                  {label}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageSection>
  );
};

export default ContactPage;
