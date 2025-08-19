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
      from: "Grantly <noreply@grantly.pl>",
      to: [email],
      subject: "Witamy w Grantly PRO! 🎉",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px;">Grantly PRO</h1>
            <p style="margin: 10px 0 0; font-size: 16px; opacity: 0.9;">Witamy w premium doświadczeniu!</p>
          </div>
          
          <div style="padding: 40px 20px; background: white;">
            <h2 style="color: #333; margin-bottom: 20px;">Cześć ${displayName || 'użytkowniku'}! 👋</h2>
            
            <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
              Dziękujemy za wybór Grantly PRO! Teraz masz dostęp do wszystkich funkcji premium:
            </p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">🚀 Twoje korzyści PRO:</h3>
              <ul style="color: #666; line-height: 1.8; margin: 10px 0;">
                <li>✅ <strong>Nielimitowane wyszukiwania</strong> dotacji</li>
                <li>✅ <strong>Nielimitowane pytania</strong> do AI Doradcy</li>
                <li>✅ <strong>Zaawansowane filtry</strong> wyszukiwania</li>
                <li>✅ <strong>Priorytetowe wsparcie</strong></li>
                <li>✅ <strong>Powiadomienia o nowych dotacjach</strong></li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://grantly.pl/dashboard" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        text-decoration: none; 
                        padding: 15px 30px; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        display: inline-block;">
                Przejdź do panelu PRO
              </a>
            </div>
            
            <p style="color: #888; font-size: 14px; text-align: center; margin-top: 30px;">
              Masz pytania? Odpowiedz na tego maila – jesteśmy tutaj, aby pomóc!
            </p>
          </div>
          
          <div style="background: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 12px;">
            <p style="margin: 0;">© 2025 Grantly Polska. Wszystkie prawa zastrzeżone.</p>
          </div>
        </div>
      `,
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