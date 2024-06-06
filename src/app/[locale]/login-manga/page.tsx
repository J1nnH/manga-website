import initTranslations from "../../i18n";
import TranslationProvider from "../(components)/TranslationProvider"
import LoginManga from "./loginItem";

const  i18nNamespaces = ['login-manga','common'];

export default async function Login({params}: {params: {locale: string}}){
  const { t, resources } = await initTranslations(params.locale, i18nNamespaces);

  return (
    <TranslationProvider resources={resources} locale={params.locale} namespaces={i18nNamespaces}>
      <LoginManga></LoginManga>
    </TranslationProvider>

  );
}