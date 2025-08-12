import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
  nip: string;
  pkd: string;
  region: string;
  employees: string;
  revenue: string;
  startDate: string;
}

const Profile = () => {
  const [form, setForm] = useState<ProfileData>({ nip: "", pkd: "", region: "", employees: "", revenue: "", startDate: "" });

  useEffect(() => {
    const saved = localStorage.getItem("gf_profile");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  function onChange<K extends keyof ProfileData>(key: K, value: ProfileData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function save() {
    localStorage.setItem("gf_profile", JSON.stringify(form));
    toast({ title: "Zapisano profil" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Profil firmy – Grantly Polska</title>
        <meta name="description" content="Uzupełnij dane firmy: NIP, PKD, region, zatrudnienie, obrót, data rozpoczęcia." />
        <link rel="canonical" href="/profile" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Profil firmy</h1>
        <div className="grid gap-4">
          <div>
            <Label htmlFor="nip">NIP</Label>
            <Input id="nip" value={form.nip} onChange={(e) => onChange("nip", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="pkd">PKD</Label>
            <Input id="pkd" value={form.pkd} onChange={(e) => onChange("pkd", e.target.value)} />
          </div>
          <div>
            <Label>Województwo</Label>
            <Select value={form.region} onValueChange={(v) => onChange("region", v)}>
              <SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger>
              <SelectContent>
                {"Dolnośląskie,Kujawsko-Pomorskie,Lubelskie,Lubuskie,Łódzkie,Małopolskie,Mazowieckie,Opolskie,Podkarpackie,Podlaskie,Pomorskie,Śląskie,Świętokrzyskie,Warmińsko-Mazurskie,Wielkopolskie,Zachodniopomorskie".split(",").map(r => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="employees">Liczba pracowników</Label>
            <Input id="employees" type="number" value={form.employees} onChange={(e) => onChange("employees", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="revenue">Roczny obrót (PLN)</Label>
            <Input id="revenue" type="number" value={form.revenue} onChange={(e) => onChange("revenue", e.target.value)} />
          </div>
          <div>
            <Label htmlFor="start">Data rozpoczęcia działalności</Label>
            <Input id="start" type="date" value={form.startDate} onChange={(e) => onChange("startDate", e.target.value)} />
          </div>
          <div className="pt-2">
            <Button onClick={save} variant="hero">Zapisz</Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
