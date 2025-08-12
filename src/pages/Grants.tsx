import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { toast } from "@/hooks/use-toast";

export interface GrantItem {
  id: string;
  title: string;
  pkd: string; // branża
  region: string; // województwo
  type: "dotacja" | "pożyczka" | "bon";
  minAmount: number;
  maxAmount: number;
  deadline: string; // ISO date
}

const seedGrants: GrantItem[] = [
  { id: "1", title: "Bon na cyfryzację MŚP", pkd: "62", region: "Mazowieckie", type: "bon", minAmount: 10000, maxAmount: 60000, deadline: "2025-12-31" },
  { id: "2", title: "Dotacje innowacje", pkd: "72", region: "Małopolskie", type: "dotacja", minAmount: 50000, maxAmount: 300000, deadline: "2025-06-30" },
];

const Grants = () => {
  const [filters, setFilters] = useState({ pkd: "", region: "", type: "", min: "", max: "" });
  const [searches, setSearches] = useState(0);
  const grants = useMemo(() => {
    const stored = localStorage.getItem("gf_grants");
    return stored ? (JSON.parse(stored) as GrantItem[]) : seedGrants;
  }, []);

  useEffect(() => {
    const count = Number(localStorage.getItem("gf_search_count") || 0);
    setSearches(count);
  }, []);

  const filtered = grants.filter((g) => {
    const byPkd = !filters.pkd || g.pkd.startsWith(filters.pkd);
    const byRegion = !filters.region || g.region === filters.region;
    const byType = !filters.type || g.type === filters.type;
    const byMin = !filters.min || g.maxAmount >= Number(filters.min);
    const byMax = !filters.max || g.minAmount <= Number(filters.max);
    return byPkd && byRegion && byType && byMin && byMax;
  });

  function runSearch() {
    const count = Number(localStorage.getItem("gf_search_count") || 0) + 1;
    localStorage.setItem("gf_search_count", String(count));
    setSearches(count);
    if (count > 3) {
      toast({ title: "Limit wyczerpany", description: "Plan Free: 3 wyszukiwania/miesiąc. Przejdź na PRO, aby usunąć limit." });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Wyszukiwarka dotacji – Grantly Polska</title>
        <meta name="description" content="Filtruj dotacje po PKD, regionie, typie wsparcia, kwocie i terminie naboru." />
        <link rel="canonical" href="/grants" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Wyszukiwarka dotacji</h1>
        <div className="grid gap-4 md:grid-cols-5">
          <div>
            <Label>PKD</Label>
            <Input placeholder="np. 62" value={filters.pkd} onChange={(e) => setFilters({ ...filters, pkd: e.target.value })} />
          </div>
          <div>
            <Label>Województwo</Label>
            <Select value={filters.region} onValueChange={(v) => setFilters({ ...filters, region: v })}>
              <SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger>
              <SelectContent>
                {"Dolnośląskie,Kujawsko-Pomorskie,Lubelskie,Lubuskie,Łódzkie,Małopolskie,Mazowieckie,Opolskie,Podkarpackie,Podlaskie,Pomorskie,Śląskie,Świętokrzyskie,Warmińsko-Mazurskie,Wielkopolskie,Zachodniopomorskie".split(",").map(r => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Typ wsparcia</Label>
            <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v })}>
              <SelectTrigger><SelectValue placeholder="Wybierz" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dotacja">Dotacja</SelectItem>
                <SelectItem value="pożyczka">Pożyczka</SelectItem>
                <SelectItem value="bon">Bon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kwota minimalna</Label>
            <Input type="number" value={filters.min} onChange={(e) => setFilters({ ...filters, min: e.target.value })} />
          </div>
          <div>
            <Label>Kwota maksymalna</Label>
            <Input type="number" value={filters.max} onChange={(e) => setFilters({ ...filters, max: e.target.value })} />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Wyszukiwania w tym miesiącu: {searches}/3 (Free)</p>
          <Button onClick={runSearch}>Szukaj</Button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {filtered.map((g) => (
            <div key={g.id} className="card-elevated">
              <div>
                <h3>{g.title}</h3>
                <p className="text-sm text-muted-foreground">PKD {g.pkd} • {g.region} • {g.type.toUpperCase()}</p>
                <p className="text-sm text-muted-foreground">Kwota: {g.minAmount.toLocaleString()} – {g.maxAmount.toLocaleString()} PLN</p>
                <p className="text-sm text-muted-foreground">Nabór do: {new Date(g.deadline).toLocaleDateString()}</p>
              </div>
              <Button variant="outline" onClick={() => (window.location.href = "/eligibility")}>Sprawdź kwalifikowalność</Button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Grants;
