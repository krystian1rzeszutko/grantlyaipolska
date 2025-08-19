import { Helmet } from "react-helmet-async";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/components/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface Message { role: "user" | "assistant"; content: string }

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    const { user, subscribed } = useAuth();
    
    if (!user) {
      toast({ title: "Wymagane logowanie", description: "Zaloguj się aby korzystać z AI Doradcy." });
      return;
    }

    const newCount = count + 1;
    setCount(newCount);
    
    if (!subscribed && newCount > 5) {
      toast({ title: "Limit pytań", description: "Plan Free: 5 pytań. Przejdź na PRO aby zdjąć limit." });
      return;
    }
    
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const { data, error } = await supabase.functions.invoke('ai-chatbot', {
        body: { message: userMsg.content }
      });
      
      if (error) throw error;
      
      const reply: Message = { role: "assistant", content: data.response };
      setMessages((m) => [...m, reply]);
    } catch (error) {
      console.error('Błąd AI chatbota:', error);
      const errorMsg: Message = { 
        role: "assistant", 
        content: "Przepraszam, wystąpił błąd. Spróbuj ponownie." 
      };
      setMessages((m) => [...m, errorMsg]);
    }
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
