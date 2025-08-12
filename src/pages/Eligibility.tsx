import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMemo, useState } from "react";

const questions = [
  { id: "employees", text: "Czy liczba pracowników mieści się w wymogach programu?" },
  { id: "revenue", text: "Czy roczny obrót spełnia minimalne kryteria?" },
  { id: "region", text: "Czy firma działa w wymaganym województwie?" },
  { id: "pkd", text: "Czy PKD firmy jest zgodne z wymogami?" },
];

const Eligibility = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const score = useMemo(() => {
    const yes = Object.values(answers).filter((v) => v === "yes").length;
    return Math.round((yes / questions.length) * 100);
  }, [answers]);

  const gaps = questions.filter((q) => answers[q.id] !== "yes").map((q) => q.text);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Ocena kwalifikowalności – Grantly Polska</title>
        <meta name="description" content="Quiz tak/nie porównujący dane firmy z kryteriami programu i wskazujący braki." />
        <link rel="canonical" href="/eligibility" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Ocena kwalifikowalności</h1>
        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="space-y-2">
              <Label>{q.text}</Label>
              <RadioGroup onValueChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v }))}>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="yes" id={`${q.id}-yes`} />
                  <Label htmlFor={`${q.id}-yes`}>Tak</Label>
                  <RadioGroupItem value="no" id={`${q.id}-no`} />
                  <Label htmlFor={`${q.id}-no`}>Nie</Label>
                </div>
              </RadioGroup>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-lg border p-4">
          <p>Wynik dopasowania: <strong>{isNaN(score) ? 0 : score}%</strong></p>
          {gaps.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-sm text-muted-foreground">
              {gaps.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-6 flex gap-3">
          <Button variant="outline" onClick={() => (window.location.href = "/grants")}>Wróć do ofert</Button>
          <Button variant="hero" onClick={() => (window.location.href = "/chatbot")}>Zapytaj doradcę AI</Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Eligibility;
