import Link from "next/link";
import PageSection from "./PageSection";

interface NotFoundContentProps {
  title: string;
  description: string;
  recoveryHref: string;
  recoveryLabel: string;
  standalone?: boolean;
}

const NotFoundBody = ({
  title,
  description,
  recoveryHref,
  recoveryLabel,
}: Omit<NotFoundContentProps, "standalone">) => (
  <div className="flex max-w-xl flex-col items-center gap-4 text-center">
    <p className="font-display text-sm font-semibold tracking-[0.2em] text-primary uppercase">
      404
    </p>
    <h1 className="text-page-title font-display font-semibold text-error">
      {title}
    </h1>
    <p className="font-thai leading-7 text-base-content/70">{description}</p>
    <Link href={recoveryHref} className="btn btn-primary mt-2 min-h-11 px-6">
      {recoveryLabel}
    </Link>
  </div>
);

const NotFoundContent = ({
  standalone = false,
  ...contentProps
}: NotFoundContentProps) => {
  if (standalone) {
    return (
      <main className="flex min-h-screen items-center justify-center px-4 py-12">
        <NotFoundBody {...contentProps} />
      </main>
    );
  }

  return (
    <PageSection
      spacing="default"
      containerClassName="flex min-h-[50vh] items-center justify-center"
    >
      <NotFoundBody {...contentProps} />
    </PageSection>
  );
};

export default NotFoundContent;
