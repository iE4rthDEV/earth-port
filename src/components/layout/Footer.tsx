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
  { href: "/contact", label: "Contact" },
] as const;

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-base-300 bg-base-100">
      <div className="h-1 bg-linear-to-r from-primary to-secondary" />
      <div className="mx-auto w-full max-w-(--container-page) px-4 pt-10 pb-6 sm:px-6 sm:pt-12 lg:px-8">
        <div className="footer footer-vertical gap-8 sm:footer-horizontal sm:grid-cols-2 lg:grid-cols-3">
          <aside className="space-y-2">
            <p className="text-gradient font-display text-lg font-semibold">
              Niti Surakongka
            </p>
            <p className="font-thai text-sm font-normal text-base-content/70">
              Junior Full Stack Developer — portfolio & projects
            </p>
          </aside>

          <nav aria-label="Footer navigation">
            <h2 className="footer-title mb-1 text-base-content/80">
              Quick links
            </h2>
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link link-hover content-center text-sm font-medium text-primary py-1"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Social links">
            <h2 className="footer-title mb-1 text-base-content/80">
              Connect
            </h2>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn btn-ghost btn-square text-primary transition-colors duration-fast hover:bg-primary/10"
                >
                  <Icon className="size-6" />
                </a>
              ))}
            </div>
          </nav>
        </div>
        <p className="mt-8 border-t border-base-300 pt-6 text-center text-xs text-base-content/60">
          © {year} Niti Surakongka. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
