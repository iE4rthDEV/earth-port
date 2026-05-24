"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navLinks = [
  { href: "/", label: "Home", external: false },
  { href: "/projects", label: "Projects", external: false },
  { href: "/contact", label: "Contact", external: false },
] as const;

const isActive = (pathname: string, href: string): boolean => {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
};

const NavLink: React.FC<{
  href: string;
  label: string;
  external?: boolean;
  pathname: string;
  onNavigate?: () => void;
  className?: string;
}> = ({ href, label, external, pathname, onNavigate, className = "" }) => {
  const active = !external && isActive(pathname, href);
  const linkClass = `sm:px-4 lg:animated-underline ${active ? "font-semibold animated-underline-active" : ""} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass} onClick={onNavigate}>
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <header className="navbar sticky top-0 z-50 bg-brand-gradient px-4 py-4 shadow-lg backdrop-blur-md">
        <div className="container mx-auto flex w-full items-center justify-between">
          <div className="navbar-start lg:hidden">
          </div>
          <div className="navbar-center">
            <nav className="menu menu-horizontal p-0 text-base text-white space-x-2 lg:text-lg">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink pathname={pathname} {...link} />
                </li>
              ))}
            </nav>
          </div>
          <div className="navbar-end lg:hidden">
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
