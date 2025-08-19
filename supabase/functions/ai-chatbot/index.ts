import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[AI-CHATBOT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? ""
  );

  try {
    logStep("Function started");

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) throw new Error("OPENAI_API_KEY is not set");
    logStep("OpenAI key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { message } = await req.json();
    if (!message) throw new Error("No message provided");
    logStep("Message received", { message });

    // Check user subscription
    const { data: subscriberData } = await supabaseClient
      .from('subscribers')
      .select('subscribed')
      .eq('user_id', user.id)
      .single();

    const isSubscribed = subscriberData?.subscribed || false;
    logStep("Subscription status checked", { isSubscribed });

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { 
            role: 'system', 
            content: `Jesteś ekspertem ds. dotacji w Polsce. Pomagasz firmom znaleźć odpowiednie dotacje i programy finansowania. 
                     Odpowiadaj po polsku, konkretnie i rzeczowo. Skupiaj się na praktycznych radach dotyczących:
                     - kryteriów kwalifikowalności
                     - wymaganych dokumentów
                     - terminów składania wniosków
                     - wysokości dofinansowania
                     - procedur aplikacyjnych`
          },
          { role: 'user', content: message }
        ],
        max_completion_tokens: isSubscribed ? 1000 : 300,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      logStep("OpenAI API error", { error: errorData });
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    logStep("AI response generated", { responseLength: aiResponse.length });

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in ai-chatbot", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});