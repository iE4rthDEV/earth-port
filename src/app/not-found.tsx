import NotFoundContent from "@/components/ui/NotFoundContent";
import { getDictionary } from "@/i18n/dictionaries";
import { getRequestLocale } from "@/i18n/server";

const NotFoundPage = async () => {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return (
    <NotFoundContent
      title={dictionary.errors.notFoundTitle}
      description={dictionary.errors.notFoundDescription}
      recoveryHref="/"
      recoveryLabel={dictionary.errors.backHome}
    />
  );
};

export default NotFoundPage;
