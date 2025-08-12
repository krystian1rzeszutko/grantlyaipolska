import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Privacy = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin ? `${origin}/polityka-prywatnosci` : "/polityka-prywatnosci";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Polityka prywatności – Grantly Polska",
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: origin || "/" },
        { "@type": "ListItem", position: 2, name: "Polityka prywatności", item: canonical },
      ],
    },
    isPartOf: { "@type": "WebSite", name: "Grantly Polska", url: origin || "/" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Polityka prywatności – Grantly Polska</title>
        <meta name="description" content="Polityka prywatności Grantly Polska: zakres i cele przetwarzania, podstawa prawna, prawa użytkownika oraz bezpieczeństwo danych." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main>
        <section className="container mx-auto px-4 py-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Polityka prywatności „Grantly Polska”</h1>
            <p className="mt-2 text-muted-foreground">Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}</p>
          </header>

          <article className="prose max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold">1. Administrator danych</h2>
              <p>Administratorem danych jest [Twoja firma, adres, NIP]. Kontakt: [e-mail].</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">2. Cele przetwarzania danych</h2>
              <ul>
                <li>Realizacja usługi i obsługa konta użytkownika.</li>
                <li>Obsługa płatności i fakturowanie.</li>
                <li>Wysyłka powiadomień e-mail (newsletter, alerty o dotacjach).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">3. Podstawa prawna</h2>
              <p>Przetwarzamy dane na podstawie zgody użytkownika oraz w celu wykonania umowy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">4. Zakres danych</h2>
              <p>Imię, nazwisko, e-mail, NIP, dane firmy, dane płatnicze.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">5. Okres przechowywania</h2>
              <p>Dane przechowywane są przez okres trwania umowy i okres wymagany przez przepisy księgowe.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">6. Prawa użytkownika</h2>
              <p>Prawo dostępu, poprawiania, usunięcia danych, ograniczenia przetwarzania oraz przenoszenia danych.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">7. Bezpieczeństwo danych</h2>
              <p>Stosujemy środki techniczne i organizacyjne zapewniające ochronę danych.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">8. Udostępnianie danych</h2>
              <p>Dane mogą być udostępniane podmiotom obsługującym płatności i księgowość.</p>
            </section>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
