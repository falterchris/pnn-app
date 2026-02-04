// supabase/functions/send-push/index.ts
import { serve } from "https://deno.land/std@0.131.0/http/server.ts"
import webpush from "https://esm.sh/web-push"

serve(async (req) => {
  // Diese Funktion wird vom Admin-Button aufgerufen
  try {
    const { title, message, group } = await req.json()

    // Die Keys holen wir uns aus den sicheren Supabase-Einstellungen
    const publicKey = Deno.env.get("VAPID_PUBLIC_KEY")!
    const privateKey = Deno.env.get("VAPID_PRIVATE_KEY")!

    webpush.setVapidDetails(
      'mailto:admin@deine-event-domain.de',
      publicKey,
      privateKey
    )

    // Hier würde die Logik stehen, die alle User-Abos aus der DB holt
    // Für den Test senden wir eine Bestätigung zurück
    return new Response(JSON.stringify({ success: true }), { 
      headers: { "Content-Type": "application/json" } 
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
})
