import Link from "next/link";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLine,
  FaLinkedin,
  FaMedium,
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
  {
    href: "https://medium.com/@niti2003s",
    label: "Medium",
    icon: FaMedium,
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
    <footer className="mt-auto border-t border-stone-200 bg-base100">
      <div className="h-1 bg-brand-gradient" />
      <div className="container mx-auto px-4 pt-10 pb-6 sm:px-6 sm:pt-0-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-2">
            <p className="font-Outfit text-lg font-semibold text-gradient">
              Niti Surakongka
            </p>
            <p className="font-Kanit text-sm font-light text-text-muted">
              Junior Frontend Developer — portfolio & projects
            </p>
          </div>
          <div>
            <p className="mb-3 font-Outfit text-sm font-semibold uppercase tracking-wide text-stone-700">
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
                      className="link-accent text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href} className="link-accent text-sm">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-3 font-Outfit text-sm font-semibold uppercase tracking-wide text-stone-700">
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
                  className="text-primary transition hover:scale-110 hover:text-primary-end"
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-8 border-t border-stone-100 pt-6 text-center text-xs text-text-muted">
          © {year} Niti Surakongka. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
