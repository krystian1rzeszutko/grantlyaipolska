import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [nip, setNip] = useState("");

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    try {
      setLoading(true);
      // Demo-only auth (localStorage). TODO: Integracja z Supabase auth.
      localStorage.setItem("gf_user", JSON.stringify({ email }));
      toast({ title: "Konto utworzone" });
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast({ title: "Błąd", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    try {
      setLoading(true);
      // Demo-only auth (localStorage). TODO: Integracja z Supabase auth.
      localStorage.setItem("gf_user", JSON.stringify({ email }));
      toast({ title: "Zalogowano" });
      window.location.href = "/dashboard";
    } catch (err: any) {
      toast({ title: "Błąd", description: err.message });
    } finally {
      setLoading(false);
    }
  }

  function fetchCompanyByNip() {
    if (!nip) return toast({ title: "Podaj NIP" });
    toast({ title: "Wkrótce", description: "Integracja z CEIDG/KRS zostanie dodana po podaniu kluczy API." });
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Logowanie i rejestracja – Grantly Polska</title>
        <meta name="description" content="Zaloguj się lub załóż konto. Opcjonalnie wprowadź NIP, aby pobrać dane firmy." />
        <link rel="canonical" href="/auth" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-xl">
        <h1 className="mb-6 text-center text-3xl font-bold">Zaloguj się lub załóż konto</h1>

        <div className="mb-8 space-y-2">
          <Label htmlFor="nip">NIP (opcjonalnie)</Label>
          <div className="flex gap-2">
            <Input id="nip" placeholder="NIP firmy" value={nip} onChange={(e) => setNip(e.target.value)} />
            <Button type="button" onClick={fetchCompanyByNip}>Pobierz dane</Button>
          </div>
        </div>

        <Tabs defaultValue="signin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Logowanie</TabsTrigger>
            <TabsTrigger value="signup">Rejestracja</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Hasło</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full">Zaloguj</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div>
                <Label htmlFor="email2">E-mail</Label>
                <Input id="email2" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password2">Hasło</Label>
                <Input id="password2" name="password" type="password" required />
              </div>
              <Button type="submit" disabled={loading} className="w-full" variant="hero">Zarejestruj</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Auth;
