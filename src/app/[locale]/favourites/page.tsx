import initTranslations from "../../i18n";
import TranslationProvider from "../(components)/TranslationProvider";
import FavouritesPage from "./favouritesItem";

const i18nNamespaces = ["favourites", "common"];

export default async function Favourites({
  params,
}: {
  params: { locale: string; searchTitle: string };
}) {
  const { t, resources } = await initTranslations(
    params.locale,
    i18nNamespaces
  );
  return (
    <TranslationProvider
      resources={resources}
      locale={params.locale}
      namespaces={i18nNamespaces}
    >
      <FavouritesPage />
    </TranslationProvider>
  );
}
