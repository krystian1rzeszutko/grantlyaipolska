import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, subscribed, subscriptionTier, checkSubscription } = useAuth();
  const searches = Number(localStorage.getItem("gf_search_count") || 0);
  const plan = subscribed ? `${subscriptionTier} (aktywna)` : searches > 3 ? "(limit przekroczony – rozważ PRO)" : "Free";

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      toast({ title: "Płatność zakończona sukcesem!", description: "Twoja subskrypcja została aktywowana." });
      checkSubscription();
    } else if (urlParams.get('canceled') === 'true') {
      toast({ title: "Płatność anulowana", description: "Możesz spróbować ponownie później." });
    }
  }, [checkSubscription]);

  const handleUpgrade = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({ title: "Błąd", description: "Nie udało się rozpocząć procesu płatności" });
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      
      if (data.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({ title: "Błąd", description: "Nie udało się otworzyć panelu zarządzania subskrypcją" });
    }
  };

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
              {user && <p className="text-xs text-muted-foreground mt-1">Email: {user.email}</p>}
            </div>
            {subscribed ? (
              <Button variant="outline" onClick={handleManageSubscription}>Zarządzaj subskrypcją</Button>
            ) : (
              <Button variant="premium" onClick={handleUpgrade}>Przejdź na PRO</Button>
            )}
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
