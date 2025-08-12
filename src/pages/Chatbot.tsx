import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface Message { role: "user" | "assistant"; content: string }

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    const newCount = count + 1;
    setCount(newCount);
    if (newCount > 5) {
      toast({ title: "Limit pytań", description: "Plan Free: 5 pytań. Przejdź na PRO aby zdjąć limit." });
    }
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    // TODO: Integracja z OpenAI przez Supabase Edge Function (po dodaniu klucza)
    setTimeout(() => {
      const reply: Message = { role: "assistant", content: `Rozumiem: "${userMsg.content}". Wersja demonstracyjna – odpowiedzi AI po konfiguracji.` };
      setMessages((m) => [...m, reply]);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Doradca – Grantly Polska</title>
        <meta name="description" content="Chatbot po polsku wspiera w wyszukiwaniu dotacji i interpretacji kryteriów." />
        <link rel="canonical" href="/chatbot" />
      </Helmet>

      <Navbar />

      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="mb-6 text-3xl font-bold">AI Doradca</h1>
        <div className="rounded-lg border p-4">
          <div className="min-h-[16rem] space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "chat-bubble user" : "chat-bubble ai"}>
                {m.content}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="mt-4 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Zadaj pytanie o dotacje…" />
            <Button onClick={send} disabled={!input.trim()}>Wyślij</Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Free: 5 pytań. PRO: bez limitu.</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Chatbot;
