import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Terms = () => {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const canonical = origin ? `${origin}/regulamin` : "/regulamin";
  const siteAddress = origin || "[adres strony]";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Regulamin – GrantFinder Polska",
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: origin || "/" },
        { "@type": "ListItem", position: 2, name: "Regulamin", item: canonical },
      ],
    },
    isPartOf: { "@type": "WebSite", name: "GrantFinder Polska", url: origin || "/" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Regulamin – GrantFinder Polska</title>
        <meta name="description" content="Regulamin korzystania z aplikacji GrantFinder Polska: zasady, płatności, dane i odpowiedzialność." />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Navbar />

      <main>
        <section className="container mx-auto px-4 py-12">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Regulamin korzystania z aplikacji GrantFinder Polska</h1>
            <p className="mt-2 text-muted-foreground">Ostatnia aktualizacja: {new Date().toLocaleDateString("pl-PL")}</p>
          </header>

          <article className="prose max-w-none dark:prose-invert">
            <section className="mb-8">
              <h2 className="text-xl font-semibold">1. Definicje</h2>
              <p>1.1. „Aplikacja” – GrantFinder Polska, dostępna pod adresem {siteAddress}.</p>
              <p>1.2. „Użytkownik” – osoba korzystająca z aplikacji.</p>
              <p>1.3. „Usługa” – funkcje dostępne w aplikacji, w tym wyszukiwarka dotacji i AI chatbot.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">2. Postanowienia ogólne</h2>
              <p>2.1. Korzystanie z aplikacji oznacza akceptację regulaminu.</p>
              <p>2.2. Usługa dostępna jest dla firm zarejestrowanych w Polsce.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">3. Rejestracja i konto użytkownika</h2>
              <p>3.1. Rejestracja wymaga podania danych zgodnych z prawdą.</p>
              <p>3.2. Użytkownik odpowiada za zachowanie poufności hasła.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">4. Płatności i subskrypcje</h2>
              <p>4.1. Aplikacja oferuje wersję darmową oraz subskrypcję PRO za 39 zł/miesiąc.</p>
              <p>4.2. Płatności realizowane są za pośrednictwem Stripe i PayU.</p>
              <p>4.3. Użytkownik może anulować subskrypcję w każdej chwili.</p>
              <p>4.4. Zwroty i odstąpienia od umowy są realizowane zgodnie z prawem konsumenckim.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">5. Ochrona danych osobowych</h2>
              <p>5.1. Dane przetwarzane są zgodnie z polityką prywatności.</p>
              <p>5.2. Użytkownik ma prawo dostępu, poprawiania i usunięcia danych.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold">6. Odpowiedzialność</h2>
              <p>6.1. Aplikacja nie gwarantuje uzyskania dotacji, a jedynie pomaga w wyszukiwaniu i ocenie.</p>
              <p>6.2. Twórcy nie odpowiadają za decyzje podjęte na podstawie danych z aplikacji.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold">7. Postanowienia końcowe</h2>
              <p>7.1. Regulamin może być aktualizowany z powiadomieniem użytkowników.</p>
              <p>7.2. W sprawach nieuregulowanych stosuje się prawo polskie.</p>
            </section>
          </article>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
