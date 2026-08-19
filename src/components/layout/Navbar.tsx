"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

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
  const linkClass = `btn btn-ghost min-h-11 justify-start px-4 text-base font-medium transition-colors duration-fast md:justify-center ${active ? "bg-primary/10 font-semibold text-primary" : "text-base-content/75 hover:bg-base-200 hover:text-base-content"} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={linkClass}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const restoreTriggerFocus = (): void => {
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openMenu = (): void => dialogRef.current?.showModal();
  const closeMenu = (): void => dialogRef.current?.close();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <div className="navbar mx-auto max-w-(--container-page) px-4 sm:px-6 lg:px-8">
        <div className="navbar-start">
          <Link
            href="/"
            className="btn btn-ghost min-h-11 px-2 font-display text-lg font-semibold text-base-content"
          >
            Niti Surakongka
          </Link>
        </div>

        <nav
          aria-label="Primary navigation"
          className="navbar-end hidden md:flex"
        >
          <ul className="menu menu-horizontal gap-1 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <NavLink pathname={pathname} {...link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar-end md:hidden">
          <button
            ref={triggerRef}
            type="button"
            className="btn btn-ghost btn-square min-h-11 min-w-11"
            onClick={openMenu}
            aria-label="Open navigation"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Mobile navigation"
        className="modal modal-top md:hidden"
        onClose={restoreTriggerFocus}
      >
        <div className="modal-box mt-20 rounded-box bg-base-100 p-4 shadow-xl">
          <nav aria-label="Mobile navigation">
            <ul className="menu w-full gap-1 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink
                    pathname={pathname}
                    {...link}
                    onNavigate={closeMenu}
                  />
                </li>
              ))}
            </ul>
          </nav>
          <form method="dialog" className="mt-3">
            <button className="btn btn-ghost btn-block min-h-11">
              Close navigation
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label="Close navigation">close</button>
        </form>
      </dialog>
    </header>
  );
};

export default Navbar;
