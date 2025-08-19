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
  { id: "3", title: "Digital Poland - Cyfrowa transformacja", pkd: "58,59,60,61,62,63", region: "Wszystkie", type: "dotacja", minAmount: 50000, maxAmount: 500000, deadline: "2025-09-30" },
  { id: "4", title: "Czyste Powietrze dla Przedsiębiorców", pkd: "35", region: "Śląskie", type: "dotacja", minAmount: 20000, maxAmount: 150000, deadline: "2025-08-15" },
  { id: "5", title: "Start-up Polska 2025", pkd: "62,63,72", region: "Wielkopolskie", type: "dotacja", minAmount: 100000, maxAmount: 1000000, deadline: "2025-07-31" },
  { id: "6", title: "Bon na innowacje", pkd: "20,21,22,23,24,25,26,27,28,29,30", region: "Dolnośląskie", type: "bon", minAmount: 15000, maxAmount: 80000, deadline: "2025-11-30" },
  { id: "7", title: "Rozwój MŚP - Pomorskie 2025", pkd: "10,11,13,14,15,16,17,18", region: "Pomorskie", type: "dotacja", minAmount: 30000, maxAmount: 200000, deadline: "2025-10-15" },
  { id: "8", title: "Zielona Energia dla Firm", pkd: "35", region: "Wszystkie", type: "dotacja", minAmount: 40000, maxAmount: 300000, deadline: "2025-12-15" },
  { id: "9", title: "Cyfryzacja Handlu", pkd: "47", region: "Mazowieckie", type: "bon", minAmount: 5000, maxAmount: 25000, deadline: "2025-09-15" },
  { id: "10", title: "Wsparcie Eksportu MŚP", pkd: "46,47,49,52", region: "Lubelskie", type: "dotacja", minAmount: 25000, maxAmount: 100000, deadline: "2025-08-30" },
  { id: "11", title: "Automatyzacja Produkcji", pkd: "10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33", region: "Śląskie", type: "dotacja", minAmount: 80000, maxAmount: 800000, deadline: "2025-11-15" },
  { id: "12", title: "Turystyka Cyfrowa", pkd: "55,56,79", region: "Małopolskie", type: "bon", minAmount: 8000, maxAmount: 40000, deadline: "2025-07-15" },
  { id: "13", title: "Bon na Doradztwo Biznesowe", pkd: "69,70,71,72,73,74,75", region: "Wszystkie", type: "bon", minAmount: 3000, maxAmount: 15000, deadline: "2025-12-31" },
  { id: "14", title: "Ekologiczne Opakowania", pkd: "17,22", region: "Kujawsko-Pomorskie", type: "dotacja", minAmount: 35000, maxAmount: 180000, deadline: "2025-10-31" },
  { id: "15", title: "Wsparcie Rzemiosła", pkd: "41,42,43", region: "Podkarpackie", type: "dotacja", minAmount: 20000, maxAmount: 120000, deadline: "2025-09-30" },
  { id: "16", title: "Digitalizacja Gastronomii", pkd: "56", region: "Zachodniopomorskie", type: "bon", minAmount: 4000, maxAmount: 20000, deadline: "2025-08-15" },
  { id: "17", title: "Zdrowie 4.0", pkd: "86,87,88", region: "Łódzkie", type: "dotacja", minAmount: 60000, maxAmount: 400000, deadline: "2025-11-30" },
  { id: "18", title: "Smart City Solutions", pkd: "62,63", region: "Warmińsko-Mazurskie", type: "dotacja", minAmount: 70000, maxAmount: 500000, deadline: "2025-10-15" },
  { id: "19", title: "Rolnictwo Precyzyjne", pkd: "01,02,03", region: "Lubuskie", type: "dotacja", minAmount: 45000, maxAmount: 250000, deadline: "2025-09-15" },
  { id: "20", title: "Bon na Cyberbezpieczeństwo", pkd: "58,59,60,61,62,63", region: "Wszystkie", type: "bon", minAmount: 10000, maxAmount: 50000, deadline: "2025-12-31" },
  { id: "21", title: "Logistyka 4.0", pkd: "49,50,51,52,53", region: "Opolskie", type: "dotacja", minAmount: 55000, maxAmount: 350000, deadline: "2025-08-31" },
  { id: "22", title: "E-commerce dla MŚP", pkd: "47", region: "Podlaskie", type: "bon", minAmount: 6000, maxAmount: 30000, deadline: "2025-07-31" },
  { id: "23", title: "Zielone Technologie", pkd: "35,36,37,38,39", region: "Świętokrzyskie", type: "dotacja", minAmount: 40000, maxAmount: 200000, deadline: "2025-10-31" },
  { id: "24", title: "Finansowanie Franczyzy", pkd: "47,55,56", region: "Wszystkie", type: "pożyczka", minAmount: 50000, maxAmount: 300000, deadline: "2025-11-15" },
  { id: "25", title: "Przemysł Kosmetyczny 2025", pkd: "20", region: "Małopolskie", type: "dotacja", minAmount: 30000, maxAmount: 150000, deadline: "2025-09-15" },
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
