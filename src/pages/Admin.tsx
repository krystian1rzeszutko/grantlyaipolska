import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { GrantItem } from "./Grants";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const [form, setForm] = useState<Partial<GrantItem>>({ type: "dotacja" as GrantItem["type"], minAmount: 0, maxAmount: 0, deadline: "" });
  const [items, setItems] = useState<GrantItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("gf_grants");
    setItems(stored ? JSON.parse(stored) : []);
  }, []);

  function onChange<K extends keyof GrantItem>(key: K, value: any) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function add() {
    const newItem: GrantItem = {
      id: crypto.randomUUID(),
      title: String(form.title || "Oferta"),
      pkd: String(form.pkd || ""),
      region: String(form.region || ""),
      type: (form.type as any) || "dotacja",
      minAmount: Number(form.minAmount || 0),
      maxAmount: Number(form.maxAmount || 0),
      deadline: String(form.deadline || new Date().toISOString().slice(0, 10)),
    };
    const next = [...items, newItem];
    setItems(next);
    localStorage.setItem("gf_grants", JSON.stringify(next));
    toast({ title: "Dodano ofertę" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panel administratora – GrantFinder Polska</title>
        <meta name="description" content="Dodawanie i edycja dotacji, podgląd użytkowników, zarządzanie płatnościami." />
        <link rel="canonical" href="/admin" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">Panel administratora</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label>Tytuł</Label>
            <Input value={form.title || ""} onChange={(e) => onChange("title", e.target.value)} />
          </div>
          <div>
            <Label>PKD</Label>
            <Input value={form.pkd || ""} onChange={(e) => onChange("pkd", e.target.value)} />
          </div>
          <div>
            <Label>Województwo</Label>
            <Input value={form.region || ""} onChange={(e) => onChange("region", e.target.value)} />
          </div>
          <div>
            <Label>Typ wsparcia</Label>
            <Select value={form.type as string} onValueChange={(v) => onChange("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="dotacja">Dotacja</SelectItem>
                <SelectItem value="pożyczka">Pożyczka</SelectItem>
                <SelectItem value="bon">Bon</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Kwota min.</Label>
            <Input type="number" value={form.minAmount as number} onChange={(e) => onChange("minAmount", Number(e.target.value))} />
          </div>
          <div>
            <Label>Kwota max.</Label>
            <Input type="number" value={form.maxAmount as number} onChange={(e) => onChange("maxAmount", Number(e.target.value))} />
          </div>
          <div>
            <Label>Termin naboru</Label>
            <Input type="date" value={form.deadline as string} onChange={(e) => onChange("deadline", e.target.value)} />
          </div>
        </div>

        <div className="mt-4">
          <Button variant="hero" onClick={add}>Dodaj ofertę</Button>
        </div>

        <div className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold">Oferty</h2>
          {items.length === 0 && <p className="text-sm text-muted-foreground">Brak ofert</p>}
          {items.map((g) => (
            <div key={g.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{g.title}</p>
                  <p className="text-xs text-muted-foreground">{g.type} • {g.region} • PKD {g.pkd}</p>
                </div>
                <span className="text-xs text-muted-foreground">do {new Date(g.deadline).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Admin;
