import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import hero from "@/assets/hero-grantfinder.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Search, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
const Index = () => {
  return <div className="min-h-screen bg-background">
      <Helmet>
        <title>GrantFinder Polska – dotacje dla firm</title>
        <meta name="description" content="Wyszukuj dotacje i sprawdzaj kwalifikowalność. GrantFinder Polska dla MŚP: wyszukiwarka, quiz, chatbot, subskrypcje." />
        <link rel="canonical" href="/" />
      </Helmet>

      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="hero-surface" aria-hidden />
          <div className="container mx-auto grid items-center gap-10 px-4 py-20 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                GrantFinder Polska
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Jedno miejsce, aby znaleźć dotacje, sprawdzić kwalifikowalność i zaplanować finansowanie rozwoju Twojej firmy.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button asChild variant="hero" size="lg">
                  <Link to="/auth">Rozpocznij za darmo <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/grants">Przeglądaj dotacje</Link>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Shield className="size-4" />Bezpieczne logowanie</div>
                <div className="flex items-center gap-2"><Sparkles className="size-4" />Aktualne nabory</div>
              </div>
            </div>
            <div className="relative">
              <img src={hero} alt="GrantFinder Polska – hero" className="w-full rounded-lg shadow-xl" loading="lazy" />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            <article className="card-elevated">
              <Search className="text-primary" />
              <h3>Wyszukiwarka dotacji</h3>
              <p>Filtry: branża, lokalizacja, typ wsparcia, kwota, termin naboru.</p>
            </article>
            <article className="card-elevated">
              <Shield className="text-primary" />
              <h3>Ocena kwalifikowalności</h3>
              <p>Pytania tak/nie dopasowujące firmę do kryteriów programu.</p>
            </article>
            <article className="card-elevated">
              <Bot className="text-primary" />
              <h3>AI Doradca</h3>
              <p>Chatbot po polsku. Wersja Free: 3 pytania, PRO: bez limitu.</p>
            </article>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="container mx-auto px-4 pb-20">
          <h2 className="mb-8 text-center text-3xl font-bold">Cennik</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="plan-card">
              <div>
                <h3>Free</h3>
                <p>1 wyszukiwanie/miesiąc, 3 pytania do chatbota</p>
              </div>
              <Button asChild variant="outline"><Link to="/auth">Załóż konto</Link></Button>
            </div>
            <div className="plan-card premium">
              <div>
                <h3>PRO</h3>
                <p><strong>39 zł/mies.</strong> Nielimitowane wyszukiwania i chatbot</p>
              </div>
              <Button asChild variant="premium"><Link to="/auth">Przejdź na PRO</Link></Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>;
};
export default Index;