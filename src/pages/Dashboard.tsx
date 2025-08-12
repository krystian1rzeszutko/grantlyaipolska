import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const searches = Number(localStorage.getItem("gf_search_count") || 0);
  const plan = searches > 3 ? "(limit przekroczony – rozważ PRO)" : "Free";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panel użytkownika – Grantly Polska</title>
        <meta name="description" content="Historia wyszukiwań, status subskrypcji i edycja profilu." />
        <link rel="canonical" href="/dashboard" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Panel użytkownika</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-elevated">
            <div>
              <h3>Subskrypcja</h3>
              <p className="text-sm text-muted-foreground">Plan: {plan}</p>
            </div>
            <Button variant="premium" onClick={() => (window.location.href = "/#pricing")}>Przejdź na PRO</Button>
          </div>
          <div className="card-elevated">
            <div>
              <h3>Profil firmy</h3>
              <p className="text-sm text-muted-foreground">Zarządzaj danymi firmy</p>
            </div>
            <Button variant="outline" onClick={() => (window.location.href = "/profile")}>Edytuj profil</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
