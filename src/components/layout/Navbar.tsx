"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiCheck, FiChevronDown, FiGlobe } from "react-icons/fi";
import React, {
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  locales,
  type Locale,
} from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/th";

interface NavbarProps {
  locale: Locale;
  copy: Pick<Dictionary, "navigation" | "language">;
}

const isActive = (pathname: string, href: string, exact = false): boolean =>
  exact
    ? pathname === "/" || pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

const NavLink: React.FC<{
  href: string;
  label: string;
  pathname: string;
  exact?: boolean;
  onNavigate?: () => void;
}> = ({ href, label, pathname, exact, onNavigate }) => {
  const active = isActive(pathname, href, exact);
  const linkClass = `btn btn-ghost min-h-10 justify-start border-0 px-4.5 text-sm font-medium transition-colors duration-fast md:justify-center ${active ? "bg-primary/10 font-semibold text-primary" : "text-base-content/75 hover:bg-primary/10 hover:text-primary"}`;

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

const LanguageSwitcher: React.FC<{
  locale: Locale;
  copy: Dictionary["language"];
}> = ({ locale, copy }) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const containerRef = useRef<HTMLDetailsElement>(null);
  const triggerRef = useRef<HTMLElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const languageNames: Record<Locale, string> = {
    th: copy.thai,
    en: copy.english,
  };
  const languageDisplayNames: Record<Locale, string> = {
    th: "ไทย",
    en: "English",
  };

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsidePointer = (event: PointerEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        requestAnimationFrame(() => {
          if (containerRef.current?.contains(document.activeElement)) {
            triggerRef.current?.focus({ preventScroll: true });
          }
        });
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, [isOpen]);

  const closeMenu = (restoreFocus = false): void => {
    setIsOpen(false);
    if (restoreFocus) {
      requestAnimationFrame(() => triggerRef.current?.focus({ preventScroll: true }));
    }
  };

  const focusOption = (direction: 1 | -1): void => {
    const options = optionRefs.current.filter(
      (option): option is HTMLButtonElement => option !== null,
    );
    if (options.length === 0) return;

    const currentIndex = options.findIndex(
      (option) => option === document.activeElement,
    );
    const nextIndex = currentIndex < 0
      ? direction === 1 ? 0 : options.length - 1
      : (currentIndex + direction + options.length) % options.length;
    options[nextIndex]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDetailsElement>): void => {
    if (event.key === "Escape" && isOpen) {
      event.preventDefault();
      closeMenu(true);
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    if (!isOpen) {
      setIsOpen(true);
      requestAnimationFrame(() => focusOption(direction));
      return;
    }

    focusOption(direction);
  };

  const switchLocale = (nextLocale: Locale): void => {
    setErrorMessage("");
    if (nextLocale === locale) {
      closeMenu(true);
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/locale", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ locale: nextLocale }),
        });
        if (!response.ok) {
          setErrorMessage(copy.changeError);
          return;
        }

        window.location.reload();
      } catch {
        setErrorMessage(copy.changeError);
      }
    });
  };

  return (
    <details
      ref={containerRef}
      open={isOpen}
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
      onKeyDown={handleKeyDown}
      className="dropdown dropdown-end shrink-0"
    >
      <summary
        ref={triggerRef}
        aria-label={`${copy.label}: ${languageNames[locale]}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="btn btn-ghost h-10 min-h-10 gap-1.5 border border-primary/20 bg-primary/5 px-2.5 font-display text-sm font-semibold text-base-content/80 marker:content-none hover:border-primary/40 hover:bg-primary/10 hover:text-primary [&::-webkit-details-marker]:hidden"
      >
        <FiGlobe aria-hidden="true" className="size-4" />
        <span lang={locale}>{locale.toUpperCase()}</span>
        <FiChevronDown
          aria-hidden="true"
          className={`size-3.5 transition-transform duration-fast ${isOpen ? "rotate-180" : ""}`}
        />
      </summary>

      <ul
        role="menu"
        aria-label={copy.label}
        className="dropdown-content menu menu-sm z-50 mt-2.5 w-40 gap-1 rounded-xl border border-primary/15 bg-base-100 p-2 shadow-lg shadow-primary/5"
      >
        {locales.map((option, index) => {
          const active = option === locale;

          return (
            <li key={option}>
              <button
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                type="button"
                role="menuitemradio"
                lang={option}
                aria-checked={active}
                disabled={isPending}
                className={`rounded-selector py-2 ${active ? "menu-active bg-primary/10 font-semibold text-primary" : "text-base-content/75 hover:bg-primary/10 hover:text-primary"}`}
                onClick={() => switchLocale(option)}
              >
                <span className="flex-1 font-medium">
                  <span className="me-2 font-display text-xs font-semibold tracking-wide">
                    {option.toUpperCase()}
                  </span>
                  {languageDisplayNames[option]}
                </span>
                {active && <FiCheck aria-hidden="true" className="size-4" />}
              </button>
            </li>
          );
        })}
      </ul>
      <span className="sr-only" aria-live="polite">
        {errorMessage}
      </span>
    </details>
  );
};

const Navbar: React.FC<NavbarProps> = ({ locale, copy }) => {
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navLinks = [
    {
      href: "/",
      label: copy.navigation.home,
      exact: true,
    },
    {
      href: "/projects",
      label: copy.navigation.projects,
    },
    {
      href: "/contact",
      label: copy.navigation.contact,
    },
  ];

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const restoreTriggerFocus = (): void => {
    requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const openMenu = (): void => dialogRef.current?.showModal();
  const closeMenu = (): void => dialogRef.current?.close();

  return (
    <header
      className="navbar-shell sticky top-0 z-50 border-b border-base-300 bg-base-100"
      data-scrolled={isScrolled}
    >
      <div className="navbar relative z-10 mx-auto max-w-(--container-page) gap-2 px-4 sm:px-6 lg:px-8">
        <div className="navbar-start min-w-0">
          <Link
            href="/"
            className="btn btn-ghost min-h-11 truncate px-2 font-display text-base font-semibold text-base-content sm:text-lg"
          >
            Niti Surakongka
          </Link>
        </div>

        <div className="navbar-end gap-1.5 sm:gap-2">
          <nav aria-label={copy.navigation.primaryLabel} className="hidden md:flex">
            <ul className="menu menu-horizontal gap-1.5 p-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <NavLink pathname={pathname} {...link} />
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={triggerRef}
            type="button"
            className="btn btn-ghost btn-square min-h-11 min-w-11 md:hidden"
            onClick={openMenu}
            aria-label={copy.navigation.openMenu}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>

          <LanguageSwitcher
            locale={locale}
            copy={copy.language}
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={copy.navigation.mobileLabel}
        className="modal modal-top md:hidden"
        onClose={restoreTriggerFocus}
      >
        <div className="modal-box mt-20 rounded-box bg-base-100 p-4 shadow-xl">
          <nav aria-label={copy.navigation.mobileLabel}>
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
              {copy.navigation.closeMenu}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button aria-label={copy.navigation.closeMenu}>
            {copy.navigation.closeMenu}
          </button>
        </form>
      </dialog>
    </header>
  );
};

export default Navbar;
