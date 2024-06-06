import initTranslations from "../../i18n";
import TranslationProvider from "../(components)/TranslationProvider"
import RegisterManga from "./registerItem";

const i18nNamespaces = ['register-manga','common'];

export default async function Register({params}: {params: {locale: string}}){
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationProvider resources={resources} locale={params.locale} namespaces={i18nNamespaces}>
      <RegisterManga></RegisterManga>
    </TranslationProvider>

  );
}