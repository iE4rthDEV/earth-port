import type { Metadata } from "next";
import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaLine,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import PageSection from "@/components/ui/PageSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { getDictionary } from "@/i18n/dictionaries";
import { createCanonicalAlternates } from "@/i18n/metadata";
import { getRequestLocale } from "@/i18n/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.metadata.contactTitle,
    description: dictionary.metadata.contactDescription,
    alternates: createCanonicalAlternates("contact"),
  };
};

const ContactPage: React.FC = async () => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);
  const contactItems = [
    {
      href: "https://www.facebook.com/niti.surakongka",
      label: "Niti Surakongka",
      accessibleLabel: dictionary.contact.facebook,
      icon: FaFacebook,
      delay: "700",
    },
    {
      href: "https://line.me/ti/p/8XgcLYn8Cg",
      label: "091-758-2874",
      accessibleLabel: dictionary.contact.line,
      icon: FaLine,
      delay: "1100",
    },
    {
      href: "tel:0917582874",
      label: "091-758-2874",
      accessibleLabel: dictionary.contact.phone,
      icon: FaPhone,
      delay: "1300",
    },
    {
      href: "https://github.com/iE4rthDEV",
      label: "iE4rthDEV",
      accessibleLabel: dictionary.contact.github,
      icon: FaGithub,
      delay: "1500",
    },
    {
      href: "https://www.linkedin.com/in/nitisurakongka/",
      label: "Niti Surakongka",
      accessibleLabel: dictionary.contact.linkedin,
      icon: FaLinkedin,
      delay: "1700",
    },
  ] as const;

  return (
    <PageSection
      spacing="compact"
      className="contact-atmosphere min-h-[calc(100vh-5rem)]"
      containerClassName="flex min-h-[inherit] items-start justify-center"
    >
      <div className="w-full max-w-5xl">
        <div className="mb-10 text-center sm:mb-12">
          <SectionHeading as="h1" title={dictionary.contact.heading} />
          <p className="mt-4 font-thai text-base font-normal leading-7 text-base-content/70 sm:text-lg sm:leading-8">
            {dictionary.contact.subtitle}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contactItems.map(
            ({ href, label, accessibleLabel, icon: Icon, delay }) => (
              <article
                key={href}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="card card-border group h-full overflow-hidden border-base-300 bg-base-100 shadow-card-brand transition-[box-shadow,border-color] duration-normal hover:border-primary/40 hover:shadow-card-brand-hover"
              >
                <a
                  href={href}
                  aria-label={accessibleLabel}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex h-full min-h-11 w-full flex-col items-center justify-center gap-4 rounded-box p-6 transition-colors duration-normal ease-out hover:bg-base-200"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 ease-out group-hover:bg-primary/20">
                    <Icon aria-hidden="true" className="h-8 w-8 text-primary" />
                  </div>
                  <span className="link link-primary text-center font-thai text-base font-semibold no-underline sm:text-lg">
                    {label}
                  </span>
                </a>
              </article>
            ),
          )}
        </div>
      </div>
    </PageSection>
  );
};

export default ContactPage;
