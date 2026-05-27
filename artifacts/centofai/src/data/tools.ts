export interface Tool {
  name: string;
  category: string;
  description: string;
  pricing: "Kostenlos" | "Freemium" | "Kostenpflichtig";
  audience: string;
  url: string;
  color: string;
  logoUrl?: string;
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "x"
  );
}

function toolKey(tool: { name: string; category: string }): string {
  return `${tool.name}|||${tool.category}`;
}

export const toolCategories = [
  "Text & Schreiben",
  "Bildgenerierung & Design",
  "Video erstellen & bearbeiten",
  "Website erstellen",
  "App erstellen & No-Code",
  "Programmierung & Developer",
  "Datenanalyse & BI",
  "Finanzen & Investment",
  "Marketing & Social Media",
  "Präsentationen & Dokumente",
  "Audio, Stimme & Musik",
  "Automatisierung & Produktivität",
  "Recherche & Wissen",
  "Kundenservice & Chatbots",
  "HR & Recruiting",
  "Recht & Verträge",
  "Bildung & Lernen",
] as const;

export const tools: Tool[] = [
  // Text & Schreiben
  { name: "ChatGPT", category: "Text & Schreiben", description: "KI-Chatbot für Textgenerierung, Brainstorming und Coding-Hilfe", pricing: "Freemium", audience: "Alle", url: "https://chatgpt.com", color: "#10A37F", logoUrl: "tool-logos/chatgpt-com.webp" },
  { name: "Claude", category: "Text & Schreiben", description: "Fortgeschrittener KI-Assistent mit langer Kontextverarbeitung", pricing: "Freemium", audience: "Professionelle", url: "https://claude.ai", color: "#D97757", logoUrl: "tool-logos/claude-ai.png" },
  { name: "Gemini", category: "Text & Schreiben", description: "Googles multimodale KI für Text, Bild und Code", pricing: "Freemium", audience: "Alle", url: "https://gemini.google.com", color: "#4285F4", logoUrl: "tool-logos/gemini-google-com.png" },
  { name: "Perplexity", category: "Text & Schreiben", description: "KI-gestützte Suchmaschine mit Quellenangaben", pricing: "Freemium", audience: "Forscher", url: "https://perplexity.ai", color: "#22D3EE", logoUrl: "tool-logos/perplexity-ai.png" },
  { name: "Jasper", category: "Text & Schreiben", description: "KI-Plattform für Marketing- und Werbetexte", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://jasper.ai", color: "#7C3AED", logoUrl: "tool-logos/jasper-ai.png" },
  { name: "Copy.ai", category: "Text & Schreiben", description: "Automatisierte Textgenerierung für Unternehmen", pricing: "Freemium", audience: "Unternehmen", url: "https://copy.ai", color: "#2563EB", logoUrl: "tool-logos/copy-ai.png" },
  { name: "Writesonic", category: "Text & Schreiben", description: "KI-Tool für SEO-optimierte Inhalte", pricing: "Freemium", audience: "Content-Creator", url: "https://writesonic.com", color: "#F59E0B", logoUrl: "tool-logos/writesonic-com.ico" },
  { name: "Notion AI", category: "Text & Schreiben", description: "KI-Features direkt in Notion für Notizen und Dokumente", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so", color: "#000000", logoUrl: "tool-logos/notion-so.ico" },
  { name: "Grammarly", category: "Text & Schreiben", description: "Grammatik- und Stilprüfung mit KI-Unterstützung", pricing: "Freemium", audience: "Alle", url: "https://grammarly.com", color: "#38BDF8", logoUrl: "tool-logos/grammarly-com.png" },
  { name: "QuillBot", category: "Text & Schreiben", description: "Paraphrasier- und Zusammenfassungs-Tool", pricing: "Freemium", audience: "Studierende", url: "https://quillbot.com", color: "#4F46E5", logoUrl: "tool-logos/quillbot-com.png" },

  // Bildgenerierung & Design
  { name: "Midjourney", category: "Bildgenerierung & Design", description: "Kreative KI-Bildgenerierung mit herausragender Qualität", pricing: "Kostenpflichtig", audience: "Designer", url: "https://midjourney.com", color: "#7B68EE", logoUrl: "tool-logos/midjourney-com.png" },
  { name: "DALL\u00b7E 3", category: "Bildgenerierung & Design", description: "OpenAIs Bildgenerierung direkt in ChatGPT", pricing: "Freemium", audience: "Alle", url: "https://openai.com/dall-e", color: "#10A37F", logoUrl: "tool-logos/openai-com.ico" },
  { name: "Stable Diffusion", category: "Bildgenerierung & Design", description: "Open-Source Bildgenerierung für lokale Nutzung", pricing: "Kostenlos", audience: "Entwickler", url: "https://stability.ai", color: "#EA580C", logoUrl: "tool-logos/stability-ai.webp" },
  { name: "Leonardo AI", category: "Bildgenerierung & Design", description: "KI-Bildgenerierung mit Fokus auf Gaming und 3D", pricing: "Freemium", audience: "Kreative", url: "https://leonardo.ai", color: "#8B5CF6", logoUrl: "tool-logos/leonardo-ai.png" },
  { name: "Adobe Firefly", category: "Bildgenerierung & Design", description: "Adobe-integrative KI für kommerzielle Bilder", pricing: "Freemium", audience: "Designer", url: "https://adobe.com/firefly", color: "#FF0000", logoUrl: "tool-logos/adobe-com.png" },
  { name: "Canva AI", category: "Bildgenerierung & Design", description: "KI-Design-Tools direkt im Canva-Editor", pricing: "Freemium", audience: "Alle", url: "https://canva.com", color: "#00C4CC", logoUrl: "tool-logos/canva-com.ico" },
  { name: "Ideogram", category: "Bildgenerierung & Design", description: "Bildgenerierung mit exzellenter Text-Integration", pricing: "Freemium", audience: "Alle", url: "https://ideogram.ai", color: "#EC4899", logoUrl: "tool-logos/ideogram-ai.ico" },
  { name: "Krea AI", category: "Bildgenerierung & Design", description: "Echtzeit-Bildgenerierung und -bearbeitung", pricing: "Freemium", audience: "Kreative", url: "https://krea.ai", color: "#F97316", logoUrl: "tool-logos/krea-ai.png" },

  // Video erstellen & bearbeiten
  { name: "Runway", category: "Video erstellen & bearbeiten", description: "Professionelle KI-Videobearbeitung und -generierung", pricing: "Kostenpflichtig", audience: "Filmemacher", url: "https://runwayml.com", color: "#1A1A1A", logoUrl: "tool-logos/runwayml-com.png" },
  { name: "Pika", category: "Video erstellen & bearbeiten", description: "KI-Text-zu-Video mit stilvollem Output", pricing: "Freemium", audience: "Creator", url: "https://pika.art", color: "#FBBF24", logoUrl: "tool-logos/pika-art.ico" },
  { name: "Synthesia", category: "Video erstellen & bearbeiten", description: "KI-Avatar-Videos für Unternehmen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://synthesia.io", color: "#3B82F6", logoUrl: "tool-logos/synthesia-io.png" },
  { name: "HeyGen", category: "Video erstellen & bearbeiten", description: "KI-gestützte Videoübersetzung und Avatare", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://heygen.com", color: "#8B5CF6", logoUrl: "tool-logos/heygen-com.ico" },
  { name: "Descript", category: "Video erstellen & bearbeiten", description: "Audio- und Videobearbeitung per Text", pricing: "Freemium", audience: "Podcaster", url: "https://descript.com", color: "#4F46E5", logoUrl: "tool-logos/descript-com.ico" },
  { name: "InVideo AI", category: "Video erstellen & bearbeiten", description: "Automatische Videoerstellung aus Skripten", pricing: "Freemium", audience: "Social Media", url: "https://invideo.io", color: "#F59E0B", logoUrl: "tool-logos/invideo-io.ico" },

  // Website erstellen
  { name: "Framer AI", category: "Website erstellen", description: "KI-gestütztes Website-Design und Publishing", pricing: "Freemium", audience: "Designer", url: "https://framer.com", color: "#0055FF", logoUrl: "tool-logos/framer-com.png" },
  { name: "Wix AI", category: "Website erstellen", description: "KI-Website-Erstellung mit Drag-and-Drop", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://wix.com", color: "#FA5B0F", logoUrl: "tool-logos/wix-com.png" },
  { name: "Durable", category: "Website erstellen", description: "KI erstellt Websites in 30 Sekunden", pricing: "Kostenpflichtig", audience: "Selbstst\u00e4ndige", url: "https://durable.co", color: "#10B981", logoUrl: "tool-logos/durable-co.png" },
  { name: "Relume", category: "Website erstellen", description: "KI-gest\u00fctzte Webflow- und Figma-Komponenten", pricing: "Freemium", audience: "Designer", url: "https://relume.io", color: "#7C3AED", logoUrl: "tool-logos/relume-io.png" },
  { name: "Webflow AI", category: "Website erstellen", description: "KI-Assistent f\u00fcr Webflow-Websites", pricing: "Freemium", audience: "Webdesigner", url: "https://webflow.com", color: "#4353FF", logoUrl: "tool-logos/webflow-com.png" },
  { name: "Lovable", category: "Website erstellen", description: "KI-Text-zu-Website mit Full-Stack-Funktionen", pricing: "Freemium", audience: "Entwickler", url: "https://lovable.dev", color: "#FF6B6B", logoUrl: "tool-logos/lovable-dev.png" },

  // App erstellen & No-Code
  { name: "Bolt.new", category: "App erstellen & No-Code", description: "KI-gest\u00fctzte Full-Stack-App-Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://bolt.new", color: "#F59E0B", logoUrl: "tool-logos/bolt-new.png" },
  { name: "Cursor", category: "App erstellen & No-Code", description: "KI-Code-Editor f\u00fcr schnellere Entwicklung", pricing: "Freemium", audience: "Entwickler", url: "https://cursor.com", color: "#1E1E1E", logoUrl: "tool-logos/cursor-com.ico" },
  { name: "Replit AI", category: "App erstellen & No-Code", description: "Online-IDE mit integrierter KI-Assistance", pricing: "Freemium", audience: "Entwickler", url: "https://replit.com", color: "#F26207", logoUrl: "tool-logos/replit-com.png" },
  { name: "Bubble", category: "App erstellen & No-Code", description: "No-Code App-Builder mit KI-Unterst\u00fctzung", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://bubble.io", color: "#0D47FF", logoUrl: "tool-logos/bubble-io.png" },
  { name: "FlutterFlow AI", category: "App erstellen & No-Code", description: "KI-gest\u00fctzter Flutter-App-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://flutterflow.io", color: "#FF6F61", logoUrl: "tool-logos/flutterflow-io.jpg" },
  { name: "Glide", category: "App erstellen & No-Code", description: "Apps aus Google Sheets mit KI", pricing: "Freemium", audience: "Anf\u00e4nger", url: "https://glideapps.com", color: "#4CAF50", logoUrl: "tool-logos/glideapps-com.png" },
  { name: "Retool AI", category: "App erstellen & No-Code", description: "KI-gest\u00fctztes internes Tool-Building", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://retool.com", color: "#2563EB", logoUrl: "tool-logos/retool-com.ico" },

  // Programmierung & Developer
  { name: "GitHub Copilot", category: "Programmierung & Developer", description: "KI-Code-Vervollst\u00e4ndigung direkt im Editor", pricing: "Kostenpflichtig", audience: "Entwickler", url: "https://github.com/copilot", color: "#6E5494", logoUrl: "tool-logos/github-com.ico" },
  { name: "Codeium", category: "Programmierung & Developer", description: "Kostenlose KI-Code-Completion", pricing: "Kostenlos", audience: "Entwickler", url: "https://codeium.com", color: "#09B6A2", logoUrl: "tool-logos/codeium-com.ico" },
  { name: "Tabnine", category: "Programmierung & Developer", description: "KI-gest\u00fctzte Code-Vervollst\u00e4ndigung", pricing: "Freemium", audience: "Entwickler", url: "https://tabnine.com", color: "#9D72FF", logoUrl: "tool-logos/tabnine-com.png" },
  { name: "v0 by Vercel", category: "Programmierung & Developer", description: "KI-Generierung von UI-Komponenten", pricing: "Freemium", audience: "Entwickler", url: "https://v0.dev", color: "#000000", logoUrl: "tool-logos/v0-dev.png" },
  { name: "Sourcegraph Cody", category: "Programmierung & Developer", description: "KI-Code-Suche und -Verst\u00e4ndnis", pricing: "Freemium", audience: "Entwickler", url: "https://sourcegraph.com/cody", color: "#FF5543", logoUrl: "tool-logos/sourcegraph-com.png" },

  // Datenanalyse & BI
  { name: "Julius AI", category: "Datenanalyse & BI", description: "KI-gest\u00fctzte Datenanalyse und Visualisierung", pricing: "Freemium", audience: "Analysten", url: "https://julius.ai", color: "#3B82F6", logoUrl: "tool-logos/julius-ai.ico" },
  { name: "Rows AI", category: "Datenanalyse & BI", description: "Smarte Tabellenkalkulation mit KI", pricing: "Freemium", audience: "Business", url: "https://rows.com", color: "#F59E0B", logoUrl: "tool-logos/rows-com.svg" },
  { name: "Akkio", category: "Datenanalyse & BI", description: "No-Code Machine Learning Plattform", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://akkio.com", color: "#10B981", logoUrl: "tool-logos/akkio-com.png" },
  { name: "DataRobot", category: "Datenanalyse & BI", description: "Enterprise AI Platform f\u00fcr Datenanalyse", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://datarobot.com", color: "#2563EB", logoUrl: "tool-logos/datarobot-com.png" },
  { name: "Obviously AI", category: "Datenanalyse & BI", description: "No-Code Predictive Analytics", pricing: "Kostenpflichtig", audience: "Business", url: "https://obviously.ai", color: "#7C3AED", logoUrl: "tool-logos/obviously-ai.png" },

  // Finanzen & Investment
  { name: "AlphaSense", category: "Finanzen & Investment", description: "KI-gest\u00fctzte Markt- und Unternehmensrecherche", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://alphasense.com", color: "#1E40AF", logoUrl: "tool-logos/alphasense-com.png" },
  { name: "Kavout", category: "Finanzen & Investment", description: "KI-Investment-Analyse und Scoring", pricing: "Kostenpflichtig", audience: "Investoren", url: "https://kavout.com", color: "#0F766E", logoUrl: "tool-logos/kavout-com.ico" },
  { name: "Numerai", category: "Finanzen & Investment", description: "KI-gest\u00fctzter Hedge-Fonds", pricing: "Kostenlos", audience: "Data Scientists", url: "https://numer.ai", color: "#FF0066", logoUrl: "tool-logos/numer-ai.ico" },
  { name: "FinChat", category: "Finanzen & Investment", description: "KI-Chat f\u00fcr Finanzdaten und Aktien", pricing: "Freemium", audience: "Investoren", url: "https://finchat.io", color: "#3B82F6", logoUrl: "tool-logos/finchat-io.ico" },
  { name: "Upstart", category: "Finanzen & Investment", description: "KI-gest\u00fctzte Kreditvergabe", pricing: "Kostenlos", audience: "Verbraucher", url: "https://upstart.com", color: "#6366F1", logoUrl: "tool-logos/upstart-com.png" },

  // Marketing & Social Media
  { name: "HubSpot AI", category: "Marketing & Social Media", description: "KI-gest\u00fctztes Marketing-Automation", pricing: "Freemium", audience: "Unternehmen", url: "https://hubspot.com", color: "#FF7A59", logoUrl: "tool-logos/hubspot-com.png" },
  { name: "Semrush AI", category: "Marketing & Social Media", description: "KI-gest\u00fctztes SEO- und Marketing-Tool", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://semrush.com", color: "#00A4EF", logoUrl: "tool-logos/semrush-com.ico" },
  { name: "Surfer SEO", category: "Marketing & Social Media", description: "KI-gest\u00fctzte Content-Optimierung", pricing: "Kostenpflichtig", audience: "SEO-Experten", url: "https://surferseo.com", color: "#34D399", logoUrl: "tool-logos/surferseo-com.png" },
  { name: "AdCreative.ai", category: "Marketing & Social Media", description: "KI-generierte Werbeanzeigen", pricing: "Kostenpflichtig", audience: "Marketer", url: "https://adcreative.ai", color: "#F59E0B", logoUrl: "tool-logos/adcreative-ai.png" },
  { name: "Ocoya", category: "Marketing & Social Media", description: "KI-Social-Media-Management", pricing: "Kostenpflichtig", audience: "Social Media", url: "https://ocoya.com", color: "#EC4899", logoUrl: "tool-logos/ocoya-com.png" },
  { name: "Predis.ai", category: "Marketing & Social Media", description: "KI-Social-Media-Content-Erstellung", pricing: "Freemium", audience: "Creator", url: "https://predis.ai", color: "#F97316", logoUrl: "tool-logos/predis-ai.png" },

  // Pr\u00e4sentationen & Dokumente
  { name: "Gamma", category: "Pr\u00e4sentationen & Dokumente", description: "KI-gest\u00fctzte Pr\u00e4sentationserstellung", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://gamma.app", color: "#6366F1", logoUrl: "tool-logos/gamma-app.ico" },
  { name: "Tome", category: "Pr\u00e4sentationen & Dokumente", description: "Storytelling-Plattform mit KI", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://tome.app", color: "#000000", logoUrl: "tool-logos/tome-app.svg" },
  { name: "Beautiful.ai", category: "Pr\u00e4sentationen & Dokumente", description: "Smarte Pr\u00e4sentationsvorlagen mit KI", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://beautiful.ai", color: "#22D3EE", logoUrl: "tool-logos/beautiful-ai.png" },
  { name: "Pitch", category: "Pr\u00e4sentationen & Dokumente", description: "Kollaborative Pr\u00e4sentationen mit KI", pricing: "Freemium", audience: "Teams", url: "https://pitch.com", color: "#7C3AED", logoUrl: "tool-logos/pitch-com.png" },
  { name: "SlidesAI", category: "Pr\u00e4sentationen & Dokumente", description: "KI-Slides aus Text f\u00fcr Google Slides", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://slidesai.io", color: "#F59E0B", logoUrl: "tool-logos/slidesai-io.ico" },

  // Audio, Stimme & Musik
  { name: "ElevenLabs", category: "Audio, Stimme & Musik", description: "Realistische KI-Stimmensynthese", pricing: "Freemium", audience: "Creator", url: "https://elevenlabs.io", color: "#4F46E5", logoUrl: "tool-logos/elevenlabs-io.ico" },
  { name: "Murf AI", category: "Audio, Stimme & Musik", description: "KI-Stimmen f\u00fcr Voiceovers", pricing: "Freemium", audience: "Creator", url: "https://murf.ai", color: "#F59E0B", logoUrl: "tool-logos/murf-ai.ico" },
  { name: "Suno", category: "Audio, Stimme & Musik", description: "KI-Musikgenerierung aus Text", pricing: "Freemium", audience: "Musiker", url: "https://suno.com", color: "#10B981", logoUrl: "tool-logos/suno-com.ico" },
  { name: "Udio", category: "Audio, Stimme & Musik", description: "KI-Musik und -Songgenerierung", pricing: "Freemium", audience: "Musiker", url: "https://udio.com", color: "#EC4899", logoUrl: "tool-logos/udio-com.ico" },
  { name: "AIVA", category: "Audio, Stimme & Musik", description: "KI-Komposition f\u00fcr Soundtracks", pricing: "Freemium", audience: "Komponisten", url: "https://aiva.ai", color: "#6366F1", logoUrl: "tool-logos/aiva-ai.ico" },
  { name: "Soundraw", category: "Audio, Stimme & Musik", description: "KI-generierte lizenzfreie Musik", pricing: "Kostenpflichtig", audience: "Creator", url: "https://soundraw.io", color: "#F97316", logoUrl: "tool-logos/soundraw-io.png" },

  // Automatisierung & Produktivit\u00e4t
  { name: "Zapier AI", category: "Automatisierung & Produktivit\u00e4t", description: "Workflow-Automatisierung mit KI", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://zapier.com", color: "#FF4A00", logoUrl: "tool-logos/zapier-com.png" },
  { name: "Make", category: "Automatisierung & Produktivit\u00e4t", description: "Visuelle Workflow-Automatisierung", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://make.com", color: "#7B2D8E", logoUrl: "tool-logos/make-com.png" },
  { name: "n8n", category: "Automatisierung & Produktivit\u00e4t", description: "Open-Source Workflow-Automatisierung", pricing: "Kostenlos", audience: "Entwickler", url: "https://n8n.io", color: "#FF6D5A", logoUrl: "tool-logos/n8n-io.ico" },
  { name: "Bardeen", category: "Automatisierung & Produktivit\u00e4t", description: "KI-Automatisierung im Browser", pricing: "Freemium", audience: "Berufst\u00e4tige", url: "https://bardeen.ai", color: "#9D72FF", logoUrl: "tool-logos/bardeen-ai.jpg" },
  { name: "Notion AI", category: "Automatisierung & Produktivit\u00e4t", description: "KI-Assistent f\u00fcr Notizen und Workflows", pricing: "Kostenpflichtig", audience: "Teams", url: "https://notion.so", color: "#000000", logoUrl: "tool-logos/notion-so.ico" },
  { name: "ClickUp AI", category: "Automatisierung & Produktivit\u00e4t", description: "KI-gest\u00fctztes Projektmanagement", pricing: "Kostenpflichtig", audience: "Teams", url: "https://clickup.com", color: "#7B68EE", logoUrl: "tool-logos/clickup-com.png" },

  // Recherche & Wissen
  { name: "Elicit", category: "Recherche & Wissen", description: "KI-gest\u00fctzte wissenschaftliche Recherche", pricing: "Freemium", audience: "Forscher", url: "https://elicit.org", color: "#2563EB", logoUrl: "tool-logos/elicit-org.png" },
  { name: "Consensus", category: "Recherche & Wissen", description: "KI-Suchmaschine f\u00fcr wissenschaftliche Papers", pricing: "Freemium", audience: "Studierende", url: "https://consensus.app", color: "#10B981", logoUrl: "tool-logos/consensus-app.png" },
  { name: "You.com", category: "Recherche & Wissen", description: "KI-Suchmaschine mit privaten Antworten", pricing: "Freemium", audience: "Alle", url: "https://you.com", color: "#6366F1", logoUrl: "tool-logos/you-com.png" },
  { name: "Research Rabbit", category: "Recherche & Wissen", description: "KI-gest\u00fctztes Literatur-Mapping", pricing: "Kostenlos", audience: "Forscher", url: "https://researchrabbit.ai", color: "#F59E0B", logoUrl: "tool-logos/researchrabbit-ai.png" },
  { name: "NotebookLM", category: "Recherche & Wissen", description: "Googles KI-Notizbuch f\u00fcr Dokumente", pricing: "Kostenlos", audience: "Studierende", url: "https://notebooklm.google.com", color: "#4285F4", logoUrl: "tool-logos/notebooklm-google-com.ico" },
  { name: "ChatPDF", category: "Recherche & Wissen", description: "KI-Chat mit PDF-Dokumenten", pricing: "Freemium", audience: "Studierende", url: "https://chatpdf.com", color: "#EF4444", logoUrl: "tool-logos/chatpdf-com.ico" },

  // Kundenservice & Chatbots
  { name: "Intercom AI", category: "Kundenservice & Chatbots", description: "KI-gest\u00fctzter Kundenservice", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://intercom.com", color: "#1F8DED", logoUrl: "tool-logos/intercom-com.png" },
  { name: "Zendesk AI", category: "Kundenservice & Chatbots", description: "KI f\u00fcr Kundensupport-Automatisierung", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://zendesk.com", color: "#03363D", logoUrl: "tool-logos/zendesk-com.ico" },
  { name: "Ada", category: "Kundenservice & Chatbots", description: "KI-Chatbot-Plattform f\u00fcr Enterprise", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://ada.cx", color: "#00B4D8", logoUrl: "tool-logos/ada-cx.png" },
  { name: "Botpress", category: "Kundenservice & Chatbots", description: "Open-Source Chatbot-Builder", pricing: "Freemium", audience: "Entwickler", url: "https://botpress.com", color: "#3B82F6", logoUrl: "tool-logos/botpress-com.png" },
  { name: "Manychat", category: "Kundenservice & Chatbots", description: "KI-Chatbots f\u00fcr Social Media", pricing: "Freemium", audience: "Marketer", url: "https://manychat.com", color: "#00AEEF", logoUrl: "tool-logos/manychat-com.ico" },

  // HR & Recruiting
  { name: "HireVue", category: "HR & Recruiting", description: "KI-gest\u00fctzte Video-Interviews", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://hirevue.com", color: "#0057B8", logoUrl: "tool-logos/hirevue-com.png" },
  { name: "Eightfold AI", category: "HR & Recruiting", description: "KI-Talent-Intelligence-Plattform", pricing: "Kostenpflichtig", audience: "Enterprise", url: "https://eightfold.ai", color: "#8B5CF6", logoUrl: "tool-logos/eightfold-ai.png" },
  { name: "Textio", category: "HR & Recruiting", description: "KI-gest\u00fctztes Job-Beschreibungen-Schreiben", pricing: "Kostenpflichtig", audience: "HR", url: "https://textio.com", color: "#F59E0B", logoUrl: "tool-logos/textio-com.png" },
  { name: "SeekOut", category: "HR & Recruiting", description: "KI-gest\u00fctzte Talent-Suche", pricing: "Kostenpflichtig", audience: "Recruiter", url: "https://seekout.com", color: "#10B981", logoUrl: "tool-logos/seekout-com.png" },

  // Recht & Vertr\u00e4ge
  { name: "Harvey AI", category: "Recht & Vertr\u00e4ge", description: "KI-Assistent f\u00fcr Anw\u00e4lte", pricing: "Kostenpflichtig", audience: "Anw\u00e4lte", url: "https://harvey.ai", color: "#1E3A5F", logoUrl: "tool-logos/harvey-ai.png" },
  { name: "Ironclad AI", category: "Recht & Vertr\u00e4ge", description: "KI-gest\u00fctztes Vertragsmanagement", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://ironcladapp.com", color: "#2563EB", logoUrl: "tool-logos/ironcladapp-com.svg" },
  { name: "Evisort", category: "Recht & Vertr\u00e4ge", description: "KI-Analyse von Vertr\u00e4gen", pricing: "Kostenpflichtig", audience: "Unternehmen", url: "https://evisort.com", color: "#7C3AED", logoUrl: "tool-logos/evisort-com.ico" },

  // Bildung & Lernen
  { name: "Khanmigo", category: "Bildung & Lernen", description: "KI-Tutor von Khan Academy", pricing: "Kostenlos", audience: "Studierende", url: "https://khanacademy.org", color: "#14BF96", logoUrl: "tool-logos/khanacademy-org.ico" },
  { name: "Duolingo Max", category: "Bildung & Lernen", description: "KI-gest\u00fctztes Sprachenlernen", pricing: "Kostenpflichtig", audience: "Sprachlerner", url: "https://duolingo.com", color: "#58CC02", logoUrl: "tool-logos/duolingo-com.ico" },
  { name: "Coursera Coach", category: "Bildung & Lernen", description: "KI-Lernassistent auf Coursera", pricing: "Freemium", audience: "Studierende", url: "https://coursera.org", color: "#0056D2", logoUrl: "tool-logos/coursera-org.png" },
  { name: "Brilliant AI", category: "Bildung & Lernen", description: "KI-gest\u00fctztes interaktives Lernen", pricing: "Kostenpflichtig", audience: "Studierende", url: "https://brilliant.org", color: "#00D4AA", logoUrl: "tool-logos/brilliant-org.ico" },
  { name: "Wolfram Alpha", category: "Bildung & Lernen", description: "KI-Wissens-Engine f\u00fcr Mathe und Wissenschaft", pricing: "Freemium", audience: "Studierende", url: "https://wolframalpha.com", color: "#DD1100", logoUrl: "tool-logos/wolframalpha-com.ico" },

  // Forschung & Wissenschaft
  { name: "Elicit", category: "Forschung & Wissenschaft", description: "KI-Assistent f\u00fcr wissenschaftliche Recherche und Literatur", pricing: "Freemium", audience: "Forscher", url: "https://elicit.org", color: "#7C3AED", logoUrl: "tool-logos/elicit-org.png" },
  { name: "Consensus", category: "Forschung & Wissenschaft", description: "KI-Suchmaschine f\u00fcr wissenschaftliche Erkenntnisse", pricing: "Freemium", audience: "Wissenschaftler", url: "https://consensus.app", color: "#10B981", logoUrl: "tool-logos/consensus-app.png" },

  // Gaming & Unterhaltung
  { name: "Inworld AI", category: "Gaming & Unterhaltung", description: "KI-gest\u00fctzte NPCs und Charaktere f\u00fcr Spiele", pricing: "Kostenpflichtig", audience: "Game-Developer", url: "https://inworld.ai", color: "#F59E0B", logoUrl: "tool-logos/inworld-ai.png" },
  { name: "Scenario", category: "Gaming & Unterhaltung", description: "KI-Plattform f\u00fcr Game-Assets und Charaktere", pricing: "Freemium", audience: "Game-Developer", url: "https://scenario.com", color: "#EF4444", logoUrl: "tool-logos/scenario-com.png" },
];

const slugByKey = new Map<string, string>();
const toolBySlug = new Map<string, Tool>();
{
  const nameCounts = new Map<string, number>();
  for (const t of tools) {
    nameCounts.set(t.name, (nameCounts.get(t.name) ?? 0) + 1);
  }
  for (const t of tools) {
    const base = slugify(t.name);
    let slug =
      (nameCounts.get(t.name) ?? 0) > 1
        ? `${base}-${slugify(t.category)}`
        : base;
    // Final safety against any leftover collisions
    if (toolBySlug.has(slug)) {
      let i = 2;
      while (toolBySlug.has(`${slug}-${i}`)) i++;
      slug = `${slug}-${i}`;
    }
    slugByKey.set(toolKey(t), slug);
    toolBySlug.set(slug, t);
  }
}

export function toolSlug(tool: { name: string; category: string }): string {
  return slugByKey.get(toolKey(tool)) ?? slugify(tool.name);
}

export function findToolBySlug(slug: string): Tool | undefined {
  return toolBySlug.get(decodeURIComponent(slug).toLowerCase());
}

export function relatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter(
      (t) =>
        t.category === tool.category &&
        !(t.name === tool.name && t.category === tool.category),
    )
    .slice(0, limit);
}
