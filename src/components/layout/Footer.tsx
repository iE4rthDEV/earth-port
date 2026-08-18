import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLine,
  FaLinkedin,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/niti.surakongka",
    label: "Facebook",
    icon: FaFacebook,
  },
  {
    href: "https://www.instagram.com/eearth_nt/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://line.me/ti/p/8XgcLYn8Cg",
    label: "Line",
    icon: FaLine,
  },
  {
    href: "https://github.com/entsrkk",
    label: "GitHub",
    icon: FaGithub,
  },
  {
    href: "https://www.linkedin.com/in/nitisurakongka/",
    label: "LinkedIn",
    icon: FaLinkedin,
  },
] as const;

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" }
] as const;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="h-1 bg-linear-to-r from-primary to-secondary" />
      <div className="container mx-auto px-4 pt-10 pb-6 sm:px-6 sm:pt-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="text-gradient font-display text-lg font-semibold">
              Niti Surakongka
            </p>
            <p className="font-thai text-sm font-normal text-base-content/70">
              Junior Full Stack Developer — portfolio & projects
            </p>
          </div>
          <div>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-base-content/80">
              Quick links
            </p>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  {"external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link link-primary text-sm font-medium no-underline"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="link link-primary text-sm font-medium no-underline">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-base-content/80">
              Connect
            </p>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-primary transition hover:scale-110"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-base-300 pt-6 text-center text-xs text-base-content/60">
          © {year} Niti Surakongka. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
