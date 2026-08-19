import React from "react";
import {
  FaFacebook,
  FaLine,
  FaPhone,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import PageSection from "@/components/ui/PageSection";
import SectionHeading from "@/components/ui/SectionHeading";

const contactItems = [
  {
    href: "https://www.facebook.com/niti.surakongka",
    label: "Niti Surakongka",
    accessibleLabel: "Contact Niti Surakongka on Facebook",
    icon: FaFacebook,
    delay: "700",
  },
  {
    href: "https://line.me/ti/p/8XgcLYn8Cg",
    label: "091-758-2874",
    accessibleLabel: "Contact Niti Surakongka on Line",
    icon: FaLine,
    delay: "1100",
  },
  {
    href: "tel:0917582874",
    label: "091-758-2874",
    accessibleLabel: "Call Niti Surakongka at 091-758-2874",
    icon: FaPhone,
    delay: "1300",
  },
  {
    href: "https://github.com/iE4rthDEV",
    label: "iE4rthDEV",
    accessibleLabel: "View iE4rthDEV on GitHub",
    icon: FaGithub,
    delay: "1500",
  },
  {
    href: "https://www.linkedin.com/in/nitisurakongka/",
    label: "Niti Surakongka",
    accessibleLabel: "View Niti Surakongka on LinkedIn",
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
        <div className="mb-10 text-center sm:mb-12">
          <SectionHeading as="h1" title="Contact" />
          <p className="mt-4 font-thai text-base font-normal leading-7 text-base-content/70 sm:text-lg sm:leading-8">
            ติดต่อผมได้ผ่านช่องทางต่างๆ ด้านล่าง
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {contactItems.map(
            ({ href, label, accessibleLabel, icon: Icon, delay }) => (
              <article
                key={href}
                data-aos="fade-up"
                data-aos-delay={delay}
                className="card card-border h-full overflow-hidden border-base-300 bg-base-100 shadow-sm"
              >
                <a
                  href={href}
                  aria-label={accessibleLabel}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group flex h-full min-h-11 w-full flex-col items-center justify-center gap-4 rounded-box p-6 transition duration-300 ease-out hover:-translate-y-1 hover:bg-base-200 hover:shadow-lg"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 ease-out group-hover:bg-primary/20">
                    <Icon
                      aria-hidden="true"
                      className="h-8 w-8 text-primary"
                    />
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
