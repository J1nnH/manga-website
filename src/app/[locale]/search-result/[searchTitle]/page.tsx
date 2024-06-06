import initTranslations from "../../../i18n";
import TranslationProvider from "../../(components)/TranslationProvider"
import UserSearchPage from "./searchItem";

const i18nNamespaces = ['search','common'];

export default async function Search({params}: {params: {locale: string; searchTitle: string}}){
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationProvider resources={resources} locale={params.locale} namespaces={i18nNamespaces}>
      <UserSearchPage params={{
        searchTitle: params.searchTitle
      }}></UserSearchPage>
    </TranslationProvider>

  );
}