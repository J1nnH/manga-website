import initTranslations from "@/app/i18n";

const  i18nNamespaces = ['about','common'];

export default async function About({params}: {params: {locale: string}}) {

    const { t } = await initTranslations(params.locale, i18nNamespaces);


    return (
        <div className="bg-slate-900 text-white min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 py-10">
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold">{t("aboutTitle")}</h1>
          </header>
          <main className="bg-black p-6 rounded-lg shadow-md">
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t("title1")}</h2>
              <p className="mb-4">{t("text1")} <strong>Rush B</strong>, {t("text2")}</p>
              <p className="mb-4">{t("text3")}</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t("title2")}</h2>
              <p className="mb-4">{t("text4")}</p>
            </section>
            <section className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">{t("title3")}</h2>
              <ul className="list-disc list-inside">
                <li className="mb-2">{t("text5")}</li>
                <li className="mb-2">{t("text6")}</li>
                <li className="mb-2">{t("text7")}</li>
                <li className="mb-2">{t("text8")}</li>
                <li className="mb-2">{t("text9")}</li>
              </ul>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-2">{t("title4")}</h2>
              <p className="mb-4">{t("text10")}</p>
              <p>{t("text11")} <a href="mailto:contact@rushb.com" className="text-blue-500">contact@rushb.com</a></p>
            </section>
          </main>
        </div>
      </div>
    );
}