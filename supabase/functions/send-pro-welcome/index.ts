import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SEND-PRO-WELCOME] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const { email, displayName } = await req.json();
    if (!email) throw new Error("Email is required");
    logStep("Email data received", { email, displayName });

    const emailResponse = await resend.emails.send({
      from: "Grantly Polska <kontakt@grantlypolska.pl>",
      to: [email],
      subject: "Dziękujemy za zakup PRO",
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px; background-color: #fafafa;">
  <div style="text-align: center; margin-bottom: 20px;">
    <img src="https://grantlypolska.pl/logo.png" alt="Grantly Polska" style="max-height: 60px;" />
  </div>
  
  <h2 style="color: #2c3e50;">Dziękujemy za zakup planu PRO 🎉</h2>
  
  <p>Witaj,</p>
  <p>Twoja subskrypcja <strong>Grantly Polska – PRO</strong> została aktywowana.</p>
  
  <p>Dzięki planowi PRO masz teraz dostęp do:</p>
  <ul>
    <li>🔍 <strong>Nielimitowanych wyszukiwań dotacji</strong></li>
    <li>🤖 <strong>Chatbota AI bez ograniczeń pytań</strong></li>
    <li>📊 <strong>Pełnych ocen kwalifikowalności</strong></li>
    <li>📩 <strong>Powiadomień o nowych naborach</strong></li>
  </ul>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="https://grantlypolska.pl/auth" 
       style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
       Zaloguj się do swojego konta
    </a>
  </div>
  
  <p>W razie pytań napisz do nas: 
     <a href="mailto:kontakt@grantlypolska.pl">kontakt@grantlypolska.pl</a>.
  </p>
  
  <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;" />
  
  <p style="font-size: 12px; color: #777; text-align: center;">
    Grantly Polska – Twój przewodnik po dotacjach dla firm.<br/>
    © 2025 Grantly Polska. Wszystkie prawa zastrzeżone.
  </p>
</div>`,
    });

    logStep("Email sent successfully", { messageId: emailResponse.data?.id });

    return new Response(JSON.stringify({ success: true, messageId: emailResponse.data?.id }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in send-pro-welcome", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});